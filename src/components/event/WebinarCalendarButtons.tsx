import {
  CalendarDays,
  Download,
  Mail,
  Monitor,
  type LucideIcon,
} from "lucide-react";
import { webinarCalendarLinks } from "@/lib/marketing/webinar-event";

const iconByLinkId: Record<string, LucideIcon> = {
  google: CalendarDays,
  outlook: Mail,
  office: Monitor,
  apple: Download,
};

type WebinarCalendarButtonsProps = {
  tone?: "light" | "dark";
};

export function WebinarCalendarButtons({
  tone = "light",
}: WebinarCalendarButtonsProps) {
  const links = webinarCalendarLinks();
  const isDark = tone === "dark";

  return (
    <div className="grid grid-flow-dense grid-cols-1 gap-3 sm:grid-cols-2">
      {links.map((link) => {
        const Icon = iconByLinkId[link.id] ?? CalendarDays;

        return (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={[
              "group flex min-h-20 items-center gap-3 rounded-md border p-4 transition-all duration-300",
              isDark
                ? "border-white/12 bg-white/[0.06] text-white hover:border-crimson-light/50 hover:bg-white/[0.1]"
                : "border-line bg-white text-ink hover:border-crimson/30 hover:shadow-[0_16px_42px_-34px_rgba(26,26,26,0.65)]",
            ].join(" ")}
            aria-label={`Add ${link.label} event to calendar`}
          >
            <span
              className={[
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-transform duration-300 group-hover:scale-105",
                isDark ? "bg-crimson text-white" : "bg-crimson/10 text-crimson",
              ].join(" ")}
            >
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold">{link.label}</span>
              <span
                className={[
                  "mt-1 block text-xs leading-5",
                  isDark ? "text-white/62" : "text-[#5F6671]",
                ].join(" ")}
              >
                {link.helper}
              </span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
