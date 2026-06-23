const DISTRACTION_FREE_LANDING_PATHS = new Set(["/event", "/event/confirmed"]);

export function isDistractionFreeLandingPath(pathname: string | null) {
  const normalizedPath = pathname?.replace(/\/$/, "") || "/";
  return DISTRACTION_FREE_LANDING_PATHS.has(normalizedPath);
}
