import { site } from "@/content/site";

/** WhatsApp chat link with a prefilled message. */
export function whatsappUrl(message = "Hi, I'd like to book an appointment."): string {
  const digits = site.contact.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const messages = {
  book: "Hi, I'd like to book an appointment.",
  service: (service: string) => `Hi, I'd like to book: ${service}`,
  stylist: (stylist: string) => `Hi, I'd like to book with ${stylist}`,
  askWithPhoto: "Hi, I'm not sure which service I need. Here's a photo:",
  question: "Hi, I have a question:",
  look: "Hi, I saw your gallery and I'd like to book this look:",
};

export function telUrl(): string {
  return `tel:${site.contact.phone.replace(/[^\d+]/g, "") || site.contact.phone}`;
}

/** The phone number as people read it, e.g. "+91 98765 43210". */
export function phoneDisplay(): string {
  const phone = site.contact.phone;
  const m = phone.match(/^\+91(\d{5})(\d{5})$/);
  return m ? `+91 ${m[1]} ${m[2]}` : phone;
}

export function directionsUrl(): string {
  return site.address.mapsUrl;
}

export function instagramUrl(): string {
  return `https://www.instagram.com/${site.contact.instagram.replace(/^@/, "")}/`;
}

export function instagramHandle(): string {
  return `@${site.contact.instagram.replace(/^@/, "")}`;
}
