"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { GalleryCategory, GalleryItem } from "@/content/types";
import { PageHero } from "./PageHero";
import { Placeholder } from "./Placeholder";

const filters: Array<{ id: GalleryCategory | "all"; label: string }> = [
  { id: "all", label: "All" },
  { id: "colour", label: "Colour" },
  { id: "womens-cuts", label: "Women’s cuts" },
  { id: "mens-cuts", label: "Men’s cuts & beard" },
  { id: "skin-nails", label: "Skin & nails" },
  { id: "salon", label: "The salon" },
];

/** Page hero with the filter buttons, then the photo grid and full-screen view. */
export function GalleryGrid({ items, title, intro }: { items: GalleryItem[]; title: string; intro: string }) {
  const [active, setActive] = useState<GalleryCategory | "all">("all");
  const [open, setOpen] = useState<GalleryItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const shown = active === "all" ? items : items.filter((i) => i.category === active);

  const filterBar = (
    <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter photos">
      {filters.map((f) => (
        <button
          key={f.id}
          type="button"
          aria-pressed={active === f.id}
          onClick={() => setActive(f.id)}
          className={`min-h-11 rounded-full border px-5 text-[15px] font-medium ${
            active === f.id ? "border-ink bg-ink text-white" : "border-line-strong bg-surface hover:border-ink"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <PageHero title={title} intro={intro}>
        {filterBar}
      </PageHero>
      <div className="container-site pt-8 md:pt-12">
        <p className="sr-only" aria-live="polite">
          Showing {shown.length} photos
        </p>
        <ul className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
          {shown.map((item, i) => (
            <li key={`${item.alt}-${i}`}>
              <figure>
                {item.src ? (
                  <button
                    type="button"
                    onClick={() => setOpen(item)}
                    className="block w-full overflow-hidden rounded-card"
                    aria-label={`Open larger photo: ${item.alt}`}
                  >
                    <Placeholder width={600} height={600} label={item.alt} src={item.src} sizes="(min-width: 900px) 25vw, 100vw" />
                  </button>
                ) : (
                  <Placeholder width={600} height={600} label={`Photo: ${item.alt}`} />
                )}
                <figcaption className="mt-2 text-[14px] text-muted">
                  {item.service} · by {item.stylist}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        className="m-auto max-h-[92vh] max-w-[92vw] bg-transparent p-0 backdrop:bg-ink/90"
        aria-label={open?.alt}
      >
        {open?.src && (
          <div className="relative">
            <Image
              src={open.src}
              alt={open.alt}
              width={1200}
              height={1200}
              sizes="92vw"
              className="h-auto max-h-[85vh] w-auto rounded-card object-contain"
            />
            <p className="mt-2 text-center text-[15px] text-white">
              {open.service} · by {open.stylist}
            </p>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute right-2 top-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface text-ink"
              aria-label="Close photo"
            >
              <X size={22} aria-hidden />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
