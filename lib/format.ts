import type { OpeningHours, ServiceItem } from "@/content/types";

/** Production builds on Vercel. Everything else (local, preview links) is a preview. */
export const isProduction = process.env.VERCEL_ENV === "production";

const PLACEHOLDER = /\[[^\]]+\]/;

/** True when the owner has filled in a real value (not null, empty or [BRACKETED]). */
export function isSet(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim() !== "" && !PLACEHOLDER.test(value);
}

/** True when a string is a usable absolute web address. */
export function isUrl(value: string | null | undefined): value is string {
  if (!isSet(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

const inr = new Intl.NumberFormat("en-IN");

/** "₹1,200", "from ₹1,200", or "₹[PRICE]" while the price is missing. */
export function formatPrice(item: Pick<ServiceItem, "price" | "priceFrom">): string {
  const amount = item.price === null ? "₹[PRICE]" : `₹${inr.format(item.price)}`;
  return item.priceFrom ? `from ${amount}` : amount;
}

export function formatMinutes(minutes: number | null): string {
  return minutes === null ? "[XX] min" : `${minutes} min`;
}

/** "21:00" → "9 pm", "10:30" → "10:30 am". */
export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${suffix}` : `${hour} ${suffix}`;
}

export function formatRange(h: OpeningHours): string {
  return h.open && h.close ? `${formatTime(h.open)} – ${formatTime(h.close)}` : "[Opening – closing time]";
}

const DAY_NAMES = { Mo: "Mon", Tu: "Tue", We: "Wed", Th: "Thu", Fr: "Fri", Sa: "Sat", Su: "Sun" } as const;

/** ["Mo","Tu","We"] → "Mon–Wed", ["Sa"] → "Sat". */
export function shortDays(h: OpeningHours): string {
  const first = DAY_NAMES[h.days[0]];
  const last = DAY_NAMES[h.days[h.days.length - 1]];
  return h.days.length > 1 ? `${first}–${last}` : first;
}

/** "Mon–Fri, 10 am – 9 pm" */
export function hoursLine(h: OpeningHours): string {
  return `${shortDays(h)}, ${formatRange(h)}`;
}
