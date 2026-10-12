import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { StylistCard } from "@/components/StylistCard";

export const metadata = pageMeta(
  "Meet the team",
  `Meet the stylists at ${site.name}, see what each one is best at, and book them by name on WhatsApp.`,
  "/team",
);

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="Meet the team"
        intro="Found someone you like? Book them by name — just mention them on WhatsApp."
      />
      <Section>
        <ul className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
          {site.team.map((s, i) => (
            <StylistCard key={`${s.name}-${i}`} stylist={s} />
          ))}
        </ul>
      </Section>
    </>
  );
}
