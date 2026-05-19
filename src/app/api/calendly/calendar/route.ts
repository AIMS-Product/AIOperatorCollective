import { NextResponse } from "next/server"

type CalendlyScheduledEventResponse = {
  resource?: {
    uri?: string
    name?: string
    start_time?: string
    end_time?: string
    event_type?: string
    location?: {
      type?: string
      location?: string
      join_url?: string
      data?: {
        join_url?: string
      }
    }
  }
}

type CalendlyLocation = NonNullable<
  NonNullable<CalendlyScheduledEventResponse["resource"]>["location"]
>

const CALENDLY_API_BASE = "https://api.calendly.com"
const CALENDLY_TOKEN =
  process.env.CALENDLY_PERSONAL_ACCESS_TOKEN ?? process.env.CALENDLY_API_KEY
const AOC_EVENT_TYPE_URIS = (process.env.CALENDLY_AOC_EVENT_TYPE_URIS ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean)

function calendlyEventUrl(rawUri: string | null, rawInviteeUri?: string | null) {
  const parsedFromEvent = calendlyScheduledEventUrl(rawUri)
  if (parsedFromEvent) return parsedFromEvent

  return calendlyScheduledEventUrlFromInvitee(rawInviteeUri)
}

function calendlyScheduledEventUrl(rawUri: string | null | undefined) {
  if (!rawUri) return null

  try {
    const url = new URL(rawUri)
    if (!["api.calendly.com", "calendly.com"].includes(url.hostname)) {
      return null
    }
    const match = url.pathname.match(
      /^(?:\/api\/v2)?\/scheduled_events\/([A-Za-z0-9-]+)$/
    )
    if (!match) return null
    return new URL(`/scheduled_events/${match[1]}`, CALENDLY_API_BASE)
  } catch {
    return null
  }
}

function calendlyScheduledEventUrlFromInvitee(rawUri: string | null | undefined) {
  if (!rawUri) return null

  try {
    const url = new URL(rawUri)
    if (!["api.calendly.com", "calendly.com"].includes(url.hostname)) {
      return null
    }
    const match = url.pathname.match(
      /^(?:\/api\/v2)?\/scheduled_events\/([A-Za-z0-9-]+)\/invitees\/[A-Za-z0-9-]+$/
    )
    if (!match) return null
    return new URL(`/scheduled_events/${match[1]}`, CALENDLY_API_BASE)
  } catch {
    return null
  }
}

function formatIcsDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z")
}

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
}

function foldIcsLine(line: string) {
  const chunks: string[] = []
  let current = line
  while (current.length > 75) {
    chunks.push(current.slice(0, 75))
    current = ` ${current.slice(75)}`
  }
  chunks.push(current)
  return chunks.join("\r\n")
}

function buildIcs(fields: {
  uid: string
  summary: string
  description: string
  start: string
  end: string
  location?: string
  url?: string
}) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AIMS//AI Operator Collective//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${fields.uid}`,
    `DTSTAMP:${formatIcsDate(new Date().toISOString())}`,
    `DTSTART:${fields.start}`,
    `DTEND:${fields.end}`,
    `SUMMARY:${escapeIcsText(fields.summary)}`,
    `DESCRIPTION:${escapeIcsText(fields.description)}`,
    fields.location ? `LOCATION:${escapeIcsText(fields.location)}` : null,
    fields.url ? `URL:${fields.url}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean) as string[]

  return `${lines.map(foldIcsLine).join("\r\n")}\r\n`
}

function locationText(location: CalendlyLocation | undefined) {
  if (!location) return undefined
  return (
    location.join_url ??
    location.data?.join_url ??
    location.location ??
    (location.type ? `Calendly ${location.type}` : undefined)
  )
}

function eventUuid(uri: string) {
  return uri.split("/").filter(Boolean).at(-1) ?? crypto.randomUUID()
}

function fallbackCalendarFields(searchParams: URLSearchParams) {
  const start = searchParams.get("eventStartTime")
  const end = searchParams.get("eventEndTime")
  const formattedStart = start ? formatIcsDate(start) : null
  const formattedEnd = end ? formatIcsDate(end) : null

  if (!formattedStart || !formattedEnd) return null

  return {
    uid: `calendly-redirect-${Buffer.from(`${start}-${end}`)
      .toString("base64url")
      .slice(0, 40)}@aioperatorcollective.com`,
    summary: searchParams.get("eventName") ?? "AI Operator Collective consult call",
    start: formattedStart,
    end: formattedEnd,
  }
}

async function calendlyEventResource(eventUrl: URL) {
  if (!CALENDLY_TOKEN) {
    return {
      error: NextResponse.json(
        { error: "Calendly API token is not configured" },
        { status: 500 }
      ),
    }
  }

  if (AOC_EVENT_TYPE_URIS.length === 0) {
    return {
      error: NextResponse.json(
        { error: "Calendly event type allowlist is not configured" },
        { status: 500 }
      ),
    }
  }

  const response = await fetch(eventUrl.toString(), {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${CALENDLY_TOKEN}`,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    return {
      error: NextResponse.json(
        { error: "Calendly event could not be loaded" },
        { status: response.status === 404 ? 404 : 502 }
      ),
    }
  }

  const calendlyEvent = (await response.json()) as CalendlyScheduledEventResponse
  const resource = calendlyEvent.resource
  const eventTypeUri = resource?.event_type ?? null

  if (!eventTypeUri || !AOC_EVENT_TYPE_URIS.includes(eventTypeUri)) {
    return {
      error: NextResponse.json(
        { error: "Calendly event is not an AIOC consult" },
        { status: 403 }
      ),
    }
  }

  return { resource }
}

function calendarResponse(ics: string) {
  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="ai-operator-collective-call.ics"',
      "Cache-Control": "no-store",
    },
  })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const eventUrl = calendlyEventUrl(
    searchParams.get("eventUri"),
    searchParams.get("inviteeUri")
  )

  if (!eventUrl) {
    const fallback = fallbackCalendarFields(searchParams)
    if (!fallback) {
      return NextResponse.json({ error: "Missing calendar details" }, { status: 400 })
    }

    const ics = buildIcs({
      uid: fallback.uid,
      summary: fallback.summary,
      description:
        "Your AI Operator Collective consult call. Your Calendly confirmation email has the latest meeting details, reschedule link, and cancellation link.",
      start: fallback.start,
      end: fallback.end,
    })

    return calendarResponse(ics)
  }

  const { resource, error } = await calendlyEventResource(eventUrl)
  if (error) return error

  const start = resource?.start_time ? formatIcsDate(resource.start_time) : null
  const end = resource?.end_time ? formatIcsDate(resource.end_time) : null

  if (!resource?.uri || !start || !end) {
    return NextResponse.json(
      { error: "Calendly event is missing calendar details" },
      { status: 502 }
    )
  }

  const location = locationText(resource.location)
  const ics = buildIcs({
    uid: `${eventUuid(resource.uri)}@aioperatorcollective.com`,
    summary: resource.name ?? "AI Operator Collective consult call",
    description:
      "Your AI Operator Collective consult call. Your Calendly confirmation email has the latest meeting details, reschedule link, and cancellation link.",
    start,
    end,
    location,
    url: location?.startsWith("http") ? location : undefined,
  })

  return calendarResponse(ics)
}
