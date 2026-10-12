import type { ServiceItem } from "@/content/types";
import { formatMinutes, formatPrice } from "@/lib/format";
import { messages, whatsappUrl } from "@/lib/links";
import { Button } from "./Button";

/** One line of the price list. Stacks into two lines on phones. */
export function ServiceRow({ item }: { item: ServiceItem }) {
  return (
    <li className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-b border-line py-5 md:grid-cols-[1fr_110px_150px_auto] md:gap-x-6">
      <div className="col-span-2 md:col-span-1">
        <h3 className="text-[19px] font-bold leading-snug">{item.name}</h3>
        <p className="text-[15px] text-muted">{item.desc}</p>
      </div>
      <p className="col-start-1 row-start-2 text-[15px] text-muted md:col-auto md:row-auto">
        <span className="font-display text-[20px] font-bold text-ink md:hidden">{formatPrice(item)}</span>
        <span className="md:hidden"> · </span>
        {formatMinutes(item.minutes)}
      </p>
      <p className="hidden font-display text-[20px] font-bold md:block">{formatPrice(item)}</p>
      <Button
        href={whatsappUrl(messages.service(item.name))}
        size={44}
        className="col-start-2 row-start-2 justify-self-end md:col-auto md:row-auto"
        track={["click_whatsapp", { location: "service_row", service: item.name }]}
      >
        <span className="sr-only">{`${item.name}: `}</span>Book
      </Button>
    </li>
  );
}
