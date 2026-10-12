import Link from "next/link";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { formatRange, isUrl } from "@/lib/format";
import { messages, phoneDisplay, telUrl, whatsappUrl } from "@/lib/links";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { MapEmbed } from "@/components/MapEmbed";
import { Section } from "@/components/Section";

export const metadata = pageMeta(
  "Book & contact",
  `Book an appointment at ${site.name} on WhatsApp or by phone. Address, opening hours and directions.`,
  "/book",
);

export default function BookPage() {
  const online = site.booking.onlineUrl;
  const hasOnline = isUrl(online);
  const card = "flex flex-col rounded-card bg-surface p-7";

  return (
    <>
      <PageHero title="Book an appointment" intro="Pick whichever is easiest. Walk-ins welcome when a chair is free." />

      <Section>
        <ul className={`grid gap-5 ${hasOnline ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
          <li className={`${card} border-2 border-whatsapp`}>
            <p className="eyebrow text-whatsapp">Fastest</p>
            <h2 className="mt-2 text-[24px] font-bold">WhatsApp</h2>
            <p className="mb-6 mt-3 text-muted">
              Message the service, day and time. We confirm within {site.booking.whatsappReplyTime} during opening
              hours.
            </p>
            <Button
              href={whatsappUrl(messages.book)}
              variant="whatsapp"
              size={52}
              full
              className="mt-auto"
              track={["click_whatsapp", { location: "book_card" }]}
            >
              Open WhatsApp chat
            </Button>
          </li>
          <li className={`${card} border border-line-strong`}>
            <p className="eyebrow text-muted">Talk to us</p>
            <h2 className="mt-2 text-[24px] font-bold">Call</h2>
            <p className="mb-6 mt-3 text-muted">
              {phoneDisplay()}
              <br />
              {site.booking.bestCallHours}
            </p>
            <Button href={telUrl()} variant="outline" size={52} full className="mt-auto" track={["click_call", { location: "book_card" }]}>
              Call now
            </Button>
          </li>
          {hasOnline && (
            <li className={`${card} border border-line-strong`}>
              <p className="eyebrow text-muted">Any time, even at night</p>
              <h2 className="mt-2 text-[24px] font-bold">Book online</h2>
              <p className="mb-6 mt-3 text-muted">Choose service, stylist and slot yourself.</p>
              <Button href="#online" size={52} full className="mt-auto" track={["click_book_online", { location: "book_card" }]}>
                See open slots
              </Button>
            </li>
          )}
        </ul>

        {hasOnline && (
          <section id="online" aria-labelledby="online-heading" className="mt-10 rounded-card border border-line-strong p-7">
            <h2 id="online-heading" className="font-display text-[26px] font-bold">
              Book online
            </h2>
            <p className="mt-2 text-muted">Opens our booking page in a new tab.</p>
            <Button
              href={online}
              size={52}
              className="mt-5"
              external
              track={["click_book_online", { location: "book_online_section" }]}
            >
              Open online booking
            </Button>
          </section>
        )}
      </Section>

      <Section tone="alt" labelledBy="find-heading">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          <div>
            <h2 id="find-heading" className="font-display text-[26px] font-bold md:text-[36px]">
              Find us
            </h2>
            <address className="mt-4 text-[17px] not-italic">
              {site.address.street}
              <br />
              Near {site.address.landmark}
              <br />
              <strong>Parking:</strong> {site.address.parking}
            </address>
            <table className="mt-6 w-full max-w-[420px] text-left text-[16px]">
              <caption className="mb-2 text-left font-bold">Opening hours</caption>
              <tbody>
                {site.hours.map((h) => (
                  <tr key={h.label} className="border-b border-line">
                    <th scope="row" className="py-2 font-normal">
                      {h.label}
                    </th>
                    <td className="py-2 text-right">{formatRange(h)}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="py-2 font-normal">
                    Holidays
                  </th>
                  <td className="py-2 text-right">{site.holidays}</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-6 text-[15px] text-muted">
              Before you come, read our{" "}
              <Link href="/faq" className="link-arrow">
                cancellation and late-arrival policy
              </Link>
              .
            </p>
          </div>
          <MapEmbed label="Google Map with “Get directions”" />
        </div>
      </Section>
    </>
  );
}
