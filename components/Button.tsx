import Link from "next/link";
import type { ReactNode } from "react";
import { trackProps, type TrackEvent, type TrackParams } from "@/lib/analytics";

type Variant = "brand" | "whatsapp" | "outline" | "outline-brand" | "on-brand" | "outline-on-brand";
type Size = 44 | 48 | 52;

const variants: Record<Variant, string> = {
  brand: "bg-brand text-white hover:bg-brand-hover",
  whatsapp: "bg-whatsapp text-white hover:brightness-90",
  outline: "border-2 border-ink text-ink bg-surface hover:bg-surface-alt",
  "outline-brand": "border-2 border-brand text-brand bg-surface hover:bg-brand-tint",
  "on-brand": "bg-surface text-brand hover:bg-brand-tint",
  "outline-on-brand": "border-2 border-white text-white hover:bg-brand-hover",
};

const sizes: Record<Size, string> = {
  44: "min-h-11 px-4 text-[15px]",
  48: "min-h-12 px-5 text-base",
  52: "min-h-13 px-6 text-[17px]",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  full?: boolean;
  icon?: ReactNode;
  className?: string;
  track?: [TrackEvent, TrackParams];
} & (
  | { href: string; external?: boolean; onClick?: never; type?: never }
  | { href?: never; external?: never; onClick?: () => void; type?: "button" | "submit" }
);

export function Button({ children, variant = "brand", size = 48, full, icon, className = "", track, ...rest }: Props) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-btn font-bold leading-tight text-center transition-colors",
    variants[variant],
    sizes[size],
    full ? "w-full" : "",
    className,
  ].join(" ");
  const tracking = track ? trackProps(track[0], track[1]) : {};
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (rest.href !== undefined) {
    const isInternal = rest.href.startsWith("/") && !rest.external;
    if (isInternal) {
      return (
        <Link href={rest.href} className={classes} {...tracking}>
          {content}
        </Link>
      );
    }
    const newTab = rest.external ?? /^https?:/.test(rest.href);
    return (
      <a
        href={rest.href}
        className={classes}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...tracking}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={rest.type ?? "button"} onClick={rest.onClick} className={classes} {...tracking}>
      {content}
    </button>
  );
}
