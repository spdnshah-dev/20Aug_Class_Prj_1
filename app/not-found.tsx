import type { Metadata } from "next";
import { site } from "@/content/site";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: `Page not found | ${site.name}`,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="bg-surface-alt py-16 md:py-24">
      <div className="container-site max-w-[720px]">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 font-display text-[36px] font-bold leading-[1.1] md:text-[52px]">
          We can&apos;t find that page
        </h1>
        <p className="mt-4 text-[17px] text-muted md:text-[19px]">
          It may have moved. Try one of these instead.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Home</Button>
          <Button href="/services" variant="outline">
            Services &amp; prices
          </Button>
          <Button href="/book" variant="outline">
            Book
          </Button>
        </div>
      </div>
    </section>
  );
}
