import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CalendarDays, CheckCircle2, HelpCircle, MapPin, Mic2, Radio, Sparkles, Users } from "lucide-react"
import { EventRegistrationForm } from "@/components/event/EventRegistrationForm"
import { AIOC_WEBINAR_EVENT } from "@/lib/marketing/webinar-event"

const details = [
  {
    icon: CalendarDays,
    title: AIOC_WEBINAR_EVENT.dateLabel,
    body: AIOC_WEBINAR_EVENT.timeLabel,
  },
  {
    icon: Radio,
    title: AIOC_WEBINAR_EVENT.locationLabel,
    body: "Join live for the case-study conversation. Replay details will go to registrants.",
  },
  {
    icon: Sparkles,
    title: "Cohort 1 invitation",
    body: "If the session confirms this path is worth exploring, the next step is applying for the July cohort.",
  },
]

const outcomes = [
  "How SMB leaders actually experience AI once the hype meets real operations.",
  "The difference between tool-first AI and Problem-First AI.",
  "What AIMS looked for before building anything for Mike.",
  "The kinds of bottlenecks that create real AI opportunities inside small businesses.",
  "Why AIOC Cohort 1 is limited to 10 accepted people and who should apply.",
]

const speakers = [
  {
    icon: Users,
    name: "Jess Mayo",
    role: "AIMS strategy, operations, and product",
    body: "Jess works across strategy, operations, and product inside AIMS. Her lens is practical: where AI can create leverage, where it creates noise, and what kind of judgment makes someone useful to a real business.",
  },
  {
    icon: Mic2,
    name: "Mike Hoffmann",
    role: "CEO and AIMS client",
    body: "Mike brings the buyer and operator view: what SMB leaders actually care about, what feels risky, and what makes AI help credible instead of theoretical.",
  },
]

const agenda = [
  {
    title: "Set the frame",
    time: "0-5 min",
    body: "This is not a tool demo. AI is gasoline. The business problem is the fire.",
  },
  {
    title: "Mike's before state",
    time: "5-15 min",
    body: "What AI looked like from the CEO seat, where the uncertainty was, and which problems seemed worth solving.",
  },
  {
    title: "What AIMS diagnosed",
    time: "15-30 min",
    body: "The bottleneck map: repeated tasks, handoff gaps, lost time, missed follow-up, and decision drag.",
  },
  {
    title: "What changed",
    time: "30-42 min",
    body: "What became clearer, faster, or easier at a category level, without exposing private implementation details.",
  },
  {
    title: "The SMB opportunity",
    time: "42-52 min",
    body: "Why SMBs need people who can diagnose valuable problems, scope useful systems, and explain tradeoffs.",
  },
  {
    title: "AIOC Cohort 1",
    time: "52-60 min",
    body: "Who the cohort is for, why we are accepting 10 people for July, and what happens after applying.",
  },
]

const faqs = [
  {
    q: "Is this a technical webinar?",
    a: "No. We will talk about real business problems first and AI second. You do not need to be an engineer, but you should be the kind of person who is already tinkering, testing, or trying to make AI useful in real work.",
  },
  {
    q: "Is this for business owners or people who want to serve business owners?",
    a: "Both can learn from it, but the AIOC Cohort 1 invitation is mainly for latent builders: people who want to become credible AI Operators by learning how to spot and solve real business problems.",
  },
  {
    q: "Will this guarantee clients or income?",
    a: "No. AIOC does not guarantee clients, income, placement, W2 replacement, or AIMS work. The goal is to build judgment, practice, proof, and a stronger ability to solve real problems.",
  },
  {
    q: "Why only 10 accepted?",
    a: "Because Cohort 1 needs a tight room, direct feedback, and enough attention to learn what works. The cap is about quality and fit, not hype.",
  },
  {
    q: "Will there be a replay?",
    a: "Yes, but the live session is where Jess and Mike can answer questions and explain the Cohort 1 path most clearly.",
  },
]

export const metadata: Metadata = {
  title: `${AIOC_WEBINAR_EVENT.title} | AI Operators Collective`,
  description: AIOC_WEBINAR_EVENT.description,
  openGraph: {
    title: `${AIOC_WEBINAR_EVENT.title} | AI Operators Collective`,
    description: AIOC_WEBINAR_EVENT.description,
    type: "website",
  },
}

export default function EventPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-white text-ink">
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(26,26,26,0.72), rgba(26,26,26,0.92)), url('/og-image.png')",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(196,36,36,0.35),transparent_44%)]" aria-hidden />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
            {AIOC_WEBINAR_EVENT.eyebrow}
          </p>
          <h1 className="mt-5 max-w-6xl font-serif text-[clamp(3rem,6vw,5.8rem)] leading-[0.96] text-white">
            AI In The Workplace:{" "}
            <span
              className="mx-1 inline-block h-10 w-24 rounded-full bg-cover bg-center align-middle shadow-[0_12px_40px_-20px_rgba(255,255,255,0.9)] grayscale contrast-125 sm:h-12 sm:w-32"
              style={{ backgroundImage: "url('/logo.png')" }}
              aria-hidden
            />
            What Small Businesses Actually Need
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/82 sm:text-xl">
            Jess Mayo sits down with Mike Hoffmann, a CEO and AIMS client with multiple businesses,
            to unpack what useful AI adoption really looks like: the bottlenecks, the judgment
            calls, the systems, and the opportunity for people who can help SMBs solve real
            problems.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#register"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-[#F5F5F5]"
            >
              Save my spot
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="#agenda"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/35 px-6 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
            >
              See the plan
            </Link>
          </div>

          <div id="register" className="mt-10 w-full max-w-xl scroll-mt-28 text-left">
            <EventRegistrationForm />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-flow-dense grid-cols-1 gap-3 md:grid-cols-12">
          <div className="rounded-md border border-line bg-panel p-7 md:col-span-5 md:row-span-2">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-crimson">
              What this is
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              A real operator conversation, not another AI tools lecture.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#4B5563]">
              Most AI conversations start with tools. Real businesses do not. They start with
              bottlenecks, handoffs, time, trust, and risk. That is what Jess and Mike will unpack
              live.
            </p>
          </div>

          <div className="group overflow-hidden rounded-md border border-line bg-white md:col-span-7">
            <div
              className="h-64 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: "url('/og-image.png')" }}
              aria-hidden
            />
          </div>

          {details.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="rounded-md border border-line bg-white p-6 md:col-span-4">
                <Icon className="h-5 w-5 text-crimson" aria-hidden />
                <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4B5563]">{item.body}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-crimson">
              What you will walk away with
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              A cleaner way to tell whether AI is useful in a business.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#4B5563]">
              The goal is not to watch a polished demo. The goal is to understand how useful AI
              work gets found before a tool enters the conversation.
            </p>
          </div>

          <div className="grid gap-3">
            {outcomes.map((item) => (
              <div key={item} className="flex gap-3 rounded-md border border-line bg-white p-5">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-crimson" aria-hidden />
                <p className="text-sm leading-6 text-[#4B5563]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-panel px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-crimson">
              The conversation
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Buyer perspective meets operator judgment.
            </h2>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {speakers.map((speaker) => {
              const Icon = speaker.icon
              return (
                <div key={speaker.name} className="rounded-md border border-line bg-white p-7">
                  <Icon className="h-6 w-6 text-crimson" aria-hidden />
                  <h3 className="mt-5 font-serif text-3xl leading-tight text-ink">{speaker.name}</h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#737373]">
                    {speaker.role}
                  </p>
                  <p className="mt-5 text-base leading-7 text-[#4B5563]">{speaker.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="agenda" className="bg-panel px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-crimson">
              Run of show
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Sixty minutes on what actually makes AI useful at work.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#4B5563]">
              We will keep the session focused: a live case-study conversation, the SMB opportunity,
              then a clear invitation to apply for AIOC Cohort 1 if the fit is there.
            </p>
          </div>

          <div className="space-y-4">
            {agenda.map((item, index) => (
              <div
                key={item.title}
                className="rounded-md border border-line bg-white p-7 shadow-[0_18px_70px_-55px_rgba(26,26,26,0.55)]"
              >
                <p className="font-mono text-xs font-bold text-crimson">
                  {item.time}
                </p>
                <h3 className="mt-4 font-serif text-3xl leading-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#4B5563]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-crimson">
              Useful answers before you register
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Clear expectations, no magic-story fog.
            </h2>
          </div>

          <div className="mt-10 grid gap-3">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-md border border-line bg-white p-6">
                <div className="flex gap-3">
                  <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-crimson" aria-hidden />
                  <div>
                    <h3 className="text-lg font-semibold leading-7 text-ink">{faq.q}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#4B5563]">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-md bg-ink px-6 py-12 text-center text-white sm:px-10 sm:py-16">
          <MapPin className="mx-auto h-6 w-6 text-crimson-light" aria-hidden />
          <h2 className="mx-auto mt-5 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
            If this makes the path feel more real, apply for Cohort 1 next.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">
            We are accepting 10 people for July and using the application plus fit call to make
            sure the room is right. No guarantees, no magic, no passive-income story.
          </p>
          <Link
            href="#register"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-crimson px-6 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-crimson-light"
          >
            Register for the webinar
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  )
}
