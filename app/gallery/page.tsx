import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { instagramHandle, instagramUrl, messages, whatsappUrl } from "@/lib/links";
import { isProduction, isSet } from "@/lib/format";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Button } from "@/components/Button";

export const metadata = pageMeta(
  "Gallery",
  `Real haircuts, colour and styling by the team at ${site.name}. No stock photos.`,
  "/gallery",
);

export default function GalleryPage() {
  const showInstagram = isSet(site.contact.instagram) || !isProduction;
  return (
    <>
      <GalleryGrid items={site.gallery} title="Our work" intro="Real clients, real results. No stock photos." />
      <div className="container-site py-10 md:py-16">
        <div className="flex flex-col items-start justify-between gap-5 rounded-card bg-brand p-6 text-white md:flex-row md:items-center md:px-8">
          <div>
            <h2 className="font-display text-[26px] font-bold md:text-[28px]">Like what you see?</h2>
            {showInstagram && (
              <p className="mt-1 text-on-brand-muted">See new work every week on Instagram {instagramHandle()}.</p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {showInstagram && (
              <Button
                href={instagramUrl()}
                variant="outline-on-brand"
                track={["click_instagram", { location: "gallery_panel" }]}
              >
                Follow on Instagram
              </Button>
            )}
            <Button
              href={whatsappUrl(messages.look)}
              variant="on-brand"
              track={["click_whatsapp", { location: "gallery_panel" }]}
            >
              Book this look
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
