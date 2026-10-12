import { MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { messages, whatsappUrl } from "@/lib/links";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { FaqList } from "@/components/FaqList";
import { Button } from "@/components/Button";

export const metadata = pageMeta(
  "FAQ & policies",
  `Answers about booking, prices and visiting ${site.name}, plus our cancellation and late-arrival policy.`,
  "/faq",
);

export default function FaqPage() {
  const { policies } = site;
  return (
    <>
      <PageHero title="FAQ & policies" intro="Quick answers before you visit. Still unsure? Ask us on WhatsApp." />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_411px] lg:gap-12">
          <FaqList items={site.faq} />
          <aside className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start" aria-labelledby="policy-heading">
            <div className="rounded-card bg-brand p-7 text-white">
              <h2 id="policy-heading" className="text-[22px] font-bold">
                Our booking policy in short
              </h2>
              <dl className="mt-4 space-y-1 text-[16px] text-on-brand-muted">
                {[
                  ["Cancel or move", policies.cancel],
                  ["Running late", policies.late],
                  ["Advance payment", policies.advance],
                ].map(([term, value]) => (
                  <div key={term}>
                    <dt className="inline font-bold text-white">{term}: </dt>
                    <dd className="inline">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Button
              href={whatsappUrl(messages.question)}
              variant="whatsapp"
              size={52}
              full
              icon={<MessageCircle size={20} aria-hidden />}
              track={["click_whatsapp", { location: "faq_aside" }]}
            >
              Ask on WhatsApp
            </Button>
          </aside>
        </div>
      </Section>
    </>
  );
}
