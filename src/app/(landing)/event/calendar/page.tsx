import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3 } from "lucide-react";
import { WebinarCalendarButtons } from "@/components/event/WebinarCalendarButtons";
import { AIOC_WEBINAR_EVENT } from "@/lib/marketing/webinar-event";

export const metadata: Metadata = {
  title: `Add to calendar | ${AIOC_WEBINAR_EVENT.title}`,
  description: "Choose a calendar for the AI Operators Collective webinar.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EventCalendarPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-[#F7F7F5] text-ink">
      <section className="relative min-h-screen overflow-hidden px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-px bg-crimson/30" />
        <div className="absolute right-[-18rem] top-[-18rem] h-[34rem] w-[34rem] rounded-full bg-crimson/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <Link
            href={AIOC_WEBINAR_EVENT.confirmationPath}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4B5563] transition-colors hover:text-crimson"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to confirmation
          </Link>

          <div className="mt-10 rounded-md border border-line bg-white p-6 shadow-[0_26px_80px_-52px_rgba(26,26,26,0.72)] sm:p-8">
            <div className="inline-flex items-center gap-2 border-l-2 border-crimson bg-[#F7F7F5] px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-crimson">
              <CalendarDays className="h-4 w-4" aria-hidden />
              Calendar
            </div>

            <h1 className="mt-6 max-w-3xl font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[0.96] text-ink">
              Add the webinar to your calendar.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#4B5563] sm:text-lg">
              Choose the calendar you actually use. Demio will email your
              private join link separately, so the event stays on your schedule
              even if the access email gets buried.
            </p>

            <div className="mt-8">
              <WebinarCalendarButtons />
            </div>

            <div className="mt-8 grid grid-flow-dense grid-cols-1 border-y border-line sm:grid-cols-2">
              <div className="border-line py-5 sm:border-r sm:pr-6">
                <div className="flex items-center gap-2 text-crimson">
                  <CalendarDays className="h-4 w-4" aria-hidden />
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">
                    Date
                  </p>
                </div>
                <h2 className="mt-3 text-base font-semibold text-ink">
                  {AIOC_WEBINAR_EVENT.dateLabel}
                </h2>
              </div>
              <div className="py-5 sm:pl-6">
                <div className="flex items-center gap-2 text-crimson">
                  <Clock3 className="h-4 w-4" aria-hidden />
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">
                    Time
                  </p>
                </div>
                <h2 className="mt-3 text-base font-semibold text-ink">
                  {AIOC_WEBINAR_EVENT.timeLabel}
                </h2>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3">
              <CheckCircle2
                className="mt-1 h-5 w-5 shrink-0 text-crimson"
                aria-hidden
              />
              <p className="text-sm leading-6 text-[#5F6671]">
                The calendar note points back to the confirmation page and
                reminds you what to listen for: the first request, the real
                diagnosis, and the first useful fix.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
