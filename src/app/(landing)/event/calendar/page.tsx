import { redirect } from "next/navigation";
import { webinarCalendarUrl } from "@/lib/marketing/webinar-event";

export default function EventCalendarRedirectPage() {
  redirect(webinarCalendarUrl());
}
