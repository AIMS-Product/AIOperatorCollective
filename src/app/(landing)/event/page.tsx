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
    label: "Why attend",
    title: "Test the path",
    body: "Use the live examples to decide whether this kind of AI consulting work fits the way you think.",
  },
];

const outcomes = [
  "You are usually the person who figures out the spreadsheet, tool, system, or weird tech problem before everyone else.",
  "You pick up new software faster than most people around you.",
  "You can look at a messy process and start seeing the steps, gaps, and shortcuts.",
  "You are curious enough about AI to know it matters, even if you have not turned that curiosity into a serious business path yet.",
];

const diagnosisPoints = [
  "Why companies are already rethinking work, headcount, and leverage as AI moves into the workplace.",
  "Why a business owner may ask for more leads when the better first problem is the leak after the lead comes in.",
  "How an operator looks for the business problem underneath the first request before recommending a tool.",
  "Why the opportunity is not to sell AI, but to solve a problem a business can actually see and value.",
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
    role: "Multi-company CEO/operator, AIMS client, investor, and AIOC launch partner",
    body: "AIMS has worked inside Mike's businesses, including Vendingpreneurs, Modern Amenities, VendHub, and others, to install AI systems and solve real operating problems. He brings the operator side of the table: what feels useful, what feels risky, and what makes a solution worth changing the business around.",
    initials: "MH",
  },
];

const agenda = [
  {
    title: "Why this path, why now",
    time: "0-5 min",
    body: "We will start with the real reason this matters: more people want control and options, while AI is changing what companies value at work.",
  },
  {
    title: "Mike and AIMS",
    time: "5-12 min",
    body: "Mike brings the CEO/operator lens from businesses where AIMS has installed AI systems and solved real operating problems.",
  },
  {
    title: "Symptoms versus diagnosis",
    time: "12-22 min",
    body: "We will unpack why a business may ask for more leads, more automation, or some AI, when the higher-value first fix is hiding underneath the request.",
  },
  {
    title: "The operator lens",
    time: "22-34 min",
    body: "You will see what someone has to learn before they can confidently diagnose, scope, and explain AI-enabled work in business terms.",
  },
  {
    title: "The AIOC path",
    time: "34-42 min",
    body: "We will show where AI Operators Collective fits: the apprenticeship-style community where AIMS and operator partners teach this work.",
  },
  {
    title: "How to decide",
    time: "42-45 min",
    body: "If the path feels real after the examples, we will explain what happens next and how to apply for Cohort 1.",
  },
];

const faqs = [
  {
    q: "Is this a technical webinar?",
    a: "No. We will talk about real business problems first and AI second. You do not need to be an engineer, but you should be comfortable figuring out technology and curious enough to learn where AI fits.",
  },
  {
    q: "Do I need to be an AI expert?",
    a: "No. This is for people who are good at figuring out technology, not people who already have every AI tool mastered. The session is about whether this path fits the way you think.",
  },
  {
    q: "Will this guarantee clients or income?",
    a: "No. AIOC does not guarantee clients, income, placement, W2 replacement, or AIMS work. The goal is to build judgment, practice, proof, and a stronger ability to solve real problems.",
  },
  {
    q: "Is this about starting an AI agency?",
    a: "Not in the guru sense. It is about learning AI consulting work through real business problems: diagnosis, scoping, systems, and value a business can understand.",
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
              A business path for people who are already good at figuring out
              technology.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#4B5563] sm:text-xl">
              If you were looking for more control, flexibility, and a business
              you can build around your own abilities, this live session will
              help you test a different path: learning how to solve real
              business problems with AI.
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
                    A live operator view on how technology skill becomes useful
                    inside real business problems.
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
              Path fit
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
              This may fit the way your brain already works.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#4B5563]">
              This session is for the person who is not afraid of technology,
              picks up new tools faster than most people around them, and wants
              to know whether that ability can become a serious business path.
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

      <section className="border-y border-line bg-[#F7F7F5] px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-crimson">
              Why now
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
              AI is changing work whether people are ready or not.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#4B5563]">
              The job market is not getting more forgiving. Companies are
              already rethinking headcount, leverage, and what kind of work is
              worth paying for.
            </p>
            <p className="mt-4 max-w-lg text-base leading-7 text-[#4B5563]">
              The smart move is not to panic. It is to become the kind of person
              who can use technology to create value a business can actually
              see.
            </p>
          </div>

          <div className="grid grid-flow-dense grid-cols-1 gap-3 sm:grid-cols-2">
            {diagnosisPoints.map((item, index) => (
              <div
                key={item}
                className={[
                  "group rounded-md border border-line bg-white p-6 transition-all duration-300 hover:border-crimson/30 hover:shadow-[0_18px_50px_-36px_rgba(26,26,26,0.65)]",
                  index === 0 ? "sm:col-span-2" : "",
                  index === diagnosisPoints.length - 1 ? "sm:col-span-2" : "",
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
                Proof from the room
              </p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
                AIMS already does this work inside operator-led companies.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-white/68 lg:justify-self-end">
              Jess brings the AI and systems side. Mike brings the CEO side.
              Together, they will show why useful AI consulting starts with the
              business problem, not the tool demo.
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
              What we will cover live
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Business owners bring symptoms. Operators learn to find the
              diagnosis.
            </h2>
            <p className="mt-6 text-base leading-7 text-[#4B5563]">
              We will keep it tight: real examples, the operator lens, what
              AIMS had to understand before recommending anything, and what this
              means if you want to learn AI consulting work.
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
            If this feels like it might be your lane, start with the live
            session.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/78">
            Save your seat now. If the examples make the path feel real, we will
            explain AIOC Cohort 1 and the application process during the
            webinar.
          </p>
          <Link
            href="#register"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-sm font-bold uppercase tracking-wider text-crimson transition-colors hover:bg-[#F5F5F5]"
          >
            Save my seat
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
