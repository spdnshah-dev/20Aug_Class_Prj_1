import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  tone?: "surface" | "alt" | "brand";
  id?: string;
  className?: string;
  labelledBy?: string;
};

const tones = {
  surface: "bg-surface",
  alt: "bg-surface-alt",
  brand: "bg-brand text-white",
};

export function Section({ children, tone = "surface", id, className = "", labelledBy }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} py-8 md:py-16 lg:py-20 ${className}`}>
      <div className="container-site">{children}</div>
    </section>
  );
}

/** H2 with an optional "→" link on the right, as used on the home page. */
export function SectionHeader({
  title,
  id,
  action,
  size = "home",
}: {
  title: string;
  id?: string;
  action?: ReactNode;
  size?: "home" | "inner";
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 md:mb-9">
      <h2
        id={id}
        className={`font-display font-bold leading-tight text-[26px] ${size === "home" ? "md:text-[40px]" : "md:text-[32px]"}`}
      >
        {title}
      </h2>
      {action}
    </div>
  );
}
