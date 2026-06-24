import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ListChecks,
  Mail,
  Radio,
} from "lucide-react";
import { WebinarCalendarButtons } from "@/components/event/WebinarCalendarButtons";
import { AIOC_WEBINAR_EVENT } from "@/lib/marketing/webinar-event";

const eventDetails = [
  {
    icon: CalendarDays,
    label: "Date",
    title: AIOC_WEBINAR_EVENT.dateLabel,
    body: "Put it on your calendar now. Demio will send your unique access link separately.",
  },
  {
    icon: Clock3,
    label: "Time",
    title: AIOC_WEBINAR_EVENT.timeLabel,
    body: "Join live if you can. The examples will make more sense in order.",
  },
  {
    icon: Radio,
    label: "Format",
    title: AIOC_WEBINAR_EVENT.locationLabel,
    body: "Live Jess + Mike conversation. Replay details will go to registrants.",
  },
];

const ceoProblemExamples = [
  "They ask for more leads, but the first useful fix may be the leak after a lead raises their hand.",
  "They ask for automation, but the real issue may be follow-up, ownership, or trust in the process.",
  "They ask for AI, but often cannot name which business problem should be solved first.",
  "The operator's job is not to sell a stack of tools. It is to find the problem a business can see, value, and say yes to.",
];

const mikeContextPoints = [
  {
    title: "Mike brings the CEO/operator side of the table.",
    body: "He is a multi-company CEO/operator, AIMS client, AIMS investor, and AIOC launch partner. He knows what feels useful, what feels risky, and what makes a fix worth changing the business around.",
  },
  {
    title: "AIMS has worked inside his businesses.",
    body: "AIMS has installed AI systems and solved operating problems inside Mike-led companies including Vendingpreneurs, Modern Amenities, VendHub, and others.",
  },
  {
    title: "The lesson is the lens.",
    body: "The point is not to copy Mike's exact playbook. It is to hear how a vague business request becomes a problem clear enough to diagnose, scope, and explain.",
  },
];

const listenForPrompts = [
  "What did the business ask for first?",
  "What had to be diagnosed before AI made sense?",
  "What would make the first fix worth trusting?",
];

const nextSteps = [
  "Add the session to your calendar.",
  "Watch for the Demio email with your unique join link.",
  "Show up live and listen for the request -> diagnosis -> first useful fix pattern.",
];

const callFocusItems = [
  "The first request",
  "The real diagnosis",
  "The first useful fix",
];

export const metadata: Metadata = {
  title: `You're registered | ${AIOC_WEBINAR_EVENT.title}`,
  description:
    "Confirmation details for the AI Operators Collective webinar with Jess Mayo and Mike Hoffmann.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EventConfirmedPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-white text-ink">
      <section className="relative overflow-hidden border-b border-line bg-[#F7F7F5]">
        <div className="absolute inset-x-0 top-0 h-px bg-crimson/30" />
        <div className="absolute right-[-18rem] top-[-18rem] h-[34rem] w-[34rem] rounded-full bg-crimson/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
            <div className="relative z-10 animate-fade-up">
              <div className="inline-flex items-center gap-2 border-l-2 border-crimson bg-white px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-crimson shadow-[0_16px_50px_-44px_rgba(26,26,26,0.7)]">
                <CheckCircle2 className="h-4 w-4" aria-hidden />
                Registered
              </div>
              <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.8rem,5vw,5.2rem)] leading-[0.98] text-ink">
                You&apos;re registered.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#4B5563] sm:text-xl">
                You&apos;re set for{" "}
                <strong className="font-semibold text-ink">
                  {AIOC_WEBINAR_EVENT.title}
                </strong>{" "}
                on {AIOC_WEBINAR_EVENT.dateLabel} at{" "}
                {AIOC_WEBINAR_EVENT.timeLabel}. Demio will email your unique
                join link and reminders.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#5F6671]">
                Add it to the calendar you actually use, then show up live to
                test whether this business path fits the way you already think
                through technology.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#calendar"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-crimson px-6 text-sm font-bold uppercase tracking-wider text-white shadow-[0_12px_32px_-18px_rgba(152,27,27,0.9)] transition-colors hover:bg-crimson-dark"
                >
                  Add to calendar
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href="#lens"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-line bg-white px-6 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:border-crimson/30 hover:text-crimson"
                >
                  What to listen for
                </a>
              </div>

              <div
                id="calendar"
                className="mt-9 scroll-mt-24 border-y border-line py-6"
              >
                <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-crimson">
                      Add it now
                    </p>
                    <h2 className="mt-3 max-w-xl text-2xl font-semibold leading-tight text-ink">
                      Put the session on the calendar you actually use.
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-6 text-[#5F6671]">
                      Google and Outlook open directly. Apple/iCal downloads
                      the invite. Your unique join link still comes from Demio.
                    </p>
                  </div>
                  <WebinarCalendarButtons />
                </div>
              </div>
            </div>

            <aside className="relative z-10">
              <div className="overflow-hidden rounded-md border border-line bg-white shadow-[0_26px_80px_-52px_rgba(26,26,26,0.72)]">
                <div className="border-b border-line bg-ink p-5 text-white">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-crimson-light">
                    Event details
                  </p>
                  <h2 className="mt-3 font-serif text-3xl leading-tight text-white">
                    Save the time. Watch for the lens.
                  </h2>
                </div>
                <div className="divide-y divide-line">
                  {eventDetails.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="p-5">
                        <div className="flex items-center gap-2 text-crimson">
                          <Icon className="h-4 w-4" aria-hidden />
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">
                            {item.label}
                          </p>
                        </div>
                        <h3 className="mt-3 text-base font-semibold text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-[#5F6671]">
                          {item.body}
                        </p>
                      </div>
                    );
                  })}
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <Mail className="mt-1 h-5 w-5 shrink-0 text-crimson" />
                      <div>
                        <h3 className="text-base font-semibold text-ink">
                          Check your inbox.
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-[#4B5563]">
                          You&apos;ll get an AIOC confirmation email for the
                          calendar options, and Demio will send your join link.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="relative z-10 mt-10 overflow-hidden rounded-md border border-line bg-white shadow-[0_22px_70px_-58px_rgba(26,26,26,0.65)]">
            <div className="grid grid-flow-dense grid-cols-1 lg:grid-cols-[0.78fr_1.22fr]">
              <div className="bg-ink p-6 text-white sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/14 bg-white/[0.06] font-serif text-xl">
                    MH
                  </div>
                  <div className="h-px flex-1 bg-white/14" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/14 bg-white/[0.06] font-serif text-xl">
                    JM
                  </div>
                </div>
                <p className="mt-7 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-crimson-light">
                  Case-study conversation
                </p>
                <h2 className="mt-3 max-w-lg font-serif text-4xl leading-tight text-white">
                  Mike Hoffmann brings the CEO/operator lens.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-6 text-white/70">
                  AIMS has worked inside Mike&apos;s businesses, including
                  Vendingpreneurs, Modern Amenities, VendHub, and others. That
                  lets us talk about AI from the side that has to decide whether
                  a solution is worth changing behavior around.
                </p>
              </div>

              <div className="grid grid-flow-dense grid-cols-1 divide-y divide-line">
                <div className="p-6 sm:p-8">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-crimson">
                    On the call, watch for
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {callFocusItems.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-md border border-line bg-[#F7F7F5] p-4"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-crimson"
                          aria-hidden
                        />
                        <p className="text-sm font-semibold leading-6 text-[#3B414A]">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-flow-dense grid-cols-1 divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
                  {mikeContextPoints.map((point) => (
                    <div key={point.title} className="p-6">
                      <h3 className="text-base font-semibold leading-6 text-ink">
                        {point.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[#5F6671]">
                        {point.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="prepare" className="px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-crimson">
              Why live matters
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Business owners usually bring the symptom, not the diagnosis.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#4B5563]">
              This is why the examples matter. A business may ask for more
              leads, more automation, or some AI. The valuable work is figuring
              out what is actually leaking time, revenue, trust, or capacity.
            </p>
            <p className="mt-4 max-w-lg text-base leading-7 text-[#4B5563]">
              You do not need to bring a problem for us to workshop live. Just
              listen for the pattern.
            </p>
          </div>

          <div className="grid grid-flow-dense grid-cols-1 gap-3 sm:grid-cols-2">
            {ceoProblemExamples.map((prompt, index) => (
              <div
                key={prompt}
                className={[
                  "group rounded-md border border-line bg-white p-6 transition-all duration-300 hover:border-crimson/30 hover:shadow-[0_18px_50px_-36px_rgba(26,26,26,0.65)]",
                  index === 0 ? "sm:col-span-2" : "",
                  index === ceoProblemExamples.length - 1 ? "sm:col-span-2" : "",
                ].join(" ")}
              >
                <CheckCircle2
                  className="h-5 w-5 text-crimson transition-transform duration-300 group-hover:scale-110"
                  aria-hidden
                />
                <p className="mt-4 text-base leading-7 text-[#3B414A]">
                  {prompt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="lens"
        className="scroll-mt-24 bg-ink px-5 py-24 text-white sm:px-6 sm:py-32 lg:px-8"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-crimson-light">
              The operator lens
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
              Listen for the gap between the first request and the real problem.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/68">
              Most owners are not buying a technical explanation. They need a
              fix whose value is clear enough to trust. Watch how Jess and Mike
              move from the first request to the diagnosis, then to the first
              fix a business could understand.
            </p>
          </div>

          <div className="rounded-md border border-white/12 bg-white/[0.04] p-7">
            <ListChecks className="h-6 w-6 text-crimson-light" aria-hidden />
            <h3 className="mt-5 font-serif text-3xl leading-tight text-white">
              What to listen for.
            </h3>
            <p className="mt-4 text-base leading-7 text-white/70">
              You are not expected to know how to run this process yet. That is
              the point. Notice which parts require business judgment, not just
              tool fluency.
            </p>
            <div className="mt-7 divide-y divide-white/12 rounded-md border border-white/12 bg-white/[0.05]">
              {listenForPrompts.map((prompt, index) => (
                <div
                  key={prompt}
                  className="grid gap-4 p-5 sm:grid-cols-[36px_1fr]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-crimson text-xs font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="self-center text-base leading-7 text-white/78">
                    {prompt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-crimson">
              What happens next
            </p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Add it once. Let the reminders do their job.
            </h2>
          </div>

          <div className="divide-y divide-line rounded-md border border-line bg-white">
            {nextSteps.map((step, index) => (
              <div
                key={step}
                className="grid gap-4 p-6 sm:grid-cols-[48px_1fr]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-crimson text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="self-center text-base leading-7 text-[#3B414A]">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-6 sm:pb-32 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-md bg-crimson px-6 py-12 text-center text-white sm:px-10 sm:py-16">
          <h2 className="mx-auto max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
            After the session, decide whether this is the work you want to
            practice.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/78">
            If the examples make the path feel real, AIOC Cohort 1 is the
            deeper next step: an apprenticeship-style room for practicing
            diagnosis, scoping, business conversations, and useful AI-enabled
            work. No payment to apply, and no guaranteed clients, income,
            placement, W2 replacement, or AIMS work.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#calendar"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-sm font-bold uppercase tracking-wider text-crimson transition-colors hover:bg-[#F5F5F5]"
            >
              Add to calendar
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <Link
              href="/apply"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/28 px-6 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
            >
              Apply after the session
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
