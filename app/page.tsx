import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { isProduction, isSet, shortDays, formatRange } from "@/lib/format";
import { directionsUrl, instagramHandle, instagramUrl, messages, telUrl, whatsappUrl } from "@/lib/links";
import { trackProps } from "@/lib/analytics";
import { Button } from "@/components/Button";
import { Section, SectionHeader } from "@/components/Section";
import { Placeholder } from "@/components/Placeholder";
import { ServiceCard, ServiceListItem } from "@/components/ServiceCard";
import { ReviewCard } from "@/components/ReviewCard";
import { MapEmbed } from "@/components/MapEmbed";
import { OpenToday } from "@/components/OpenToday";

export default function HomePage() {
  const popular = site.services.flatMap((c) => c.items).filter((i) => i.popular).slice(0, 4);
  const reviews = site.reviews.slice(0, 3);
  const work = site.gallery.filter((g) => g.home).slice(0, 4);
  const { google } = site;
  const hasRating = google.rating !== null && google.reviewCount !== null;
  const showInstagram = isSet(site.contact.instagram) || !isProduction;

  return (
    <>
      {/* 1. Hero */}
      <section className="bg-surface-alt py-8 md:py-16">
        <div className="container-site grid items-center gap-8 md:gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Unisex salon · {site.area}</p>
            <h1 className="mt-4 font-display text-[36px] font-bold leading-[1.05] tracking-[-0.02em] md:text-[60px]">
              {site.tagline}
            </h1>
            <p className="mt-5 max-w-[520px] text-[17px] text-muted md:text-[19px]">
              Prices shown upfront. Pick your stylist. Book on WhatsApp in under a minute.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                href={whatsappUrl(messages.book)}
                variant="whatsapp"
                size={52}
                icon={<MessageCircle size={20} aria-hidden />}
                track={["click_whatsapp", { location: "home_hero" }]}
              >
                Book on WhatsApp
              </Button>
              <Button href="/services" variant="outline" size={52}>
                See prices
              </Button>
            </div>
            <p className="mt-6 text-[15px] text-muted">
              {(hasRating || !isProduction) && (
                <>
                  <strong className="text-ink">
                    {hasRating ? google.rating!.toFixed(1) : "[4.X]"} ★ on Google
                  </strong>{" "}
                  · from {hasRating ? google.reviewCount : "[N]"} reviews ·{" "}
                </>
              )}
              <OpenToday hours={site.hours} />
            </p>
          </div>
          <Placeholder width={600} height={520} label={site.images.hero.alt} src={site.images.hero.src} priority className="max-h-[420px] lg:max-h-none" />
        </div>
      </section>

      {/* 2. Popular services */}
      <Section labelledBy="popular-heading">
        <SectionHeader
          id="popular-heading"
          title="Popular services"
          action={
            <Link href="/services" className="link-arrow hidden md:inline">
              Full price list →
            </Link>
          }
        />
        <ul className="hidden gap-5 md:grid md:[grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {popular.map((item) => (
            <ServiceCard key={`${item.audience}-${item.name}`} item={item} />
          ))}
        </ul>
        <ul className="md:hidden">
          {popular.map((item) => (
            <ServiceListItem key={`${item.audience}-${item.name}`} item={item} />
          ))}
        </ul>
        <Button href="/services" variant="outline" size={48} full className="mt-5 md:hidden">
          Full price list
        </Button>
      </Section>

      {/* 3. Why us */}
      <Section tone="brand">
        <ul className="grid gap-6 md:grid-cols-3 md:gap-8">
          {[
            { title: "Prices upfront", body: "Every service has a listed price or range. No surprises at the counter." },
            { title: "Choose your stylist", body: "See who does what, and book the person you trust." },
            { title: site.hygienePromise.title, body: site.hygienePromise.body },
          ].map((point) => (
            <li key={point.title}>
              <h2 className="text-[20px] font-bold md:text-[22px]">{point.title}</h2>
              <p className="mt-2 text-[16px] text-on-brand-muted">{point.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. What customers say — only with real reviews */}
      {reviews.length > 0 && (
        <Section labelledBy="reviews-heading">
          <SectionHeader
            id="reviews-heading"
            title="What customers say"
            action={
              <Link href="/reviews" className="link-arrow">
                All reviews →
              </Link>
            }
          />
          <ul className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            {reviews.map((r, i) => (
              <ReviewCard key={i} review={r} tone="alt" />
            ))}
          </ul>
        </Section>
      )}

      {/* 5. Our work */}
      <Section tone="alt" labelledBy="work-heading">
        <SectionHeader
          id="work-heading"
          title="Our work"
          action={
            <Link href="/gallery" className="link-arrow">
              See the gallery →
            </Link>
          }
        />
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {work.map((g) => (
            <li key={g.alt}>
              <Placeholder width={300} height={300} label={g.alt} src={g.src} sizes="(min-width: 768px) 25vw, 50vw" />
            </li>
          ))}
        </ul>
        {showInstagram && (
          <p className="mt-6 text-[16px]">
            More on Instagram:{" "}
            <a
              href={instagramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow"
              {...trackProps("click_instagram", { location: "home_work" })}
            >
              {instagramHandle()}
            </a>
          </p>
        )}
      </Section>

      {/* 6. Visit us */}
      <Section labelledBy="visit-heading">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          <div>
            <h2 id="visit-heading" className="font-display text-[26px] font-bold md:text-[40px]">
              Visit us
            </h2>
            <address className="mt-5 text-[17px] not-italic">
              {site.address.street}
              <br />
              Near {site.address.landmark}
            </address>
            <p className="mt-4 text-[17px]">
              <strong>Hours:</strong> {site.hours.map((h) => `${shortDays(h)} ${formatRange(h)}`).join(" · ")}
              <br />
              <strong>Parking:</strong> {site.address.parking}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                href={whatsappUrl(messages.book)}
                variant="whatsapp"
                track={["click_whatsapp", { location: "home_visit" }]}
              >
                WhatsApp
              </Button>
              <Button href={telUrl()} variant="outline" track={["click_call", { location: "home_visit" }]}>
                Call
              </Button>
              <Button
                href={directionsUrl()}
                variant="outline"
                external
                track={["click_directions", { location: "home_visit" }]}
              >
                Get directions
              </Button>
            </div>
          </div>
          <MapEmbed />
        </div>
      </Section>
    </>
  );
}
