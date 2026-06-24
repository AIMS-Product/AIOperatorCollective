import { NextResponse } from "next/server";
import {
  AIOC_WEBINAR_EVENT,
  webinarCalendarDescription,
  webinarConfirmationUrl,
} from "@/lib/marketing/webinar-event";

export async function GET() {
  const ics = buildIcs();

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${AIOC_WEBINAR_EVENT.slug}.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function buildIcs() {
  const now = formatIcsDate(new Date());
  const startsAt = formatIcsDate(new Date(AIOC_WEBINAR_EVENT.startsAt));
  const endsAt = formatIcsDate(new Date(AIOC_WEBINAR_EVENT.endsAt));

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AI Operator Collective//AIOC Webinar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${AIOC_WEBINAR_EVENT.slug}@aioperatorcollective.com`,
    `DTSTAMP:${now}`,
    `DTSTART:${startsAt}`,
    `DTEND:${endsAt}`,
    `SUMMARY:${escapeIcs(AIOC_WEBINAR_EVENT.title)}`,
    `DESCRIPTION:${escapeIcs(webinarCalendarDescription())}`,
    `LOCATION:${escapeIcs(AIOC_WEBINAR_EVENT.locationLabel)}`,
    `URL:${webinarConfirmationUrl()}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

function formatIcsDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeIcs(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}
