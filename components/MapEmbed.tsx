import { MapPin } from "lucide-react";
import { site } from "@/content/site";
import { isProduction, isUrl } from "@/lib/format";
import { directionsUrl } from "@/lib/links";
import { trackProps } from "@/lib/analytics";

/**
 * Google Map. Computers get the live map; phones get a tap-to-open box instead,
 * so pages stay fast. Hidden on the live site if no map link has been added.
 */
export function MapEmbed({ label = "Google Map of your salon (embedded)" }: { label?: string }) {
  const embed = site.address.mapsEmbedUrl;
  const hasEmbed = isUrl(embed);
  const hasLink = isUrl(site.address.mapsUrl);
  if (!hasEmbed && !hasLink && isProduction) return null;

  const box =
    "flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed border-placeholder-border bg-placeholder-bg p-4 text-center font-semibold text-muted md:aspect-[16/9.2]";

  return (
    <div>
      {hasEmbed ? (
        <iframe
          src={embed}
          title={`Map showing ${site.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="hidden aspect-[16/9.2] w-full rounded-card border border-line nav:block"
        />
      ) : (
        <div className={`${box} hidden nav:flex`}>{label}</div>
      )}
      <a
        href={hasLink ? directionsUrl() : undefined}
        target="_blank"
        rel="noopener noreferrer"
        className={`${box} nav:hidden`}
        {...trackProps("click_directions", { location: "map" })}
      >
        <MapPin size={28} aria-hidden />
        <span>Map — tap to open in Google Maps</span>
      </a>
    </div>
  );
}
