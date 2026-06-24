import {
  btn,
  divider,
  emailLayout,
  escapeHtml,
  h1,
  p,
  sendTrackedEmail,
} from "@/lib/email"
import { db } from "@/lib/db"
import { AOC_FROM_EMAIL, AOC_REPLY_TO } from "@/lib/email/senders"
import {
  AIOC_WEBINAR_EVENT,
  webinarApplicationUrl,
  webinarCalendarLinks,
  webinarCalendarUrl,
  webinarConfirmationUrl,
} from "@/lib/marketing/webinar-event"

export interface WebinarEmailContent {
  subject: string
  preview: string
  html: string
}

type WebinarReminderTiming = "day-before" | "morning-of"
type WebinarFollowUpType = "attended" | "missed"

export const AIOC_WEBINAR_QUEUE_KEY = AIOC_WEBINAR_EVENT.slug

const WEBINAR_REMINDER_SCHEDULE = [
  {
    emailIndex: 0,
    timing: "day-before",
    scheduledFor: "2026-06-29T14:00:00.000Z",
  },
  {
    emailIndex: 1,
    timing: "morning-of",
    scheduledFor: "2026-06-30T13:00:00.000Z",
  },
] as const

export async function sendWebinarRegistrationConfirmationEmail(params: {
  to: string
  name: string
}) {
  const firstName = firstNameFrom(params.name)
  const content = buildWebinarRegistrationConfirmationEmail(firstName)

  return sendTrackedEmail({
    from: AOC_FROM_EMAIL,
    to: params.to,
    replyTo: AOC_REPLY_TO,
    subject: content.subject,
    html: emailLayout(content.html, content.preview, params.to),
    serviceArm: "ai-operator-collective",
    templateKey: "aoc.webinar-registration-confirmation",
    campaignTag: "aioc-cohort-1-webinar",
  })
}

export async function scheduleWebinarReminderEmails(params: {
  email: string
  name: string
}) {
  const existing = await db.emailQueueItem.findFirst({
    where: {
      recipientEmail: params.email,
      sequenceKey: AIOC_WEBINAR_QUEUE_KEY,
    },
  })
  if (existing) return

  const now = Date.now()
  const rows = WEBINAR_REMINDER_SCHEDULE.map((item) => ({
    recipientEmail: params.email,
    sequenceKey: AIOC_WEBINAR_QUEUE_KEY,
    emailIndex: item.emailIndex,
    scheduledFor: new Date(item.scheduledFor),
    metadata: {
      name: params.name,
      timing: item.timing,
      eventSlug: AIOC_WEBINAR_EVENT.slug,
    },
  })).filter((item) => item.scheduledFor.getTime() > now + 5 * 60_000)

  if (!rows.length) return

  await db.emailQueueItem.createMany({ data: rows })
}

export async function sendWebinarReminderEmail(params: {
  to: string
  name: string
  timing: WebinarReminderTiming
}) {
  const firstName = firstNameFrom(params.name)
  const content = buildWebinarReminderEmail(params.timing, firstName)

  return sendTrackedEmail({
    from: AOC_FROM_EMAIL,
    to: params.to,
    replyTo: AOC_REPLY_TO,
    subject: content.subject,
    html: emailLayout(content.html, content.preview, params.to),
    serviceArm: "ai-operator-collective",
    templateKey: `aoc.webinar-reminder.${params.timing}`,
    campaignTag: "aioc-cohort-1-webinar",
  })
}

export async function sendWebinarFollowUpEmail(params: {
  to: string
  name: string
  type: WebinarFollowUpType
  replayUrl?: string | null
}) {
  const firstName = firstNameFrom(params.name)
  const content = buildWebinarFollowUpEmail(params.type, firstName, params.replayUrl)

  return sendTrackedEmail({
    from: AOC_FROM_EMAIL,
    to: params.to,
    replyTo: AOC_REPLY_TO,
    subject: content.subject,
    html: emailLayout(content.html, content.preview, params.to),
    serviceArm: "ai-operator-collective",
    templateKey: `aoc.webinar-follow-up.${params.type}`,
    campaignTag: "aioc-cohort-1-webinar",
  })
}

export function buildWebinarQueuedEmail(
  emailIndex: number,
  metadata: Record<string, unknown>,
): WebinarEmailContent | null {
  const firstName =
    typeof metadata.name === "string" ? firstNameFrom(metadata.name) : "there"

  if (emailIndex === 0) {
    return buildWebinarReminderEmail("day-before", firstName)
  }

  if (emailIndex === 1) {
    return buildWebinarReminderEmail("morning-of", firstName)
  }

  return null
}

export function buildWebinarRegistrationConfirmationEmail(
  firstName = "there",
): WebinarEmailContent {
  return {
    subject: `You're registered: ${AIOC_WEBINAR_EVENT.title}`,
    preview: "Add it to your calendar. Demio will send your unique join link.",
    html: `
      ${h1(`You're registered, ${escapeHtml(firstName)}.`)}
      ${p(`You are set for <strong style="color:#111827;">${escapeHtml(AIOC_WEBINAR_EVENT.title)}</strong> on <strong style="color:#111827;">${escapeHtml(AIOC_WEBINAR_EVENT.dateLabel)} at ${escapeHtml(AIOC_WEBINAR_EVENT.timeLabel)}</strong>.`)}
      ${p("Demio will send your unique join link and reminders separately. The best thing to do right now is put the session on the calendar you actually use.")}
      ${btn("Add to calendar", webinarCalendarUrl())}
      ${calendarLinksHtml()}
      ${divider()}
      ${p("On the call, listen for one pattern: the difference between what a business asks for first and the problem actually worth solving.")}
      ${p("A business may ask for more leads, more automation, or some AI. The operator work is learning how to diagnose what is leaking time, revenue, trust, or capacity before recommending anything.")}
      ${p("You do not need to bring a problem to workshop live. Just show up and listen for the lens: first request -> real diagnosis -> first useful fix.")}
      ${p(`Confirmation page: <a href="${webinarConfirmationUrl()}" style="color:#981B1B;font-weight:700;">${webinarConfirmationUrl()}</a>`)}
      ${signature()}
    `,
  }
}

export function buildWebinarReminderEmail(
  timing: WebinarReminderTiming,
  firstName = "there",
): WebinarEmailContent {
  if (timing === "day-before") {
    return {
      subject: "tomorrow: the operator lens",
      preview: `${AIOC_WEBINAR_EVENT.title} is tomorrow at ${AIOC_WEBINAR_EVENT.timeLabel}.`,
      html: `
        ${h1(`Tomorrow: watch how the diagnosis changes the work.`)}
        ${p(`Hi ${escapeHtml(firstName)},`)}
        ${p(`Tomorrow at <strong style="color:#111827;">${escapeHtml(AIOC_WEBINAR_EVENT.timeLabel)}</strong>, Jess and Mike are going live for <strong style="color:#111827;">${escapeHtml(AIOC_WEBINAR_EVENT.title)}</strong>.`)}
        ${p("The useful part is not a tour of AI tools. It is the operator lens.")}
        ${p("A business owner may come in asking for more leads. But if the real leak is slow response time, messy handoffs, or no clear follow-up system, more leads just pour more water into the same leaky bucket.")}
        ${p("That is what this session is designed to show: how a vague business request turns into a problem clear enough to scope, explain, and solve.")}
        ${btn("Add it to calendar", webinarCalendarUrl())}
        ${p("Demio will send your unique join link. If you do not see it, check promotions/spam for the webinar confirmation.")}
        ${signature()}
      `,
    }
  }

  return {
    subject: "today at 2pm ET",
    preview: "Join live and listen for first request -> diagnosis -> first useful fix.",
    html: `
      ${h1("Today: listen for the gap.")}
      ${p(`Hi ${escapeHtml(firstName)},`)}
      ${p(`The live session is today at <strong style="color:#111827;">${escapeHtml(AIOC_WEBINAR_EVENT.timeLabel)}</strong>.`)}
      ${p("The people who will do well with this path are not just people who can figure out technology. They are people willing to learn how to find the business problem underneath the first request.")}
      ${p("As you listen, track three things:")}
      ${numberedList([
        "What did the business ask for first?",
        "What had to be diagnosed before AI made sense?",
        "What would make the first fix worth trusting?",
      ])}
      ${btn("Open the confirmation page", webinarConfirmationUrl())}
      ${p("Your unique join link comes from Demio. The confirmation page has the calendar links and the listening frame.")}
      ${signature()}
    `,
  }
}

export function buildWebinarFollowUpEmail(
  type: WebinarFollowUpType,
  firstName = "there",
  replayUrl?: string | null,
): WebinarEmailContent {
  if (type === "missed") {
    return {
      subject: "the part worth watching",
      preview:
        "The useful part was the gap between the first request and the real problem.",
      html: `
        ${h1("The useful part was not the AI demo.")}
        ${p(`Hi ${escapeHtml(firstName)},`)}
        ${p("If you missed the live session, the core idea was simple: business owners rarely hand you the clean problem on a silver platter.")}
        ${p("They may ask for more leads. More automation. Some AI. A better system.")}
        ${p("But the valuable work is learning how to diagnose the problem underneath the request, make the ROI visible, and scope the first fix clearly enough that the owner can trust it.")}
        ${replayUrl ? btn("Watch the replay", replayUrl) : ""}
        ${p("If that kind of work feels like it might fit the way you think, the next step is the AIOC Cohort 1 application.")}
        ${btn("Apply for Cohort 1", webinarApplicationUrl())}
        ${complianceNote()}
        ${signature()}
      `,
    }
  }

  return {
    subject: "if that felt possible",
    preview:
      "And if it also felt like you would not want to figure it out alone, that is the point.",
    html: `
      ${h1("If that felt possible, pay attention to the next thought.")}
      ${p(`Hi ${escapeHtml(firstName)},`)}
      ${p("If you watched the session and thought, <em>I can see how this could be real work</em>, good. That was the first point.")}
      ${p("If you also thought, <em>I would not know how to confidently run that diagnostic conversation, scope the ROI, or explain the project so a CEO wants to move forward</em>, also good. That is the actual gap.")}
      ${p("Anyone can play with AI tools. The harder, more valuable skill is learning how to find the problem worth solving, ask better questions, make the business case visible, and shape a fix that creates a clear win on both sides.")}
      ${p("That is what AIOC Cohort 1 is built around: practice, examples, operator feedback, and the business judgment layer most AI content skips.")}
      ${btn("Apply for Cohort 1", webinarApplicationUrl())}
      ${complianceNote()}
      ${signature()}
    `,
  }
}

function firstNameFrom(name: string) {
  return escapeHtml(name || "").trim().split(" ")[0] || "there"
}

function numberedList(items: string[]) {
  return `<ol style="margin:0 0 24px;padding-left:20px;color:#4B5563;line-height:1.9;font-size:15px;">${items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")}</ol>`
}

function calendarLinksHtml() {
  const links = webinarCalendarLinks()
  return `<p style="margin:6px 0 0;font-size:13px;color:#6B7280;line-height:1.7;">Choose directly: ${links
    .map(
      (link) =>
        `<a href="${link.href}" style="color:#981B1B;font-weight:700;text-decoration:none;">${escapeHtml(link.label)}</a>`,
    )
    .join(" &nbsp;|&nbsp; ")}</p>`
}

function complianceNote() {
  return p(
    "No payment to apply. AIOC does not guarantee clients, income, placement, W2 replacement, or AIMS work. The application and Fit Call help us decide together whether the room is right.",
  )
}

function signature() {
  return `
    <p style="margin:32px 0 0;font-size:13px;color:#4B5563;line-height:1.6;">
      Jess<br/>
      <span style="color:#9CA3AF;font-size:12px;">AI Operator Collective</span>
    </p>
  `
}
