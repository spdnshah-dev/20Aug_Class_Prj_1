import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { messages, telUrl, whatsappUrl } from "@/lib/links";
import { trackProps } from "@/lib/analytics";

/** Phone-only bar fixed to the bottom of every page. */
export function MobileActionBar() {
  const base = "inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-btn text-base font-bold";
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface px-3 pt-2 nav:hidden"
      style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}
    >
      <div className="flex gap-2">
        <a href={telUrl()} className={`${base} border-2 border-ink`} {...trackProps("click_call", { location: "action_bar" })}>
          <Phone size={18} aria-hidden />
          Call
        </a>
        <a
          href={whatsappUrl(messages.book)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} bg-whatsapp text-white`}
          {...trackProps("click_whatsapp", { location: "action_bar" })}
        >
          <MessageCircle size={18} aria-hidden />
          WhatsApp
        </a>
        <Link href="/book" className={`${base} bg-brand text-white`}>
          Book
        </Link>
      </div>
    </div>
  );
}
