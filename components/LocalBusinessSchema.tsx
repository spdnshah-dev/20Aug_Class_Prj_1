import { site } from "@/content/site";
import { isSet, isUrl } from "@/lib/format";
import { instagramUrl } from "@/lib/links";
import { siteUrl } from "@/lib/url";

/**
 * Machine-readable salon details (schema.org "HairSalon") so Google can match
 * the website to the Google Business Profile. Everything comes from site.ts.
 */
export function LocalBusinessSchema() {
  const url = siteUrl();
  const { address, google, contact } = site;
  const sameAs = [isSet(contact.instagram) ? instagramUrl() : null, isUrl(google.reviewsUrl) ? google.reviewsUrl : null].filter(
    Boolean,
  );

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${url}/#salon`,
    name: site.name,
    url,
    image: `${url}/opengraph-image`,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: "IN",
    },
    openingHoursSpecification: site.hours
      .filter((h) => h.open && h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days.map((d) => DAYS[d]),
        opens: h.open,
        closes: h.close,
      })),
  };
  if (address.geo.lat !== null && address.geo.lng !== null) {
    data.geo = { "@type": "GeoCoordinates", latitude: address.geo.lat, longitude: address.geo.lng };
  }
  if (isUrl(address.mapsUrl)) data.hasMap = address.mapsUrl;
  if (sameAs.length) data.sameAs = sameAs;
  if (contact.email) data.email = contact.email;
  // Only once real numbers from Google are filled in.
  if (google.rating !== null && google.reviewCount !== null) {
    data.aggregateRating = { "@type": "AggregateRating", ratingValue: google.rating, reviewCount: google.reviewCount };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const DAYS = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
} as const;
