// Click tracking for Google Analytics 4.
//
// Any link or button can be tracked by spreading `trackProps(...)` onto it.
// One small listener (components/AnalyticsListener.tsx) picks up the click and
// calls `track`, so pages themselves stay fully static.

export type TrackEvent =
  | "click_whatsapp"
  | "click_call"
  | "click_book_online"
  | "click_directions"
  | "click_instagram"
  | "click_review_write";

export type TrackParams = {
  /** Where on the site the button is, e.g. "home_hero", "service_row", "action_bar". */
  location: string;
  service?: string;
  stylist?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(name: TrackEvent, params: TrackParams): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/** Data attributes read by AnalyticsListener. */
export function trackProps(name: TrackEvent, params: TrackParams) {
  return {
    "data-track": name,
    "data-track-location": params.location,
    ...(params.service ? { "data-track-service": params.service } : {}),
    ...(params.stylist ? { "data-track-stylist": params.stylist } : {}),
  };
}
