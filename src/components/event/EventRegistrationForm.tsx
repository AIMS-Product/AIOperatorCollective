"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import { AIOC_WEBINAR_EVENT } from "@/lib/marketing/webinar-event"

export function EventRegistrationForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [registered, setRegistered] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedEmail = email.trim().toLowerCase()
    const trimmedName = name.trim()

    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setError("Please enter a valid email address.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams(window.location.search)
      const response = await fetch("/api/community/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          name: trimmedName || undefined,
          eventSlug: AIOC_WEBINAR_EVENT.slug,
          utmSource: params.get("utm_source") ?? undefined,
          utmMedium: params.get("utm_medium") ?? undefined,
          utmCampaign: params.get("utm_campaign") ?? undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data?.error || "Something went wrong. Please try again.")
      }

      setRegistered(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (registered) {
    return (
      <div className="rounded-md border border-crimson/20 bg-white p-6 shadow-[0_24px_80px_-48px_rgba(26,26,26,0.45)] sm:p-8">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-crimson" aria-hidden />
          <div>
            <h2 className="font-serif text-2xl leading-tight text-ink">You&apos;re registered.</h2>
            <p className="mt-3 text-sm leading-6 text-[#4B5563]">
              We&apos;ll send the time, access link, and any prep notes to {email.trim()}.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md border border-white/20 bg-white p-5 text-ink shadow-[0_24px_90px_-50px_rgba(26,26,26,0.85)] sm:p-6"
    >
      <div>
        <h2 className="font-serif text-2xl leading-tight">Save your spot</h2>
        <p className="mt-2 text-sm leading-6 text-[#4B5563]">
          Register with email only. Add your name if you want the reminder personalized.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <label htmlFor="event-email" className="sr-only">
          Email
        </label>
        <input
          id="event-email"
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
          aria-describedby={error ? "event-registration-error" : undefined}
          className="h-12 w-full rounded-md border border-[#E3E3E3] bg-white px-4 text-base text-ink placeholder:text-[#9CA3AF] focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/15"
          required
        />

        <label htmlFor="event-name" className="sr-only">
          First name
        </label>
        <input
          id="event-name"
          type="text"
          autoComplete="given-name"
          placeholder="First name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 w-full rounded-md border border-[#E3E3E3] bg-white px-4 text-base text-ink placeholder:text-[#9CA3AF] focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/15"
        />
      </div>

      {error ? (
        <p id="event-registration-error" className="mt-3 text-sm text-crimson" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-crimson px-5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-crimson-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <>
            Register
            <ArrowRight className="h-4 w-4" aria-hidden />
          </>
        )}
      </button>

      <p className="mt-4 text-xs leading-5 text-[#737373]">
        No payment to register. We&apos;ll use this email for the webinar details and relevant AIOC
        follow-up.
      </p>
    </form>
  )
}
