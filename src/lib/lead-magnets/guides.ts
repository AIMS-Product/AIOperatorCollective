/**
 * Gated lead-magnet guide registry.
 *
 * Each entry powers one email-gated page at `/guide/<slug>`. The page renders
 * the above-the-gate teaser (eyebrow + headline + subhead + teaser) for every
 * visitor; the body (a per-guide React component, mapped in the page route)
 * reveals only after an email is captured via POST /api/lead-magnets/guide.
 *
 * To add the next magnet: add an entry here + a body component + one line in
 * the BODIES map in `app/(landing)/guide/[slug]/page.tsx`. No new plumbing.
 *
 * Copy source of truth lives in the marketing repo:
 *   AIOC - Marketing/Content/05_assets/lead-magnets/<slug>-gated-page.md
 * (drafted + 3-lens QA verified before it lands here).
 */

export interface GuideMeta {
  /** URL slug; the page lives at /guide/<slug>. */
  slug: string
  /** Small label above the headline. Behavior/recognition cue, not a hard prerequisite. */
  eyebrow: string
  /** The hook. Max two lines on desktop. */
  headline: string
  /** One or two sentences under the headline. No em-dashes (brand convention). */
  subhead: string
  /** What unlocking gets them. Earns the email without spoiling the payoff. */
  teaser: string
  /** Submit button label on the gate form. */
  gateButtonLabel: string
  /** Reassurance under the gate button (newsletter note, unsubscribe). */
  gateMicrocopy: string
  /** Primary CTA shown at the end of the revealed body. */
  ctaHref: string
  ctaLabel: string
  /** Friction-reducing chips under the CTA. */
  ctaChips: string[]
  /** <title> + meta description / OG. */
  metaTitle: string
  metaDescription: string
  /**
   * Email nurture sequence key to enrol the captured lead into (e.g. the
   * "Little Fires" newsletter). Left undefined for now: the page delivers the
   * guide on-screen, and wiring a dedicated sequence touches the email
   * catalog, which is out of scope for this first build. Flip on once the
   * sequence exists. See the capture route for where this is read.
   */
  sequenceKey?: string
}

export const GUIDES: Record<string, GuideMeta> = {
  "judgment-gap": {
    slug: "judgment-gap",
    eyebrow: "For the technically capable",
    headline: "Everyone got the AI tools. Almost nobody knows what to do with them.",
    subhead:
      "That gap is the most valuable skill in business right now. And if you're the person who figures technology out, you're closer to it than you think.",
    teaser:
      "Here's the one-page breakdown: the gap businesses are quietly paying to close, why the tinkering you already do is the raw material, and the moves that turn it into work businesses are actively looking for.",
    gateButtonLabel: "Read the breakdown",
    gateMicrocopy:
      "No pitch. You'll also get Little Fires, my weekly note on finding the problems inside a business worth solving. Unsubscribe anytime.",
    ctaHref: "/apply",
    ctaLabel: "See if AIOC is the right fit",
    ctaChips: ["Application only", "10 seats per cohort", "No payment to apply"],
    metaTitle: "The Judgment Gap | AI Operators Collective",
    metaDescription:
      "Everyone got the AI tools. Almost nobody knows what to do with them. That gap is the most valuable skill in business right now, and you may be closer to it than you think.",
  },
}

export function getGuide(slug: string): GuideMeta | null {
  return GUIDES[slug] ?? null
}

export function allGuideSlugs(): string[] {
  return Object.keys(GUIDES)
}
