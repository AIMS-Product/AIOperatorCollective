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
import { AIOC_WEBINAR_EVENT } from "@/lib/marketing/webinar-event";

const eventDetails = [
  {
    icon: CalendarDays,
    label: "Date",
    title: AIOC_WEBINAR_EVENT.dateLabel,
    body: "Block the date now. We will send the access link by email.",
  },
  {
    icon: Clock3,
    label: "Time",
    title: AIOC_WEBINAR_EVENT.timeLabel,
    body: "Join live at the scheduled time. Replay details will go to registrants.",
  },
  {
    icon: Radio,
    label: "Format",
    title: AIOC_WEBINAR_EVENT.locationLabel,
    body: "Live Jess + Mike conversation, with replay details sent to registrants.",
  },
];

const ceoProblemExamples = [
  "The business keeps moving because the owner keeps remembering what everyone else forgot.",
  "A decision gets made in the room, then dies slowly across tools, threads, and memory.",
  "Everyone is busy, but nobody can tell which work is actually moving the company forward.",
  "One person knows how the process really works. If they leave, the company loses the map.",
  "The customer gets a different answer depending on who picks up the thread.",
  "Another hire starts to look necessary because the process has no more slack.",
];

const mikeContextPoints = [
  {
    title: "Mike is not evaluating this from the sidelines.",
    body: "He knows what it feels like when a tool creates more decisions, not fewer. The conversation starts with owner questions: where is the business capped, who has to trust the fix, and what changes if it works?",
  },
  {
    title: "The business had to be understood first.",
    body: "We will talk about what AIMS had to see before recommending anything: where memory, follow-through, capacity, or trust was breaking down, and what would have been noise.",
  },
  {
    title: "The lesson is not Mike's exact playbook.",
    body: "The point is to hear how a vague AI conversation becomes a business constraint clear enough to solve.",
  },
];

const listenForPrompts = [
  "What is the business wasting: time, money, attention, or capacity?",
  "What would make the ROI clear enough for an owner to trust?",
  "What scope creates a win for the owner and a sane project for the operator?",
];

const nextSteps = [
  "Watch for the confirmation email.",
  "Add the date to your calendar.",
  "Listen for the opportunity: waste, ROI, scope, and trust.",
];

const callFocusItems = [
  "What got hard to see",
  "What depended on memory",
  "What had to earn trust",
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
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8 lg:py-24">
          <div className="relative z-10 max-w-4xl animate-fade-up">
            <div className="inline-flex items-center gap-2 border-l-2 border-crimson bg-white px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-crimson shadow-[0_16px_50px_-44px_rgba(26,26,26,0.7)]">
              <CheckCircle2 className="h-4 w-4" aria-hidden />
              Registered
            </div>
            <h1 className="mt-6 max-w-4xl font-serif text-[clamp(3.2rem,6vw,6.3rem)] leading-[0.94] text-ink">
              You&apos;re in.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#4B5563] sm:text-xl">
              We will send the join link and reminders to your inbox. On the
              call, Jess and Mike will walk through what AIMS did inside
              Mike&apos;s business: what was getting hard to see, what depended
              too much on memory, and why the CEO lens changes the whole AI
              conversation.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#5F6671]">
              The point is not the tool stack. It is what had to become clear
              before AI was worth trusting.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#calendar"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-crimson px-6 text-sm font-bold uppercase tracking-wider text-white shadow-[0_12px_32px_-18px_rgba(152,27,27,0.9)] transition-colors hover:bg-crimson-dark"
              >
                Calendar details
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#lens"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-line bg-white px-6 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:border-crimson/30 hover:text-crimson"
              >
                What to listen for
              </a>
            </div>

            <div className="mt-10 max-w-3xl border-y border-line py-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-crimson">
                On the call, watch for
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {callFocusItems.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-crimson"
                      aria-hidden
                    />
                    <p className="text-sm font-medium leading-6 text-[#3B414A]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="relative z-10 lg:pt-7">
            <div className="overflow-hidden rounded-md border border-line bg-white shadow-[0_26px_80px_-52px_rgba(26,26,26,0.72)]">
              <div className="bg-ink p-6 text-white">
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
                <h2 className="mt-3 font-serif text-3xl leading-tight text-white">
                  Mike Hoffmann brings the CEO lens.
                </h2>
                <p className="mt-4 text-sm leading-6 text-white/70">
                  He has built across vending, Vendingpreneur, and other
                  operator-led businesses. That means we can talk about AI from
                  the side that actually has to decide whether a solution is
                  worth changing behavior around.
                </p>
              </div>
              <div className="grid grid-flow-dense grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:grid-cols-1 lg:divide-x-0 lg:divide-y">
                {mikeContextPoints.map((point) => {
                  return (
                    <div key={point.title} className="p-5">
                      <h3 className="text-base font-semibold leading-6 text-ink">
                        {point.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#5F6671]">
                        {point.body}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-line p-6">
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-crimson" />
                  <div>
                    <h3 className="text-base font-semibold text-ink">
                      Check your inbox.
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#4B5563]">
                      The confirmation email carries the event logistics and
                      reminder details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div
            id="calendar"
            className="relative z-10 grid scroll-mt-24 grid-flow-dense grid-cols-1 border-y border-line md:grid-cols-3 lg:col-span-2"
          >
            {eventDetails.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
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

      <section id="prepare" className="px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-crimson">
              What CEOs actually feel
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
              The business is running on memory, meetings, and heroic
              follow-through.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#4B5563]">
              CEOs do not wake up worried about automations. They wake up
              because the team is busy, the truth is still trapped in
              people&apos;s heads, and every fix seems to require another
              meeting, another tool, or another hire.
            </p>
            <p className="mt-4 max-w-lg text-base leading-7 text-[#4B5563]">
              That is the layer AIMS looks for first.
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
              The CEO lens
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
              Learn to see the business opportunity inside the waste.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/68">
              Most owners are not buying the technical explanation. They know
              something is wasting time, money, or people, and they need a
              solution they can trust. The opportunity is learning to identify
              the real business problem, make the ROI visible, scope the fix,
              and create a win on both sides.
            </p>
          </div>

          <div className="rounded-md border border-white/12 bg-white/[0.04] p-7">
            <ListChecks className="h-6 w-6 text-crimson-light" aria-hidden />
            <h3 className="mt-5 font-serif text-3xl leading-tight text-white">
              What to listen for.
            </h3>
            <p className="mt-4 text-base leading-7 text-white/70">
              As Mike talks through his business, listen for how the problem
              turns into an opportunity: diagnose the waste, estimate the upside,
              then shape a solution the owner can actually say yes to.
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
              Show up knowing what to listen for. Leave with a sharper operator
              lens.
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
            If this is the kind of work you want to practice, apply for Cohort
            1.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/78">
            No payment to apply. We use the application and Fit Call to decide
            together whether AIOC is the right room. No guaranteed clients,
            income, placement, W2 replacement, or AIMS work.
          </p>
          <Link
            href="/apply"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-sm font-bold uppercase tracking-wider text-crimson transition-colors hover:bg-[#F5F5F5]"
          >
            Apply for Cohort 1
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
