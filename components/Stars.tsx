import { Star } from "lucide-react";

export function Stars({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5 text-star" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={18} aria-hidden fill={i < count ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
    </span>
  );
}
