import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CalendarDays, MapPin, Radio, Sparkles } from "lucide-react"
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
    body: "Join from wherever you do your best thinking.",
  },
  {
    icon: Sparkles,
    title: "No prep required",
    body: "Bring a business, job, or workflow you keep noticing.",
  },
]

const agenda = [
  {
    title: "Why tool fluency stopped being rare",
    body: "The useful edge is no longer knowing that AI exists. It is knowing where to point it.",
  },
  {
    title: "How to spot a little fire",
    body: "We will look at the signals that a messy process, decision, or handoff is worth investigating.",
  },
  {
    title: "What an operator does next",
    body: "A simple path from noticing a problem to testing whether the business would value a fix.",
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
              "linear-gradient(180deg, rgba(26,26,26,0.72), rgba(26,26,26,0.92)), url('https://picsum.photos/seed/ai-business-workshop/1920/1280')",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(196,36,36,0.35),transparent_44%)]" aria-hidden />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
            {AIOC_WEBINAR_EVENT.eyebrow}
          </p>
          <h1 className="mt-5 max-w-6xl font-serif text-[clamp(3rem,6vw,5.8rem)] leading-[0.96] text-white">
            Find the little fires{" "}
            <span
              className="mx-1 inline-block h-10 w-24 rounded-full bg-cover bg-center align-middle shadow-[0_12px_40px_-20px_rgba(255,255,255,0.9)] grayscale contrast-125 sm:h-12 sm:w-32"
              style={{ backgroundImage: "url('https://picsum.photos/seed/operator-fire/400/180')" }}
              aria-hidden
            />
            inside a business.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/82 sm:text-xl">
            A live webinar for people who already tinker with AI and want to learn the business
            judgment that makes those skills useful.
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
              AI is gasoline. The work is finding the fire.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#4B5563]">
              The session is built around a simple operator question: where is the business already
              hot enough that a better system, workflow, or AI-assisted fix would matter?
            </p>
          </div>

          <div className="group overflow-hidden rounded-md border border-line bg-white md:col-span-7">
            <div
              className="h-64 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: "url('https://picsum.photos/seed/business-ops-map/1200/700')" }}
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

      <section id="agenda" className="bg-panel px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-crimson">
              What we will cover
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Leave with a sharper eye for valuable problems.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#4B5563]">
              Not a tool demo. Not hype. The goal is to make the invisible business problems easier
              to see.
            </p>
          </div>

          <div className="space-y-4">
            {agenda.map((item, index) => (
              <div
                key={item.title}
                className="rounded-md border border-line bg-white p-7 shadow-[0_18px_70px_-55px_rgba(26,26,26,0.55)]"
              >
                <p className="font-mono text-xs font-bold text-crimson">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-serif text-3xl leading-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#4B5563]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-md bg-ink px-6 py-12 text-center text-white sm:px-10 sm:py-16">
          <MapPin className="mx-auto h-6 w-6 text-crimson-light" aria-hidden />
          <h2 className="mx-auto mt-5 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
            If you already notice broken systems, this will give you a better way to name what you see.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">
            Registration is open now. We will send final timing and the live access link by email.
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

