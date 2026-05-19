import type { Metadata } from "next"
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock3,
  Download,
  Flame,
  Search,
  Target,
  Wrench,
  Workflow,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Your call is confirmed - AI Operator Collective",
  description:
    "Your AI Operator Collective call is booked. Confirm the calendar invite and preview practical business problems AI Operators learn to spot.",
  robots: { index: false, follow: false },
}

interface CaseStudy {
  company: string
  industry: string
  headline: string
  fire: string
  fix: string
  result: string
  lesson: string
  icon: typeof Search
}

const CASE_STUDIES: CaseStudy[] = [
  {
    company: "McKenzie",
    industry: "Promotional printing",
    headline: "Finding acquisition targets without hiring a research team.",
    fire:
      "McKenzie had a strong product and wanted to expand by finding specific businesses they could acquire. The ask sounded big: identify the right companies, understand each one, and reach the owners.",
    fix:
      "The useful move was not a complicated AI product. It was a clear target profile, AI-assisted company research, owner contact discovery, and hyper-personalized outreach at scale.",
    result:
      "McKenzie is actively speaking with businesses that may be open to selling.",
    lesson:
      "Good AI work starts with narrowing the question. Once the business knew exactly what it was looking for, AI became leverage instead of noise.",
    icon: Search,
  },
  {
    company: "Alpha",
    industry: "Landscaping",
    headline: "Solving the scheduling problem before building an AI agent.",
    fire:
      "Alpha came in thinking they needed an AI agent to handle initial consultation scheduling. The real problem was simpler: four to five days of back-and-forth just to get a prospect onto the calendar.",
    fix:
      "Instead of overbuilding, the better first move was a lead form connected to a booking flow that already understood their availability.",
    result:
      "A faster path from interested lead to scheduled consultation, without selling them a more complex system than they needed.",
    lesson:
      "Sometimes the operator move is restraint. The win is solving the real bottleneck quickly, not proving you can build the flashiest AI thing.",
    icon: Calendar,
  },
  {
    company: "Modern Amenities",
    industry: "Vending services",
    headline: "Getting three systems to talk to each other.",
    fire:
      "Modern Amenities operates nationally and had sales data living across three disconnected systems. Their team was spending hours every week doing manual data entry just to keep the portfolio view current.",
    fix:
      "The practical solution was connecting the systems so an update in one place could update the others automatically.",
    result:
      "The workflow saves an estimated 10-15 hours per week - time the sales team can now put back into prospecting new locations.",
    lesson:
      "This is the kind of ROI businesses understand: fewer manual handoffs, cleaner data, and more time spent on work that grows the business.",
    icon: Workflow,
  },
]

const COMMON_THREADS = [
  {
    title: "The business did not need an AI gimmick.",
    body:
      "Each example started with a business problem: acquisition research, scheduling friction, or disconnected systems.",
    icon: Flame,
  },
  {
    title: "The operator's job was to find the actual fire.",
    body:
      "Before picking tools, the work was clarifying where time, money, or momentum was leaking.",
    icon: Target,
  },
  {
    title: "The first useful solution was practical and scoped.",
    body:
      "The win came from making the problem smaller, faster, or easier to manage - not from making the build more impressive.",
    icon: Wrench,
  },
]

const PREP_PROMPTS = [
  "Your background and the kinds of businesses or teams you already understand.",
  "A business process you have seen break down, slow people down, or create repeated manual work.",
  "The direction you want this AI skill set to open for you next.",
]

type SearchParams = Promise<Record<string, string | string[] | undefined>>

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function calendarDownloadHref(eventUri: string | undefined) {
  if (!eventUri) return null

  const params = new URLSearchParams({ eventUri })
  return `/api/calendly/calendar?${params.toString()}`
}

export default async function PostBookingNextStepsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const calendarHref = calendarDownloadHref(firstParam(params.calendlyEventUri))

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#1A1A1A]">
      <section className="px-5 pb-10 pt-16 sm:px-8 sm:pb-14 sm:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-crimson/10 px-3 py-1 text-crimson">
            <CheckCircle2 className="h-4 w-4" />
            <span className="font-mono text-xs uppercase tracking-wider">
              Your call is confirmed
            </span>
          </div>

          <h1 className="mb-5 font-playfair text-3xl leading-[1.05] text-[#1A1A1A] sm:text-5xl md:text-6xl">
            You&apos;re booked.
            <span className="block italic text-crimson">
              Now let&apos;s make this useful.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
            Before we talk, skim a few real examples of the kind of practical
            business problems AI Operators learn to spot. The goal is not to
            collect tools. The goal is to build a skill set you can take into
            real business conversations.
          </p>
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-8 sm:pb-16">
        <div className="mx-auto max-w-4xl rounded-lg border border-[#E3E3E3] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-crimson/10 text-crimson">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="mb-1 font-mono text-xs uppercase tracking-wider text-crimson">
                Do this first
              </p>
              <h2 className="mb-2 font-playfair text-2xl text-[#1A1A1A] sm:text-3xl">
                Make sure the Calendly invite is on your calendar.
              </h2>
              <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
                Calendly sent the invite to your inbox. Add it to the calendar
                you actually check, and use the reschedule link in that email if
                the time needs to move.
              </p>
              <div className="mt-4 rounded-md border border-[#E3E3E3] bg-[#FAFAF7] p-3">
                {calendarHref ? (
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-relaxed text-[#737373]">
                      Calendly also sent the invite to your inbox. This button
                      downloads a backup calendar file for the call.
                    </p>
                    <a
                      href={calendarHref}
                      download
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-crimson px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-crimson/90"
                    >
                      <Download className="h-4 w-4" />
                      Add to calendar
                    </a>
                  </div>
                ) : (
                  <p className="text-xs leading-relaxed text-[#737373]">
                    Calendly also sent the invite to your inbox. If this page
                    was opened without booking details, use the calendar link in
                    that email.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-8 sm:pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-crimson">
              Practical examples
            </p>
            <h2 className="mb-4 font-playfair text-2xl leading-tight text-[#1A1A1A] sm:text-4xl">
              Three little fires a business was already feeling.
            </h2>
            <p className="text-[#4B5563]">
              These are entry-level examples on purpose. They are not about
              showing off the most complicated AI stack. They are about seeing
              the real business problem underneath the request.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {CASE_STUDIES.map((study) => (
              <article
                key={study.company}
                className="flex h-full flex-col rounded-lg border border-[#E3E3E3] bg-white p-5 shadow-sm transition-colors hover:border-crimson/40 sm:p-6"
              >
                <div className="mb-5 flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-crimson/10 text-crimson">
                    <study.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-crimson">
                      {study.industry}
                    </p>
                    <h3 className="font-playfair text-2xl leading-tight text-[#1A1A1A]">
                      {study.company}
                    </h3>
                  </div>
                </div>

                <p className="mb-5 text-lg font-semibold leading-snug text-[#1A1A1A]">
                  {study.headline}
                </p>

                <div className="space-y-4 text-sm leading-relaxed">
                  <div>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-[#999]">
                      The fire
                    </p>
                    <p className="text-[#4B5563]">{study.fire}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-[#999]">
                      The fix
                    </p>
                    <p className="text-[#4B5563]">{study.fix}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-[#999]">
                      What changed
                    </p>
                    <p className="text-[#1A1A1A]">{study.result}</p>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#F0F0F0] pt-4">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-crimson">
                    Operator lesson
                  </p>
                  <p className="text-sm leading-relaxed text-[#4B5563]">
                    {study.lesson}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-8 sm:pb-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-7 max-w-3xl">
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-crimson">
              The pattern
            </p>
            <h2 className="font-playfair text-2xl leading-tight text-[#1A1A1A] sm:text-4xl">
              What these have in common.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {COMMON_THREADS.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-[#E3E3E3] bg-white p-5 shadow-sm"
              >
                <item.icon className="mb-3 h-5 w-5 text-crimson" />
                <h3 className="mb-2 font-semibold leading-snug text-[#1A1A1A]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4B5563]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="mx-auto max-w-4xl rounded-lg border border-[#E3E3E3] bg-white p-7 shadow-sm sm:p-10">
          <div className="mb-6 flex items-center gap-3 text-crimson">
            <Clock3 className="h-5 w-5" />
            <p className="font-mono text-xs uppercase tracking-wider">
              For your call
            </p>
          </div>

          <h2 className="mb-4 font-playfair text-2xl leading-tight text-[#1A1A1A] sm:text-4xl">
            On the call, we&apos;ll talk through what this could look like for
            you.
          </h2>

          <p className="mb-6 text-base leading-relaxed text-[#4B5563] sm:text-lg">
            You do not need to show up with a perfect plan. Bring raw material:
            what you have seen, what you are curious about, and where you want
            this skill set to create more options.
          </p>

          <div className="space-y-3">
            {PREP_PROMPTS.map((prompt) => (
              <div
                key={prompt}
                className="flex gap-3 rounded-md border border-[#E3E3E3] bg-[#FAFAF7] p-3"
              >
                <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-crimson" />
                <p className="text-sm leading-relaxed text-[#4B5563]">
                  {prompt}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-7 text-sm leading-relaxed text-[#737373]">
            We will use that conversation to see whether AIOC is the right next
            room for you, and what the first practical shape of this work could
            be.
          </p>
        </div>
      </section>
    </main>
  )
}
