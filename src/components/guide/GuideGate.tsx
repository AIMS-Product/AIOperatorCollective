"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, ArrowRight, Lock } from "lucide-react"
import type { GuideMeta } from "@/lib/lead-magnets/guides"

interface GuideGateProps {
  meta: GuideMeta
  /** The revealed breakdown. Rendered only after the email is captured. */
  children: React.ReactNode
}

/**
 * Email-gated reveal for a lead-magnet guide.
 *
 * Everyone sees the eyebrow + headline + subhead. The teaser + email form show
 * until the visitor submits (or has unlocked before, tracked in localStorage),
 * then the breakdown reveals in place. This is a low-friction top-of-funnel
 * gate: the content is delivered on-screen, the email feeds the CRM + (later)
 * the Little Fires newsletter.
 */
export function GuideGate({ meta, children }: GuideGateProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unlocked, setUnlocked] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const storageKey = `aioc_guide_${meta.slug}`

  // Returning visitors who already unlocked skip the gate.
  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey)) setUnlocked(true)
    } catch {
      // localStorage unavailable (private mode / SSR mismatch) — gate stays up.
    }
  }, [storageKey])

  // Scroll the freshly revealed content into view after an unlock action.
  useEffect(() => {
    if (unlocked && bodyRef.current) {
      bodyRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [unlocked])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const value = email.trim().toLowerCase()
    if (!value || !value.includes("@")) {
      setError("Please enter a valid email address.")
      return
    }

    setLoading(true)
    setError(null)
    try {
      // Carry UTM params through to the capture so campaign attribution sticks.
      const params = new URLSearchParams(window.location.search)
      const res = await fetch("/api/lead-magnets/guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: value,
          slug: meta.slug,
          utmSource: params.get("utm_source") ?? undefined,
          utmMedium: params.get("utm_medium") ?? undefined,
          utmCampaign: params.get("utm_campaign") ?? undefined,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Something went wrong. Please try again.")
      }

      try {
        localStorage.setItem(storageKey, value)
      } catch {
        // Non-fatal: they still get the reveal this session.
      }
      setUnlocked(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <article className="mx-auto max-w-2xl px-5 py-16 sm:py-24">
      {/* Hero — shown to everyone */}
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-crimson">
          {meta.eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-[1.08] text-ink sm:text-5xl">
          {meta.headline}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#4B5563]">{meta.subhead}</p>
      </header>

      {!unlocked ? (
        <section className="mt-10 rounded-xl border border-line bg-panel p-6 sm:p-8">
          <p className="text-base leading-relaxed text-ink">{meta.teaser}</p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2">
            <label htmlFor="guide-email" className="text-sm font-semibold text-ink">
              Your email
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="guide-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError(null)
                }}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "guide-email-error" : undefined}
                className="flex-1 rounded-md border border-[#E3E3E3] bg-white px-4 py-3 text-ink placeholder:text-[#9CA3AF] focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson/30"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-crimson px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_-4px_rgba(153,27,27,0.35)] transition-colors hover:bg-crimson-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <>
                    {meta.gateButtonLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </>
                )}
              </button>
            </div>
            {error ? (
              <p id="guide-email-error" className="text-sm text-crimson" role="alert">
                {error}
              </p>
            ) : null}
            <p className="mt-1 flex items-start gap-1.5 text-xs leading-relaxed text-[#737373]">
              <Lock className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
              <span>{meta.gateMicrocopy}</span>
            </p>
          </form>
        </section>
      ) : (
        <div ref={bodyRef} className="mt-12 animate-fade-up scroll-mt-24">
          {children}
        </div>
      )}
    </article>
  )
}
