"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { trackProps } from "@/lib/analytics";
import { mainNav } from "./nav";

type Props = { name: string; tel: string };

export function Header({ name, tel }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu after navigating to another page.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const toggle = toggleRef.current;
    const focusables = () =>
      [toggle, ...Array.from(panel?.querySelectorAll<HTMLElement>("a, button") ?? [])].filter(
        (el): el is HTMLElement => !!el,
      );
    focusables()[1]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggle?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      // Keep keyboard focus inside the open menu.
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <div className="container-site flex h-16 items-center justify-between gap-4 nav:h-20">
        <Link href="/" className="font-display text-[22px] font-bold leading-none">
          {name}
        </Link>

        <nav aria-label="Main" className="hidden nav:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-btn px-3 text-[15px] font-medium ${
                    isActive(item.href) ? "bg-brand-tint text-brand" : "text-ink hover:text-brand"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 nav:flex">
          <a
            href={tel}
            className="inline-flex min-h-12 items-center rounded-btn border-2 border-ink px-4 text-[15px] font-semibold hover:bg-surface-alt"
            {...trackProps("click_call", { location: "header" })}
          >
            Call
          </a>
          <Link
            href="/book"
            className="inline-flex min-h-12 items-center rounded-btn bg-brand px-4 text-[15px] font-semibold text-white hover:bg-brand-hover"
          >
            Book now
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-line-strong nav:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-surface nav:hidden"
      >
        <nav aria-label="Main" className="container-site py-4">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex min-h-13 items-center rounded-btn px-3 text-lg font-semibold ${
                    isActive(item.href) ? "bg-brand-tint text-brand" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <a
              href={tel}
              className="inline-flex min-h-12 items-center justify-center rounded-btn border-2 border-ink font-bold"
              {...trackProps("click_call", { location: "mobile_menu" })}
            >
              Call
            </a>
            <Link
              href="/book"
              className="inline-flex min-h-12 items-center justify-center rounded-btn bg-brand font-bold text-white"
            >
              Book now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
