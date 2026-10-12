import { MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { messages, whatsappUrl } from "@/lib/links";
import { PageHero } from "@/components/PageHero";
import { ServiceRow } from "@/components/ServiceRow";
import { Button } from "@/components/Button";

export const metadata = pageMeta(
  "Services & prices",
  `Full price list for haircuts, colour, facials, nails and grooming at ${site.name}. Book any service on WhatsApp.`,
  "/services",
);

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Services & prices" intro={`Every price is listed. ${site.priceNote}`}>
        <nav aria-label="Service categories" className="mt-7">
          <ul className="flex flex-wrap gap-2">
            {site.services.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-line-strong bg-surface px-5 text-[15px] font-medium hover:border-ink"
                >
                  {c.category}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="container-site py-8 md:py-16">
        {site.services.map((c) => (
          <section key={c.id} id={c.id} aria-labelledby={`${c.id}-heading`} className="mb-12 last:mb-0">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-3">
              <h2 id={`${c.id}-heading`} className="font-display text-[26px] font-bold md:text-[32px]">
                {c.category}
              </h2>
              {c.note && <p className="text-[15px] text-muted">{c.note}</p>}
            </div>
            <ul>
              {c.items.map((item) => (
                <ServiceRow key={item.name} item={item} />
              ))}
            </ul>
          </section>
        ))}

        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-card bg-surface-alt p-6 md:flex-row md:items-center md:p-8">
          <div>
            <h2 className="font-display text-[26px] font-bold md:text-[28px]">Not sure what you need?</h2>
            <p className="mt-1 text-muted">
              Send a photo on WhatsApp and we&apos;ll suggest a service and price before you come in.
            </p>
          </div>
          <Button
            href={whatsappUrl(messages.askWithPhoto)}
            variant="whatsapp"
            size={52}
            icon={<MessageCircle size={20} aria-hidden />}
            track={["click_whatsapp", { location: "services_help" }]}
          >
            Ask on WhatsApp
          </Button>
        </div>
      </div>
    </>
  );
}
