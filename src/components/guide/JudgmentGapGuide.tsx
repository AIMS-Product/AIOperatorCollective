import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { GuideMeta } from "@/lib/lead-magnets/guides"

const STATS = [
  {
    figure: "25 hrs",
    caption: "a week the average small business loses to manual data entry and reconciling apps",
    source: "Intuit QuickBooks, 2024",
  },
  {
    figure: "$3,000",
    caption: "a month the average small business overspends on software nobody uses",
    source: "Intuit QuickBooks, 2024",
  },
  {
    figure: "95%",
    caption: "of company AI pilots show no measurable return",
    source: "MIT NANDA, 2025",
  },
]

/**
 * Revealed breakdown for the Judgment Gap lead magnet. Plain content component
 * (no client state) rendered as children of <GuideGate>. Copy is the
 * 3-lens-verified version from the marketing repo. No em-dashes by convention.
 */
export function JudgmentGapGuide({ meta }: { meta: GuideMeta }) {
  return (
    <div className="space-y-12">
      {/* Problem + stakes */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl text-ink sm:text-3xl">
          Small businesses are drowning, and they know it.
        </h2>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.figure} className="bg-white p-5">
              <p className="font-serif text-4xl text-crimson">{s.figure}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{s.caption}</p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-[#9CA3AF]">
                {s.source}
              </p>
            </div>
          ))}
        </div>
        <p className="text-lg leading-relaxed text-ink">
          It&apos;s not that AI doesn&apos;t work. It&apos;s that nobody walked in, found the
          problem actually worth solving, and{" "}
          <strong className="font-semibold">built the fix around it.</strong>
        </p>
      </section>

      {/* The missing person is you */}
      <section className="space-y-5">
        <h2 className="font-serif text-2xl text-ink sm:text-3xl">
          That missing person is more like you than you think.
        </h2>
        <p className="text-lg leading-relaxed text-[#4B5563]">
          You&apos;re the one who reads the settings, wires the tools together, and figures out the
          software everyone else gives up on. Maybe you already have AI quietly doing real work.
          Maybe you&apos;re not deep in it yet, but you pick things up fast while the people great at
          the old way stay put. You might not call that building.{" "}
          <strong className="font-semibold text-ink">We would.</strong>
        </p>
      </section>

      {/* Judgment is the moat — dark callout */}
      <blockquote className="rounded-xl bg-ink p-7 sm:p-8">
        <p className="text-lg leading-relaxed text-white">
          The tools are commoditizing.{" "}
          <strong className="font-semibold text-crimson-light">Judgment is the moat:</strong>{" "}
          knowing which problem to walk toward, and when the answer is a $20 form instead of a
          $20,000 agent.
        </p>
      </blockquote>

      {/* AIMS proof — tinted callout */}
      <section className="space-y-4 rounded-xl border-l-4 border-crimson bg-panel p-7 sm:p-8">
        <p className="text-base leading-relaxed text-[#4B5563]">
          We know, because we&apos;re in the room.{" "}
          <strong className="font-semibold text-ink">AIMS</strong> gets paid to sit inside real
          businesses and fix what&apos;s broken. From small shops up through $80M operators, they
          say the same sentence:
        </p>
        <p className="font-serif text-xl leading-snug text-ink sm:text-2xl">
          &ldquo;We know we should be doing more with AI. We don&apos;t know where to start.&rdquo;
        </p>
        <p className="text-base leading-relaxed text-[#4B5563]">
          Underneath it, the same feeling: they&apos;re falling behind.{" "}
          <strong className="font-semibold text-ink">They&apos;re looking for someone who can help.</strong>
        </p>
      </section>

      {/* The path */}
      <section className="space-y-6">
        <div>
          <h2 className="font-serif text-2xl text-ink sm:text-3xl">
            The AI Operators Collective trains that someone.
          </h2>
          <p className="mt-3 text-base text-[#4B5563]">
            A 10-person-cohort apprenticeship, powered by AI Managing Services (AIMS).
          </p>
        </div>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { n: "1", t: "Find the real problem.", d: "Before touching a tool." },
            { n: "2", t: "Scope a fix they'll pay for.", d: "And say it in plain English." },
            { n: "3", t: "Build what shrinks the problem.", d: "Sometimes AI, sometimes not." },
          ].map((step) => (
            <li key={step.n} className="rounded-xl border border-line p-5">
              <span className="font-mono text-sm font-bold text-crimson">{step.n}</span>
              <p className="mt-2 font-semibold text-ink">{step.t}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#4B5563]">{step.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-ink p-7 text-center sm:p-10">
        <Link
          href={meta.ctaHref}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-crimson px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_-4px_rgba(153,27,27,0.45)] transition-colors hover:bg-crimson-light"
        >
          {meta.ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {meta.ctaChips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-white/20 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/70"
            >
              {chip}
            </li>
          ))}
        </ul>
      </section>

      <p className="border-t border-line pt-6 text-xs leading-relaxed text-[#9CA3AF]">
        Sources: Intuit QuickBooks Business Solutions Survey (2024); MIT NANDA, State of AI in
        Business (2025).
      </p>
    </div>
  )
}
