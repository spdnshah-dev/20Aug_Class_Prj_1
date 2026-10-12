import { ChevronRight } from "lucide-react";
import type { FaqGroup, FaqItem } from "@/content/types";
import { isProduction } from "@/lib/format";

const groups: FaqGroup[] = ["Booking", "Services & prices", "Visiting"];

/**
 * Questions grouped under headings, using native open/close elements.
 * Unanswered questions are hidden on the live site and marked in previews.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  const visible = items.filter((i) => i.a !== null || !isProduction);
  return (
    <div className="faq flex flex-col gap-10">
      {groups.map((group) => {
        const list = visible.filter((i) => i.group === group);
        if (list.length === 0) return null;
        return (
          <section key={group} aria-labelledby={`faq-${group}`}>
            <h2 id={`faq-${group}`} className="font-display text-[26px] font-bold md:text-[28px]">
              {group}
            </h2>
            <div className="mt-3">
              {list.map((item) => (
                <details key={item.q} className="group border-b border-line">
                  <summary className="flex min-h-14 cursor-pointer items-center gap-2 py-3 text-[17px] font-semibold">
                    <ChevronRight
                      size={18}
                      aria-hidden
                      className="shrink-0 transition-transform group-open:rotate-90"
                    />
                    {item.q}
                  </summary>
                  <p className="pb-5 pl-[26px] text-muted">{item.a ?? "[Answer — this question is hidden on the live site until you add one.]"}</p>
                </details>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
