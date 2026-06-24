import { logger } from "@/lib/logger"

const DEMIO_API_BASE = "https://my.demio.com/api/v1"

export class DemioConfigError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "DemioConfigError"
  }
}

export class DemioRegistrationError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "DemioRegistrationError"
    this.status = status
  }
}

export type DemioRegistrationResult = {
  joinLink: string | null
}

type RegisterDemioAttendeeInput = {
  name: string
  email: string
  refUrl?: string | null
}

export async function registerDemioAttendee(
  input: RegisterDemioAttendeeInput,
): Promise<DemioRegistrationResult> {
  const config = getDemioConfig()
  const payload: Record<string, string | number> = {
    id: normalizeDemioId(config.eventId),
    date_id: normalizeDemioId(config.dateId),
    name: input.name,
    email: input.email,
  }

  if (input.refUrl) {
    payload.ref_url = input.refUrl
  }

  const response = await fetch(`${DEMIO_API_BASE}/event/register`, {
    method: "POST",
    headers: {
      "Api-Key": config.apiKey,
      "Api-Secret": config.apiSecret,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    logger.error("Demio registration request failed", undefined, {
      status: response.status,
      eventId: config.eventId,
      dateId: config.dateId,
      email: input.email,
      response: data,
    })
    throw new DemioRegistrationError(
      "Demio could not register this attendee.",
      response.status,
    )
  }

  return {
    joinLink:
      data && typeof data === "object" && "join_link" in data
        ? String(data.join_link)
        : null,
  }
}

function getDemioConfig() {
  const config = {
    apiKey: cleanEnv(process.env.DEMIO_API_KEY),
    apiSecret: cleanEnv(process.env.DEMIO_API_SECRET),
    eventId: cleanEnv(process.env.DEMIO_EVENT_ID),
    dateId: cleanEnv(process.env.DEMIO_DATE_ID),
  }

  const missing = [
    ["DEMIO_API_KEY", config.apiKey],
    ["DEMIO_API_SECRET", config.apiSecret],
    ["DEMIO_EVENT_ID", config.eventId],
    ["DEMIO_DATE_ID", config.dateId],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name)

  if (missing.length) {
    throw new DemioConfigError(
      `Missing Demio configuration: ${missing.join(", ")}`,
    )
  }

  return config as {
    apiKey: string
    apiSecret: string
    eventId: string
    dateId: string
  }
}

function cleanEnv(value: string | undefined) {
  if (!value) return null
  const trimmed = value.trim()
  return trimmed.length ? trimmed : null
}

function normalizeDemioId(value: string) {
  return /^\d+$/.test(value) ? Number(value) : value
}
