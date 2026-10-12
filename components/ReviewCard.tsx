import type { Review } from "@/content/types";
import { Stars } from "./Stars";

type Props = { review: Review; tone?: "alt" | "outline" };

export function ReviewCard({ review, tone = "outline" }: Props) {
  return (
    <li
      className={`flex flex-col rounded-card p-7 ${
        tone === "alt" ? "bg-surface-alt" : "border border-line-strong bg-surface"
      }`}
    >
      <figure>
        <div className="flex items-center justify-between gap-4">
          <Stars count={review.stars} />
          {tone === "outline" && <span className="text-[14px] text-muted">{review.date}</span>}
        </div>
        <blockquote className="mt-4 text-[17px] leading-relaxed">{review.text}</blockquote>
        <figcaption className="mt-4 text-[14px] text-muted">
          — {review.name} · {tone === "alt" ? "Google review" : review.service}
        </figcaption>
      </figure>
    </li>
  );
}
