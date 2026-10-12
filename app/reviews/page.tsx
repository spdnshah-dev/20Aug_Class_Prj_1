import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { isProduction, isUrl } from "@/lib/format";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/Button";

export const metadata = pageMeta(
  "Reviews",
  `What customers say about ${site.name}, copied straight from Google.`,
  "/reviews",
);

export default function ReviewsPage() {
  const { google, reviews } = site;
  const hasRating = google.rating !== null && google.reviewCount !== null;
  const showBox = hasRating || !isProduction || isUrl(google.reviewsUrl);

  const ratingBox = showBox && (
    <div className="flex flex-col gap-5 rounded-card bg-surface p-7 sm:flex-row sm:items-center sm:gap-8">
      {(hasRating || !isProduction) && (
        <div>
          <p className="font-display text-[52px] font-bold leading-none">{hasRating ? google.rating!.toFixed(1) : "[4.X]"}</p>
          <p className="mt-1 text-muted">from {hasRating ? google.reviewCount : "[N]"} Google reviews</p>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Button href={google.reviewsUrl} size={44} external>
          Read all on Google
        </Button>
        <Button
          href={google.writeReviewUrl}
          variant="outline-brand"
          size={44}
          external
          track={["click_review_write", { location: "reviews_hero" }]}
        >
          Leave a review
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <PageHero title="Reviews" intro="Pulled straight from Google, unedited." aside={ratingBox} />
      <Section>
        {reviews.length > 0 ? (
          <ul className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
            {reviews.map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </ul>
        ) : (
          <div className="rounded-card border border-line-strong p-7 text-center">
            <p className="text-[17px]">Been to see us? We&apos;d love to hear how it went.</p>
            <Button
              href={google.writeReviewUrl}
              variant="outline-brand"
              className="mt-4"
              external
              track={["click_review_write", { location: "reviews_empty" }]}
            >
              Leave a review on Google
            </Button>
          </div>
        )}
      </Section>
    </>
  );
}
