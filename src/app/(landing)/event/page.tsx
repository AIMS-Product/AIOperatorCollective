import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  HelpCircle,
  Mic2,
  Radio,
  Sparkles,
  Users,
} from "lucide-react";
import { EventRegistrationForm } from "@/components/event/EventRegistrationForm";
import { AIOC_WEBINAR_EVENT } from "@/lib/marketing/webinar-event";

const details = [
  {
    icon: CalendarDays,
    label: "When",
    title: AIOC_WEBINAR_EVENT.dateLabel,
    body: AIOC_WEBINAR_EVENT.timeLabel,
  },
  {
    icon: Radio,
    label: "Format",
    title: AIOC_WEBINAR_EVENT.locationLabel,
    body: "A live case-study conversation. Replay details will go to registrants.",
  },
  {
    icon: Sparkles,
    label: "Next step",
    title: "Cohort 1 invitation",
    body: "If the session confirms the fit, apply for the July cohort after the webinar.",
  },
];

const outcomes = [
  "How SMB leaders actually experience AI once the hype meets real operations.",
  "The difference between tool-first AI and Problem-First AI.",
  "What AIMS looked for before building anything for Mike.",
  "The bottlenecks that create real AI opportunities inside small businesses.",
  "Why AIOC Cohort 1 is limited to 10 accepted people and who should apply.",
];

const speakers = [
  {
    icon: Users,
    name: "Jess Mayo",
    role: "AIMS strategy, operations, and product",
    body: "Jess works across strategy, operations, and product inside AIMS. Her lens is practical: where AI can create leverage, where it creates noise, and what kind of judgment makes someone useful to a real business.",
    initials: "JM",
  },
  {
    icon: Mic2,
    name: "Mike Hoffmann",
    role: "CEO and AIMS client",
    body: "Mike brings the buyer and operator view: what SMB leaders actually care about, what feels risky, and what makes AI help credible instead of theoretical.",
    initials: "MH",
  },
];

const agenda = [
  {
    title: "Getting started",
    time: "0-3 min",
    body: "This is not an AI tool demo. It is a real conversation about what AI looks like inside SMB operations. AI is gasoline. The business problem is the fire.",
  },
  {
    title: "Mike's before state",
    time: "3-10 min",
    body: "Mike shares what felt promising, confusing, or risky from the CEO seat, where the business actually had friction, and why generic AI solutions were not enough.",
  },
  {
    title: "What AIMS diagnosed first",
    time: "10-20 min",
    body: "Jess shows how an operator looks for repeated tasks, handoff gaps, slow follow-up, decision bottlenecks, and work that depends too much on one person.",
  },
  {
    title: "What changed for Mike",
    time: "20-30 min",
    body: "A grounded look at what became clearer, faster, easier, or more visible, without over-sharing private implementation details.",
  },
  {
    title: "The SMB opportunity",
    time: "30-37 min",
    body: "Why small businesses do not need AI theater, why judgment is becoming more valuable, and why AIOC is built for people who want to become credible AI Operators.",
  },
  {
    title: "AIOC Cohort 1",
    time: "37-43 min",
    body: "Who Cohort 1 is for, why we are accepting 10 people, what they will practice, what happens after applying, and what AIOC does not guarantee.",
  },
  {
    title: "Close and action",
    time: "43-45 min",
    body: "Apply if this made the path feel right. We will review applications and use the fit call to make sure the room is right.",
  },
];

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
];

export const metadata: Metadata = {
  title: `${AIOC_WEBINAR_EVENT.title} | AI Operators Collective`,
  description: AIOC_WEBINAR_EVENT.description,
  openGraph: {
    title: `${AIOC_WEBINAR_EVENT.title} | AI Operators Collective`,
    description: AIOC_WEBINAR_EVENT.description,
    type: "website",
  },
};

export default function EventPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-white text-ink">
      <section className="relative overflow-hidden border-b border-line bg-[#F7F7F5]">
        <div
          className="absolute inset-x-0 top-0 h-px bg-crimson/30"
          aria-hidden
        />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_440px] lg:px-8 lg:py-24">
          <div className="max-w-5xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-crimson">
              {AIOC_WEBINAR_EVENT.eyebrow}
            </p>
            <h1 className="mt-5 max-w-5xl font-serif text-[clamp(3rem,5.8vw,5.9rem)] leading-[0.96] text-ink">
              Your AI judgment can solve real business problems.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#4B5563] sm:text-xl">
              If you already tinker with AI, this conversation shows what makes
              that ability useful to a real business: spotting the bottleneck,
              asking better questions, and knowing what is worth building.
            </p>

            <div className="mt-9 flex">
              <Link
                href="#register"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-crimson px-6 text-sm font-bold uppercase tracking-wider text-white shadow-[0_12px_32px_-18px_rgba(152,27,27,0.9)] transition-colors hover:bg-crimson-dark"
              >
                Save my seat
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          <aside id="register" className="scroll-mt-28 lg:pt-7">
            <EventRegistrationForm />
            <div className="mt-4 overflow-hidden rounded-md border border-line bg-white">
              <div className="grid grid-cols-[104px_1fr]">
                <div className="grid min-h-24 place-items-center bg-ink px-4 text-center">
                  <div className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-white">
                    JM
                    <span className="mx-1 text-crimson-light">+</span>
                    MH
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-crimson">
                    Live with Jess and Mike
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#4B5563]">
                    A buyer/operator view on where your AI instincts become
                    credible inside real SMB work.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <div className="grid grid-flow-dense grid-cols-1 border-y border-line md:grid-cols-3 lg:col-span-2">
            {details.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="border-line py-6 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
                >
                  <div className="flex items-center gap-2 text-crimson">
                    <Icon className="h-4 w-4" aria-hidden />
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">
                      {item.label}
                    </p>
                  </div>
                  <h2 className="mt-4 text-base font-semibold text-ink">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#5F6671]">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-crimson">
              What this is
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
              A practical conversation about buyer trust, not tool fluency.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#4B5563]">
              Most AI conversations start with tools. Real businesses do not.
              They start with bottlenecks, handoffs, time, trust, and risk. That
              is where useful AI work begins.
            </p>
          </div>

          <div className="grid grid-flow-dense grid-cols-1 gap-3 sm:grid-cols-2">
            {outcomes.map((item, index) => (
              <div
                key={item}
                className={[
                  "group rounded-md border border-line bg-white p-6 transition-all duration-300 hover:border-crimson/30 hover:shadow-[0_18px_50px_-36px_rgba(26,26,26,0.65)]",
                  index === 0 ? "sm:col-span-2" : "",
                ].join(" ")}
              >
                <CheckCircle2
                  className="h-5 w-5 text-crimson transition-transform duration-300 group-hover:scale-110"
                  aria-hidden
                />
                <p className="mt-4 text-base leading-7 text-[#3B414A]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-5 py-24 text-white sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-crimson-light">
                The conversation
              </p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
                Buyer perspective meets operator judgment.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-white/68 lg:justify-self-end">
              The point is not to make AI sound impressive. It is to understand
              what a business leader needs to trust, fund, and adopt a better
              system.
            </p>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-2">
            {speakers.map((speaker) => {
              const Icon = speaker.icon;
              return (
                <div
                  key={speaker.name}
                  className="group rounded-md border border-white/12 bg-white/[0.04] p-7 transition-colors hover:border-crimson/40"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <Icon
                        className="h-6 w-6 text-crimson-light"
                        aria-hidden
                      />
                      <h3 className="mt-5 font-serif text-3xl leading-tight text-white">
                        {speaker.name}
                      </h3>
                    </div>
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/[0.06] font-serif text-2xl text-white/80 transition-colors group-hover:border-crimson/40">
                      {speaker.initials}
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-white/48">
                    {speaker.role}
                  </p>
                  <p className="mt-5 text-base leading-7 text-white/70">
                    {speaker.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="agenda"
        className="bg-[#F7F7F5] px-5 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-crimson">
              Run of show
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Forty-five minutes on how useful AI work actually gets found.
            </h2>
            <p className="mt-6 text-base leading-7 text-[#4B5563]">
              We will keep it tight: Mike&apos;s before state, what AIMS
              diagnosed first, what changed at a category level, and how Cohort
              1 works if the path feels right.
            </p>
          </div>

          <div className="divide-y divide-line rounded-md border border-line bg-white">
            {agenda.map((item) => (
              <div
                key={item.title}
                className="grid gap-4 p-6 transition-colors hover:bg-crimson/5 sm:grid-cols-[120px_1fr] sm:p-7"
              >
                <p className="font-mono text-xs font-bold text-crimson">
                  {item.time}
                </p>
                <div>
                  <h3 className="font-serif text-2xl leading-tight text-ink sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[#4B5563]">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-crimson">
              Before you register
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              What this is, what it is not, and who it is for.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#4B5563]">
              No hype, no income promises, just a useful room.
            </p>
          </div>

          <div className="grid gap-3">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-md border border-line bg-white p-6"
              >
                <div className="flex gap-3">
                  <HelpCircle
                    className="mt-1 h-5 w-5 shrink-0 text-crimson"
                    aria-hidden
                  />
                  <div>
                    <h3 className="text-lg font-semibold leading-7 text-ink">
                      {faq.q}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#4B5563]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-6 sm:pb-32 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-md bg-crimson px-6 py-12 text-center text-white sm:px-10 sm:py-16">
          <h2 className="mx-auto max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
            If this makes the path feel right, apply for Cohort 1 next.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/78">
            We are accepting 10 people for July and using the application plus
            fit call to make sure the room is right. No guarantees, no magic, no
            passive-income story.
          </p>
          <Link
            href="#register"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-sm font-bold uppercase tracking-wider text-crimson transition-colors hover:bg-[#F5F5F5]"
          >
            Register for the webinar
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
