import { NextRequest, NextResponse } from "next/server"
import { timingSafeEqual } from "crypto"
import { db } from "@/lib/db"
import { logger } from "@/lib/logger"
import { generateUnsubscribeToken } from "@/lib/unsubscribe"
import { z } from "zod"

function verifyToken(email: string, token: string): boolean {
  try {
    const expected = generateUnsubscribeToken(email)
    const tokenBuf = Buffer.from(token, "utf-8")
    const expectedBuf = Buffer.from(expected, "utf-8")
    if (tokenBuf.length !== expectedBuf.length) return false
    return timingSafeEqual(tokenBuf, expectedBuf)
  } catch {
    return false
  }
}

const unsubscribeSchema = z.object({
  email: z.string().email(),
  token: z.string().min(1),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const parsed = unsubscribeSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Valid email and token required" }, { status: 400 })
    }

    const { email, token } = parsed.data

    if (!verifyToken(email, token)) {
      return NextResponse.json({ error: "Invalid or expired unsubscribe link" }, { status: 403 })
    }

    const user = await db.user.findUnique({ where: { email } })
    if (user) {
      await db.user.update({
        where: { email },
        data: { notifMarketingDigest: false, emailNotifs: false },
      })
    }

    // Cancel any pending email queue items for this recipient
    await db.emailQueueItem.updateMany({
      where: { recipientEmail: email, status: "pending" },
      data: { status: "cancelled" },
    })

    logger.info("Unsubscribe processed", { endpoint: "POST /api/unsubscribe" })

    return NextResponse.json({ success: true })
  } catch (err) {
    logger.error("Unsubscribe error:", err)
    return NextResponse.json({ error: "Failed to process unsubscribe" }, { status: 500 })
  }
}
