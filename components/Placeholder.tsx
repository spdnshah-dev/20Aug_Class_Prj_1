import Image from "next/image";

type Props = {
  /** The final photo's size, so swapping in the real photo doesn't move anything. */
  width: number;
  height: number;
  /** What photo goes here (shown on the grey box, and used as alt text later). */
  label: string;
  src?: string | null;
  priority?: boolean;
  className?: string;
  rounded?: string;
  sizes?: string;
};

/**
 * Shows the real photo when `src` is set, otherwise a grey dashed box saying
 * which photo belongs there. Both keep the same shape.
 */
export function Placeholder({
  width,
  height,
  label,
  src,
  priority,
  className = "",
  rounded = "rounded-card",
  sizes = "(min-width: 900px) 50vw, 100vw",
}: Props) {
  const style = { aspectRatio: `${width} / ${height}` };
  if (src) {
    return (
      <Image
        src={src}
        alt={label}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={`h-auto w-full object-cover ${rounded} ${className}`}
        style={style}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      style={style}
      className={`flex w-full items-center justify-center border-2 border-dashed border-placeholder-border bg-placeholder-bg p-4 text-center text-[15px] font-semibold text-muted ${rounded} ${className}`}
    >
      {label}
    </div>
  );
}
