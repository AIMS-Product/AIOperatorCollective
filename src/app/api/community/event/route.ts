import { NextResponse } from "next/server"
import { z } from "zod"
import { createCloseLead } from "@/lib/close"
import {
  DemioConfigError,
  DemioRegistrationError,
  registerDemioAttendee,
} from "@/lib/demio"
import { db } from "@/lib/db"
import { sendWebinarRegistrationConfirmationEmail } from "@/lib/email/webinar-event"
import { logger } from "@/lib/logger"
import { AIOC_WEBINAR_EVENT } from "@/lib/marketing/webinar-event"
import { notify } from "@/lib/notifications"
import { formRatelimit, getIp, rateLimitedResponse } from "@/lib/ratelimit"

const schema = z.object({
  email: z.string().email().max(180),
  eventSlug: z.literal(AIOC_WEBINAR_EVENT.slug),
  name: z.string().max(120).optional(),
  audienceSegment: z
    .enum([
      "technical-ish-professional",
      "operator-generalist",
      "business-owner",
      "marketer-sales",
      "other",
    ])
    .optional(),
  utmSource: z.string().max(60).optional(),
  utmMedium: z.string().max(60).optional(),
  utmCampaign: z.string().max(60).optional(),
  refUrl: z.string().url().max(500).optional(),
})

export async function POST(req: Request) {
  if (formRatelimit) {
    const { success } = await formRatelimit.limit(getIp(req))
    if (!success) return rateLimitedResponse(req, "POST /api/community/event")
  }

  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const {
      email,
      name,
      audienceSegment,
      utmSource,
      utmMedium,
      utmCampaign,
      refUrl,
    } = parsed.data
    const contactName = name?.trim() || email.split("@")[0]
    const source = `event:${AIOC_WEBINAR_EVENT.slug}`

    const recentRegistration = await db.deal
      .findFirst({
        where: {
          contactEmail: { equals: email, mode: "insensitive" },
          source,
          createdAt: { gte: new Date(Date.now() - 30 * 1000) },
        },
        select: { id: true },
      })
      .catch(() => null)

    if (recentRegistration) {
      return NextResponse.json(
        { ok: true, duplicate: true, event: AIOC_WEBINAR_EVENT.slug },
        { status: 200 }
      )
    }

    let demioJoinLink: string | null = null
    try {
      const demioRegistration = await registerDemioAttendee({
        name: contactName,
        email,
        refUrl,
      })
      demioJoinLink = demioRegistration.joinLink
    } catch (err) {
      logger.error("Failed to register webinar attendee in Demio", err, {
        email,
        eventSlug: AIOC_WEBINAR_EVENT.slug,
      })

      if (err instanceof DemioConfigError || err instanceof DemioRegistrationError) {
        return NextResponse.json(
          {
            error:
              "We could not complete the webinar registration. Please try again.",
          },
          { status: 502 },
        )
      }

      throw err
    }

    const deal = await db.deal
      .create({
        data: {
          contactName,
          contactEmail: email,
          source,
          sourceDetail: `${AIOC_WEBINAR_EVENT.title} webinar registration`,
          channelTag: utmSource ?? AIOC_WEBINAR_EVENT.registrationSource,
          utmSource,
          utmMedium,
          utmCampaign,
          stage: "APPLICATION_SUBMITTED",
          priority: "HIGH",
          leadScore: 60,
          leadScoreTier: "warm",
          leadScoreReason: `Registered for ${AIOC_WEBINAR_EVENT.slug}`,
          activities: {
            create: {
              type: "FORM_SUBMITTED",
              detail: `${contactName} (${email}) registered for ${AIOC_WEBINAR_EVENT.dateLabel}${
                audienceSegment ? ` as ${audienceSegment}` : ""
              }`,
              metadata: {
                eventSlug: AIOC_WEBINAR_EVENT.slug,
                audienceSegment: audienceSegment ?? null,
                utmSource: utmSource ?? null,
                utmMedium: utmMedium ?? null,
                utmCampaign: utmCampaign ?? null,
                demioJoinLink: demioJoinLink ?? null,
              },
            },
          },
        },
      })
      .catch((err) => {
        logger.error("Failed to create deal from webinar registration", err)
        return null
      })

    if (deal) {
      notify({
        type: "new_lead",
        title: "New AIOC webinar registration",
        message: `${contactName} (${email}) registered for ${AIOC_WEBINAR_EVENT.dateLabel}`,
        urgency: "normal",
      }).catch((err) => logger.error("Failed to notify webinar registration", err))

      createCloseLead({
        contactName,
        contactEmail: email,
        source,
        dealId: deal.id,
      })
        .then((closeLeadId) => {
          if (closeLeadId) {
            db.deal
              .update({ where: { id: deal.id }, data: { closeLeadId } })
              .catch((e) => logger.error("Failed to update webinar deal with closeLeadId", e))
          }
        })
        .catch((err) => logger.error("Failed to sync webinar lead to Close", err))
    }

    sendWebinarRegistrationConfirmationEmail({
      to: email,
      name: contactName,
    }).catch((err) =>
      logger.error("Failed to send webinar confirmation email", err, {
        email,
        eventSlug: AIOC_WEBINAR_EVENT.slug,
      }),
    )

    return NextResponse.json(
      { ok: true, event: AIOC_WEBINAR_EVENT.slug },
      { status: 201 }
    )
  } catch (err) {
    logger.error("Webinar registration failed", err, {
      endpoint: "POST /api/community/event",
    })
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
