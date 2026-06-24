export const AIOC_WEBINAR_EVENT = {
  slug: "aioc-webinar-2026-06-30",
  title: "AI In The Workplace: What Small Businesses Actually Need",
  eyebrow: "Live conversation with Jess Mayo and Mike Hoffmann",
  dateLabel: "Tuesday, June 30, 2026",
  timeLabel: "11am PT / 2pm ET",
  startsAt: "2026-06-30T18:00:00.000Z",
  endsAt: "2026-06-30T19:00:00.000Z",
  locationLabel: "Live online",
  registrationSource: "event-page",
  registrationPath: "/event",
  confirmationPath: "/event/confirmed",
  calendarPath: "/event/calendar",
  calendarDownloadPath: "/api/community/event/calendar",
  applicationPath: "/apply",
  description:
    "A live conversation for people who are good at figuring out technology and want to test a business path around solving real problems with AI.",
} as const;

export type WebinarCalendarLink = {
  id: "google" | "outlook" | "office" | "apple";
  label: string;
  href: string;
  helper: string;
};

const APP_URL = "https://www.aioperatorcollective.com";

export function appUrl(path = "") {
  return new URL(path, APP_URL).toString();
}

export function webinarRegistrationUrl() {
  return appUrl(AIOC_WEBINAR_EVENT.registrationPath);
}

export function webinarConfirmationUrl() {
  return appUrl(AIOC_WEBINAR_EVENT.confirmationPath);
}

export function webinarCalendarUrl() {
  return appUrl(AIOC_WEBINAR_EVENT.calendarPath);
}

export function webinarCalendarDownloadUrl() {
  return appUrl(AIOC_WEBINAR_EVENT.calendarDownloadPath);
}

export function webinarApplicationUrl() {
  return appUrl(AIOC_WEBINAR_EVENT.applicationPath);
}

export function webinarCalendarDescription() {
  return [
    "Live conversation with Jess Mayo and Mike Hoffmann.",
    "Listen for how AIMS moves from the first business request to the real diagnosis, then to the first AI-enabled fix a business owner can trust.",
    "Demio will email your unique join link after registration.",
    `Confirmation page: ${webinarConfirmationUrl()}`,
  ].join("\n");
}

export function webinarCalendarLinks(): WebinarCalendarLink[] {
  const startsAt = new Date(AIOC_WEBINAR_EVENT.startsAt);
  const endsAt = new Date(AIOC_WEBINAR_EVENT.endsAt);
  const description = webinarCalendarDescription();

  const google = new URL("https://calendar.google.com/calendar/render");
  google.searchParams.set("action", "TEMPLATE");
  google.searchParams.set("text", AIOC_WEBINAR_EVENT.title);
  google.searchParams.set(
    "dates",
    `${formatCalendarDate(startsAt)}/${formatCalendarDate(endsAt)}`,
  );
  google.searchParams.set("details", description);
  google.searchParams.set("location", AIOC_WEBINAR_EVENT.locationLabel);

  const outlook = new URL("https://outlook.live.com/calendar/0/action/compose");
  addOutlookParams(outlook, startsAt, endsAt, description);

  const office = new URL("https://outlook.office.com/calendar/0/action/compose");
  addOutlookParams(office, startsAt, endsAt, description);

  return [
    {
      id: "google",
      label: "Google Calendar",
      href: google.toString(),
      helper: "Opens a pre-filled Google event",
    },
    {
      id: "outlook",
      label: "Outlook.com",
      href: outlook.toString(),
      helper: "Opens Outlook on the web",
    },
    {
      id: "office",
      label: "Office 365",
      href: office.toString(),
      helper: "Opens Microsoft work calendar",
    },
    {
      id: "apple",
      label: "Apple / iCal",
      href: webinarCalendarDownloadUrl(),
      helper: "Downloads the calendar invite",
    },
  ];
}

function addOutlookParams(
  url: URL,
  startsAt: Date,
  endsAt: Date,
  description: string,
) {
  url.searchParams.set("path", "/calendar/action/compose");
  url.searchParams.set("rru", "addevent");
  url.searchParams.set("subject", AIOC_WEBINAR_EVENT.title);
  url.searchParams.set("startdt", startsAt.toISOString());
  url.searchParams.set("enddt", endsAt.toISOString());
  url.searchParams.set("body", description);
  url.searchParams.set("location", AIOC_WEBINAR_EVENT.locationLabel);
}

function formatCalendarDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}
