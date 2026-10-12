import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Privacy policy",
  `How ${site.name} collects, uses and protects your personal information.`,
  "/privacy",
);

export default function PrivacyPage() {
  const { privacy } = site;
  return (
    <div className="container-site py-10 md:py-16">
      <article className="mx-auto max-w-[760px]">
        <h1 className="font-display text-[36px] font-bold leading-[1.1] md:text-[52px]">Privacy policy</h1>
        <p className="mt-3 text-muted">Last updated: {privacy.lastUpdated}</p>
        {!privacy.reviewed && (
          <p role="note" className="mt-6 rounded-card border-2 border-dashed border-placeholder-border bg-placeholder-bg p-4 text-[15px]">
            Draft — this policy has not been reviewed yet. The live site will not publish until it has been.
          </p>
        )}
        {privacy.sections.map((s) => (
          <section key={s.heading} className="mt-8">
            <h2 className="text-[22px] font-bold">{s.heading}</h2>
            <p className="mt-2 text-muted">{s.body}</p>
          </section>
        ))}
      </article>
    </div>
  );
}
