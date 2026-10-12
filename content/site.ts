// ─────────────────────────────────────────────────────────────────────────────
// ALL SALON DETAILS LIVE IN THIS ONE FILE.
//
// Replace every [BRACKETED] value with your real details. Keep the quote marks.
// The live site will refuse to publish while any [BRACKETED] text, empty price
// or unreviewed privacy policy is left. See README.md for step-by-step help.
// ─────────────────────────────────────────────────────────────────────────────

import type { Site } from "./types";

const WHATS_INCLUDED = "[One line: what's included]";

export const site: Site = {
  name: "[SALON NAME]",
  legalName: "[Registered business name]",
  tagline: "Haircuts, colour and skin care for everyone.",
  area: "[AREA, CITY]",
  domain: "[https://yourdomain.in]",

  contact: {
    phone: "[+91XXXXXXXXXX]", // with country code, no spaces: "+919876543210"
    whatsapp: "[91XXXXXXXXXX]", // digits only, with country code: "919876543210"
    instagram: "[your_handle]", // without the @
    email: null,
  },

  address: {
    street: "[Full street address]",
    locality: "[Area]",
    city: "[City]",
    region: "[State]",
    postalCode: "[PIN]",
    landmark: "[Landmark]",
    parking: "[Where to park]",
    geo: { lat: null, lng: null },
    mapsUrl: "[Google Maps share link]",
    mapsEmbedUrl: "[Google Maps embed src]",
  },

  hours: [
    { label: "Monday – Friday", days: ["Mo", "Tu", "We", "Th", "Fr"], open: null, close: null },
    { label: "Saturday – Sunday", days: ["Sa", "Su"], open: null, close: null },
  ],
  holidays: "[Closed / special hours]",

  google: {
    rating: null,
    reviewCount: null,
    reviewsUrl: "[Google reviews link]",
    writeReviewUrl: "[Google write-a-review link]",
  },

  booking: {
    onlineUrl: null, // null = the "Book online" option is hidden
    whatsappReplyTime: "[X minutes]",
    bestCallHours: "[Best hours to call]",
  },

  hygienePromise: {
    title: "[Your hygiene promise]",
    body: "[What you actually do — e.g. tools cleaned between clients, fresh towels.]",
  },
  products: "[Brands you use for hair, colour and skin.]",

  about: {
    story: [
      "[2–3 lines: who started the salon, when, and why. Keep it personal and specific — this is the one page where your story matters.]",
      "[1–2 lines: who you serve — e.g. families, working professionals in the area — and what you're known for.]",
    ],
    hygiene: "[What you actually do: tool cleaning, disposable items, towels.]",
    training: "[Only if true: certifications or ongoing training for the team. Set to null to hide.]",
  },

  priceNote:
    "[One line on how prices can change — e.g. longer hair costs more; the stylist confirms before starting.]",

  images: {
    hero: { src: null, alt: "Photo: your real salon interior or a stylist at work (not stock)" },
    aboutTeam: { src: null, alt: "Photo: owner or whole team" },
    shopfront: { src: null, alt: "Photo: shopfront" },
    stylingArea: { src: null, alt: "Photo: styling area" },
    washArea: { src: null, alt: "Photo: wash / facial area" },
  },

  services: [
    {
      id: "hair-men",
      category: "Hair — men",
      note: "Includes wash",
      items: [
        { name: "Haircut", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: false, audience: "Men", popular: true },
        { name: "Haircut + beard trim", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: false, audience: "Men" },
        { name: "Kids haircut (under [AGE])", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: false, audience: "Kids" },
      ],
    },
    {
      id: "hair-women",
      category: "Hair — women",
      note: "Price depends on hair length",
      items: [
        { name: "Haircut", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: true, audience: "Women", popular: true },
        { name: "Blow-dry / styling", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: true, audience: "Women" },
        { name: "Hair spa", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: true, audience: "Women" },
      ],
    },
    {
      id: "colour",
      category: "Colour & treatments",
      note: "Patch test advised",
      items: [
        { name: "Root touch-up", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: true, audience: "Everyone" },
        { name: "Global colour", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: true, audience: "Everyone", popular: true },
        { name: "Highlights", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: true, audience: "Everyone" },
        { name: "Keratin / smoothening", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: true, audience: "Everyone" },
      ],
    },
    {
      id: "skin",
      category: "Skin & facials",
      note: null,
      items: [
        { name: "Clean-up", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: false, audience: "Everyone", popular: true },
        { name: "Facial", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: true, audience: "Everyone" },
        { name: "De-tan", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: false, audience: "Everyone" },
      ],
    },
    {
      id: "hands-feet",
      category: "Hands & feet",
      note: null,
      items: [
        { name: "Manicure", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: false, audience: "Everyone" },
        { name: "Pedicure", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: false, audience: "Everyone" },
      ],
    },
    {
      id: "grooming",
      category: "Waxing, threading & grooming",
      note: null,
      items: [
        { name: "Threading", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: false, audience: "Everyone" },
        { name: "Waxing", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: true, audience: "Everyone" },
        { name: "Beard styling", desc: WHATS_INCLUDED, minutes: null, price: null, priceFrom: false, audience: "Men" },
      ],
    },
  ],

  team: [
    { name: "[Stylist name]", role: "[Senior stylist]", bestAt: "[e.g. colour, curly hair, men's fades]", years: null, photo: null },
    { name: "[Stylist name]", role: "[Colour specialist]", bestAt: "[e.g. colour, curly hair, men's fades]", years: null, photo: null },
    { name: "[Stylist name]", role: "[Men's grooming]", bestAt: "[e.g. colour, curly hair, men's fades]", years: null, photo: null },
    { name: "[Stylist name]", role: "[Stylist]", bestAt: "[e.g. colour, curly hair, men's fades]", years: null, photo: null },
    { name: "[Stylist name]", role: "[Skin & beauty]", bestAt: "[e.g. colour, curly hair, men's fades]", years: null, photo: null },
    { name: "[Stylist name]", role: "[Nail technician]", bestAt: "[e.g. colour, curly hair, men's fades]", years: null, photo: null },
  ],

  // Only real Google reviews, copied word for word, with the customer's first name.
  // Leave this list empty until you have them — the reviews sections hide themselves.
  // Example of one entry:
  //   { name: "Priya", service: "Global colour", date: "March 2026", text: "…", stars: 5 },
  reviews: [],

  gallery: [
    { src: null, alt: "Before / after: global colour", category: "colour", service: "[Service name]", stylist: "[Stylist]", home: true },
    { src: null, alt: "Women's layered cut", category: "womens-cuts", service: "[Service name]", stylist: "[Stylist]", home: true },
    { src: null, alt: "Men's fade", category: "mens-cuts", service: "[Service name]", stylist: "[Stylist]", home: true },
    { src: null, alt: "Before / after: highlights", category: "colour", service: "[Service name]", stylist: "[Stylist]" },
    { src: null, alt: "Manicure", category: "skin-nails", service: "[Service name]", stylist: "[Stylist]" },
    { src: null, alt: "Beard styling", category: "mens-cuts", service: "[Service name]", stylist: "[Stylist]" },
    { src: null, alt: "Reception area", category: "salon", service: "[Service name]", stylist: "[Stylist]", home: true },
    { src: null, alt: "Blow-dry & style", category: "womens-cuts", service: "[Service name]", stylist: "[Stylist]" },
    { src: null, alt: "Before / after: root touch-up", category: "colour", service: "[Service name]", stylist: "[Stylist]" },
    { src: null, alt: "Styling stations", category: "salon", service: "[Service name]", stylist: "[Stylist]" },
    { src: null, alt: "Facial room", category: "salon", service: "[Service name]", stylist: "[Stylist]" },
    { src: null, alt: "Kids haircut", category: "mens-cuts", service: "[Service name]", stylist: "[Stylist]" },
  ],

  // Questions with `a: null` are hidden on the live site.
  faq: [
    { group: "Booking", q: "Do I need an appointment, or can I walk in?", a: null },
    { group: "Booking", q: "How do I cancel or reschedule?", a: null },
    { group: "Booking", q: "Do you take an advance payment?", a: null },
    { group: "Booking", q: "What happens if I'm late?", a: null },
    { group: "Booking", q: "Can I ask for a specific stylist?", a: null },
    { group: "Services & prices", q: "Why do some prices say “from”?", a: null },
    { group: "Services & prices", q: "Do you do a patch test before colour?", a: null },
    { group: "Services & prices", q: "Which products do you use?", a: null },
    { group: "Services & prices", q: "Do you have services for kids?", a: null },
    { group: "Visiting", q: "Is there parking nearby?", a: null },
    { group: "Visiting", q: "Which payment methods do you accept?", a: null },
    { group: "Visiting", q: "How do you keep tools and towels clean?", a: null },
    { group: "Visiting", q: "Should I come with washed hair?", a: null },
  ],

  policies: {
    cancel: "[at least X hours before]",
    late: "[what happens after X minutes]",
    advance: "[only for services like …, or none]",
  },

  privacy: {
    lastUpdated: "[DATE]",
    reviewed: false, // set to true only after a CA or lawyer has reviewed the text below
    sections: [
      {
        heading: "What we collect",
        body: "[e.g. name, phone number, services booked, and anything you tell us about allergies or skin/hair conditions.]",
      },
      {
        heading: "Why we collect it",
        body: "[e.g. to confirm and remind you about bookings, and to keep a record of colour formulas or treatments.]",
      },
      {
        heading: "Who we share it with",
        body: "[e.g. our booking software provider. This website uses Google Analytics to count visits and button clicks. We do not sell your data.]",
      },
      { heading: "How long we keep it", body: "[Your retention period.]" },
      {
        heading: "Your choices",
        body: "[How to ask us to see, correct or delete your data, and how to stop promotional WhatsApp messages.]",
      },
      { heading: "Contact", body: "[Name and contact for privacy questions.]" },
    ],
  },

  // Normally left as null: the ID is set in Vercel as NEXT_PUBLIC_GA4_ID instead.
  analytics: { ga4Id: null },
};
