import type { ServiceItem } from "@/content/types";
import { formatMinutes, formatPrice } from "@/lib/format";
import { messages, whatsappUrl } from "@/lib/links";
import { Button } from "./Button";

/** "Popular services" card on the home page. */
export function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <li className="flex flex-col rounded-card border border-line-strong bg-surface p-6">
      <p className="eyebrow">{item.audience}</p>
      <h3 className="mt-2 text-[21px] font-bold leading-snug">{item.name}</h3>
      <p className="mt-1 text-[15px] text-muted">{formatMinutes(item.minutes)}</p>
      <p className="mb-6 mt-3 font-display text-[26px] font-bold">{formatPrice(item)}</p>
      <Button
        href={whatsappUrl(messages.service(item.name))}
        size={44}
        full
        className="mt-auto"
        track={["click_whatsapp", { location: "popular_service", service: item.name }]}
      >
        Book this<span className="sr-only">{`: ${item.name}`}</span>
      </Button>
    </li>
  );
}

/** Compact version used on phones, matching the "Home on a phone" mockup. */
export function ServiceListItem({ item }: { item: ServiceItem }) {
  return (
    <li className="flex items-center justify-between gap-4 border-b border-line py-4">
      <div>
        <h3 className="text-[17px] font-bold">{item.name}</h3>
        <p className="text-[14px] text-muted">
          {item.audience} · {formatMinutes(item.minutes)}
        </p>
      </div>
      <a
        href={whatsappUrl(messages.service(item.name))}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center font-display text-[20px] font-bold"
        data-track="click_whatsapp"
        data-track-location="popular_service"
        data-track-service={item.name}
      >
        {formatPrice(item)}
        <span className="sr-only">{`, book ${item.name} on WhatsApp`}</span>
      </a>
    </li>
  );
}
