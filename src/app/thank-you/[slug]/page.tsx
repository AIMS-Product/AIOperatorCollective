import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

interface ThankYouVariant {
  eyebrow: string
  headline: string
  subhead: string
  body?: string
}

const variants: Record<string, ThankYouVariant> = {
  "mike-aioc": {
    eyebrow: "Mike × AIOC",
    headline: "You're on the list.",
    subhead: "The announcement is on its way — watch your inbox.",
    body: "You came in through Mike's note about the AI/systems operator path. The next email will land soon and lay out what AIMS, AIOC, and this path actually are.",
  },
}

const defaultVariant: ThankYouVariant = {
  eyebrow: "Thanks",
  headline: "Got it.",
  subhead: "We'll be in touch soon.",
}

function resolveVariant(slug: string): ThankYouVariant {
  return variants[slug] ?? defaultVariant
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const variant = resolveVariant(slug)
  return {
    title: `${variant.headline} | AI Operator Collective`,
    description: variant.subhead,
    robots: { index: false, follow: false },
  }
}

export default async function ThankYouPage({ params }: PageProps) {
  const { slug } = await params
  const variant = resolveVariant(slug)

  return (
    <main className="min-h-screen bg-deep text-foreground flex items-center justify-center">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-20 sm:py-28 lg:px-8">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#C4972A]">
            {variant.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {variant.headline}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            {variant.subhead}
          </p>
          {variant.body && (
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              {variant.body}
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
