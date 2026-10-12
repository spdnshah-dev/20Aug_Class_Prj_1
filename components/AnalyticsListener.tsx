"use client";

import { useEffect } from "react";
import { track, type TrackEvent } from "@/lib/analytics";

/** Sends a GA4 event for any click on an element marked with `trackProps(...)`. */
export function AnalyticsListener() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const { track: name, trackLocation, trackService, trackStylist } = el.dataset;
      track(name as TrackEvent, {
        location: trackLocation ?? "unknown",
        ...(trackService ? { service: trackService } : {}),
        ...(trackStylist ? { stylist: trackStylist } : {}),
      });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
