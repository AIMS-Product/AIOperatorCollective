import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { GuideGate } from "@/components/guide/GuideGate"
import { JudgmentGapGuide } from "@/components/guide/JudgmentGapGuide"
import { allGuideSlugs, getGuide, type GuideMeta } from "@/lib/lead-magnets/guides"

/**
 * Email-gated lead-magnet pages: /guide/<slug>.
 *
 * The registry (lib/lead-magnets/guides.ts) holds the teaser + meta for every
 * guide. The revealed body is a per-guide component mapped below. Adding a new
 * magnet = registry entry + body component + one line in BODIES.
 */
const BODIES: Record<string, (meta: GuideMeta) => React.ReactNode> = {
  "judgment-gap": (meta) => <JudgmentGapGuide meta={meta} />,
}

export function generateStaticParams() {
  return allGuideSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return { title: "Guide not found" }
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      type: "article",
    },
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getGuide(slug)
  const body = BODIES[slug]
  if (!guide || !body) notFound()

  return <GuideGate meta={guide}>{body(guide)}</GuideGate>
}
