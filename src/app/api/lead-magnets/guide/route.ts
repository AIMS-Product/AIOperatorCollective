import { NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"
import { formRatelimit, getIp, rateLimitedResponse } from "@/lib/ratelimit"
import { logger } from "@/lib/logger"
import { notify } from "@/lib/notifications"
import { createCloseLead } from "@/lib/close"
import { getGuide } from "@/lib/lead-magnets/guides"

const schema = z.object({
  email: z.string().email().max(180),
  slug: z.string().min(1).max(80),
  name: z.string().max(120).optional(),
  utmSource: z.string().max(60).optional(),
  utmMedium: z.string().max(60).optional(),
  utmCampaign: z.string().max(60).optional(),
})

/**
 * Capture endpoint for email-gated lead-magnet guides (/guide/<slug>).
 *
 * Mirrors /api/community/lead: creates a top-of-funnel Deal, notifies, and
 * syncs to Close. Distinguished from real applications by source = "guide:<slug>"
 * and a lower lead score. No LeadMagnetSubmission / enum needed.
 */
export async function POST(req: Request) {
  if (formRatelimit) {
    const { success } = await formRatelimit.limit(getIp(req))
    if (!success) return rateLimitedResponse(req, "POST /api/lead-magnets/guide")
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

    const { email, slug, name, utmSource, utmMedium, utmCampaign } = parsed.data

    // Only accept opt-ins for real, registered guides.
    const guide = getGuide(slug)
    if (!guide) {
      return NextResponse.json({ error: "Unknown guide" }, { status: 404 })
    }

    const contactName = name?.trim() || email.split("@")[0]

    const deal = await db.deal
      .create({
        data: {
          contactName,
          contactEmail: email,
          source: `guide:${slug}`,
          sourceDetail: `Lead magnet opt-in: ${guide.metaTitle}`,
          channelTag: utmSource ?? `guide:${slug}`,
          utmSource,
          utmMedium,
          utmCampaign,
          stage: "APPLICATION_SUBMITTED",
          priority: "MEDIUM",
          leadScore: 50,
          leadScoreTier: "warm",
          leadScoreReason: `Lead magnet opt-in: ${slug}`,
          activities: {
            create: {
              type: "FORM_SUBMITTED",
              detail: `Unlocked the "${guide.metaTitle}" guide (${email})`,
            },
          },
        },
      })
      .catch((err) => {
        logger.error("Failed to create deal from guide opt-in", err)
        return null
      })

    // FOLLOW-UP: enrol the lead in the Little Fires newsletter sequence here
    // once that sequence exists in the email catalog. queueEmailSequence takes
    // a typed sequence key, so wire guide.sequenceKey to a real key at that
    // point. For v1 the guide is delivered on-screen, so no email is sent.

    if (deal) {
      notify({
        type: "new_lead",
        title: "New lead magnet opt-in",
        message: `${email} unlocked "${guide.metaTitle}"`,
        urgency: "normal",
      }).catch((err) => logger.error("Failed to notify guide opt-in", err))

      createCloseLead({
        contactName,
        contactEmail: email,
        source: `guide:${slug}`,
        dealId: deal.id,
      })
        .then((closeLeadId) => {
          if (closeLeadId) {
            db.deal
              .update({ where: { id: deal.id }, data: { closeLeadId } })
              .catch((e) => logger.error("Failed to update deal with closeLeadId", e))
          }
        })
        .catch((err) => logger.error("Failed to sync guide lead to Close", err))
    }

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    logger.error("Guide opt-in submission failed", err, {
      endpoint: "POST /api/lead-magnets/guide",
    })
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
