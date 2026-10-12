import type { Stylist } from "@/content/types";
import { messages, whatsappUrl } from "@/lib/links";
import { Button } from "./Button";
import { Placeholder } from "./Placeholder";

export function StylistCard({ stylist }: { stylist: Stylist }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-card border border-line-strong bg-surface">
      <Placeholder
        width={400}
        height={300}
        label={stylist.photo ? `Portrait of ${stylist.name}` : "Photo: stylist portrait"}
        src={stylist.photo}
        rounded="rounded-none"
        className={stylist.photo ? "" : "border-x-0 border-t-0"}
        sizes="(min-width: 900px) 33vw, 100vw"
      />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[22px] font-bold leading-snug">{stylist.name}</h3>
        <p className="eyebrow mt-1">{stylist.role}</p>
        <p className="mt-3 text-[16px] text-muted">Best at: {stylist.bestAt}</p>
        <p className="text-[16px] text-muted">{stylist.years === null ? "[X]" : stylist.years} years experience</p>
        <Button
          href={whatsappUrl(messages.stylist(stylist.name))}
          variant="outline-brand"
          size={44}
          full
          className="mt-5"
          track={["click_whatsapp", { location: "stylist_card", stylist: stylist.name }]}
        >
          Book with this stylist<span className="sr-only">{`: ${stylist.name}`}</span>
        </Button>
      </div>
    </li>
  );
}
