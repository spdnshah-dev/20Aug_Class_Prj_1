import Link from "next/link";
import { site } from "@/content/site";
import { hoursLine } from "@/lib/format";
import { instagramHandle, instagramUrl, messages, phoneDisplay, telUrl, whatsappUrl } from "@/lib/links";
import { trackProps } from "@/lib/analytics";
import { Button } from "./Button";
import { CopyrightYear } from "./CopyrightYear";

const footerPages = [
  { href: "/services", label: "Services & prices" },
  { href: "/gallery", label: "Gallery" },
  { href: "/team", label: "Team" },
  { href: "/faq", label: "FAQ & policies" },
];

export function Footer() {
  const sameNumber = site.contact.phone.replace(/\D/g, "") === site.contact.whatsapp.replace(/\D/g, "");
  return (
    <footer className="bg-ink pb-20 pt-12 text-[15px] text-footer-text nav:pb-0 md:pt-14">
      <div className="container-site">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-[22px] font-bold text-white">{site.name}</p>
            <address className="mt-3 not-italic leading-relaxed">
              Unisex salon
              <br />
              {site.address.street}
              <br />
              Near {site.address.landmark}
            </address>
          </div>

          <div>
            <h2 className="font-semibold text-white">Hours</h2>
            <ul className="mt-3 leading-relaxed">
              {site.hours.map((h) => (
                <li key={h.label}>{hoursLine(h)}</li>
              ))}
              <li>{site.holidays}</li>
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-semibold text-white">Pages</h2>
            <ul className="mt-1">
              {footerPages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="inline-flex min-h-11 items-center hover:text-white">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-semibold text-white">Get in touch</h2>
            <p className="mt-3 leading-relaxed">
              {sameNumber ? "Phone / WhatsApp: " : "Phone: "}
              <a href={telUrl()} className="hover:text-white" {...trackProps("click_call", { location: "footer" })}>
                {phoneDisplay()}
              </a>
              <br />
              Instagram:{" "}
              <a
                href={instagramUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
                {...trackProps("click_instagram", { location: "footer" })}
              >
                {instagramHandle()}
              </a>
            </p>
            <Button
              href={whatsappUrl(messages.book)}
              variant="whatsapp"
              size={48}
              full
              className="mt-4"
              track={["click_whatsapp", { location: "footer" }]}
            >
              Book on WhatsApp
            </Button>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-footer-line py-6 text-[14px] text-footer-muted">
          <p>
            © <CopyrightYear /> {site.legalName}
          </p>
          <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-white">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
