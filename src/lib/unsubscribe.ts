import { createHmac } from "crypto"

const UNSUBSCRIBE_SECRET = process.env.UNSUBSCRIBE_SECRET

// Hard fail at runtime in production if unset, but allow `next build`
// (NEXT_PHASE === "phase-production-build") to collect page data even
// when the var hasn't been wired into the local env yet.
if (
  !UNSUBSCRIBE_SECRET &&
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PHASE !== "phase-production-build"
) {
  throw new Error("UNSUBSCRIBE_SECRET is not configured. Refusing to start in production.")
}

/**
 * Resolve the HMAC secret. In production, UNSUBSCRIBE_SECRET is required
 * (enforced at module load above). In development we fall back to the
 * Clerk secret as a convenience so local builds don't blow up. The literal
 * fallback string was removed because anyone reading the source could
 * forge unsubscribe links if the env wasn't set.
 */
function getSecret(): string {
  const secret = UNSUBSCRIBE_SECRET ?? process.env.CLERK_SECRET_KEY
  if (!secret) {
    throw new Error("UNSUBSCRIBE_SECRET is not configured")
  }
  return secret
}

/** Generate an HMAC token for a given email to use in unsubscribe links */
export function generateUnsubscribeToken(email: string): string {
  return createHmac("sha256", getSecret()).update(email.toLowerCase()).digest("hex")
}

/** Build a full unsubscribe URL with signed token */
export function buildUnsubscribeUrl(email: string): string {
  const token = generateUnsubscribeToken(email)
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.aioperatorcollective.com"
  return `${base}/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`
}
