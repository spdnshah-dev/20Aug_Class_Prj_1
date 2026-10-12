// Shapes for content/site.ts. The owner edits site.ts, not this file.

export type Audience = "Men" | "Women" | "Kids" | "Everyone";

export type Photo = {
  /** Path inside /public, e.g. "/images/hero.jpg". null = show a grey placeholder. */
  src: string | null;
  /** Describe what the photo shows, for screen readers and Google. */
  alt: string;
};

export type OpeningHours = {
  /** How the days are shown on the site, e.g. "Monday – Friday". */
  label: string;
  /** Same days for Google, using two-letter codes: Mo Tu We Th Fr Sa Su. */
  days: Array<"Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su">;
  /** 24-hour time, e.g. "10:00". null = not filled in yet. */
  open: string | null;
  close: string | null;
};

export type ServiceItem = {
  name: string;
  desc: string;
  minutes: number | null;
  /** Price in rupees, e.g. 1200. null = not filled in yet. */
  price: number | null;
  /** true shows "from ₹X" instead of "₹X". */
  priceFrom: boolean;
  audience: Audience;
  /** true shows it in "Popular services" on the home page (pick 4). */
  popular?: boolean;
};

export type ServiceCategory = {
  /** Short web-address-friendly name, used for the jump links. */
  id: string;
  category: string;
  note: string | null;
  items: ServiceItem[];
};

export type Stylist = {
  name: string;
  role: string;
  bestAt: string;
  years: number | null;
  photo: string | null;
};

export type Review = {
  name: string;
  service: string;
  date: string;
  text: string;
  stars: 1 | 2 | 3 | 4 | 5;
};

export type GalleryCategory = "colour" | "womens-cuts" | "mens-cuts" | "skin-nails" | "salon";

export type GalleryItem = {
  src: string | null;
  alt: string;
  category: GalleryCategory;
  service: string;
  stylist: string;
  /** true shows it in "Our work" on the home page (pick 4). */
  home?: boolean;
};

export type FaqGroup = "Booking" | "Services & prices" | "Visiting";

export type FaqItem = {
  group: FaqGroup;
  q: string;
  /** null = question is hidden on the live site. */
  a: string | null;
};

export type PrivacySection = { heading: string; body: string };

export type Site = {
  name: string;
  legalName: string;
  tagline: string;
  area: string;
  domain: string;
  contact: {
    phone: string;
    whatsapp: string;
    instagram: string;
    email: string | null;
  };
  address: {
    street: string;
    locality: string;
    city: string;
    region: string;
    postalCode: string;
    landmark: string;
    parking: string;
    geo: { lat: number | null; lng: number | null };
    mapsUrl: string;
    mapsEmbedUrl: string;
  };
  hours: OpeningHours[];
  holidays: string;
  google: {
    rating: number | null;
    reviewCount: number | null;
    reviewsUrl: string;
    writeReviewUrl: string;
  };
  booking: {
    onlineUrl: string | null;
    whatsappReplyTime: string;
    bestCallHours: string;
  };
  hygienePromise: { title: string; body: string };
  products: string;
  about: {
    story: string[];
    hygiene: string;
    /** null = the Training card is hidden. */
    training: string | null;
  };
  priceNote: string;
  images: {
    hero: Photo;
    aboutTeam: Photo;
    shopfront: Photo;
    stylingArea: Photo;
    washArea: Photo;
  };
  services: ServiceCategory[];
  team: Stylist[];
  reviews: Review[];
  gallery: GalleryItem[];
  faq: FaqItem[];
  policies: { cancel: string; late: string; advance: string };
  privacy: { lastUpdated: string; reviewed: boolean; sections: PrivacySection[] };
  analytics: { ga4Id: string | null };
};
