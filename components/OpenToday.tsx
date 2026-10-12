"use client";

import { useSyncExternalStore } from "react";
import type { OpeningHours } from "@/content/types";
import { formatTime } from "@/lib/format";

type DayCode = OpeningHours["days"][number];
const subscribe = () => () => {};

/** Today's weekday in India, worked out in the visitor's browser. */
function todayInIndia(): DayCode {
  const day = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "Asia/Kolkata" }).format(new Date());
  return day.slice(0, 2) as DayCode;
}

/**
 * "Open today till 9 pm". Pages are built ahead of time, so the day is checked
 * in the browser; until then (and if hours are missing) a neutral text shows.
 */
export function OpenToday({ hours }: { hours: OpeningHours[] }) {
  const today = useSyncExternalStore(subscribe, todayInIndia, () => null);
  const allSet = hours.every((h) => h.open && h.close);
  if (!allSet) return <>Open today till [TIME]</>;
  if (!today) return null;
  const match = hours.find((h) => h.days.includes(today));
  if (!match?.close) return <>Closed today</>;
  return <>Open today till {formatTime(match.close)}</>;
}
