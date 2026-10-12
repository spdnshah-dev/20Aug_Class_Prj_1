import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { Placeholder } from "@/components/Placeholder";
import { Section, SectionHeader } from "@/components/Section";
import { Button } from "@/components/Button";

export const metadata = pageMeta(
  "About us",
  `The story behind ${site.name}, how we keep things clean, and the products we use.`,
  "/about",
);

export default function AboutPage() {
  const { about, images } = site;
  const cards = [
    { title: "Hygiene", body: about.hygiene },
    { title: "Products we use", body: site.products },
    ...(about.training ? [{ title: "Training", body: about.training }] : []),
  ];

  return (
    <>
      <Section>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="font-display text-[36px] font-bold leading-[1.1] md:text-[52px]">About {site.name}</h1>
            {about.story.map((p) => (
              <p key={p} className="mt-5 text-[17px] text-muted md:text-[19px]">
                {p}
              </p>
            ))}
          </div>
          <Placeholder width={600} height={445} label={images.aboutTeam.alt} src={images.aboutTeam.src} priority />
        </div>
      </Section>

      <Section tone="alt" labelledBy="how-heading">
        <SectionHeader id="how-heading" title="How we work" size="inner" />
        <ul className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {cards.map((c) => (
            <li key={c.title} className="rounded-card bg-surface p-7">
              <h3 className="text-[21px] font-bold">{c.title}</h3>
              <p className="mt-2 text-muted">{c.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="sr-only">Inside the salon</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {[images.shopfront, images.stylingArea, images.washArea].map((img) => (
            <li key={img.alt}>
              <Placeholder width={400} height={262} label={img.alt} src={img.src} sizes="(min-width: 768px) 33vw, 100vw" />
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/team" variant="outline">
            Meet the team
          </Button>
          <Button href="/book">Book a visit</Button>
        </div>
      </Section>
    </>
  );
}
