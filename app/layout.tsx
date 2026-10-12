import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/url";
import { telUrl } from "@/lib/links";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { AnalyticsListener } from "@/components/AnalyticsListener";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import "./globals.css";

// Every page is built ahead of time. The build fails if anything would need a server.
export const ensureStatic = "navigation";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["700"], display: "swap", variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-body" });

const homeTitle = `Unisex Salon in ${site.area} | ${site.name}`;
const description = `${site.tagline} Prices shown upfront. Pick your stylist. Book on WhatsApp.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: homeTitle,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: homeTitle,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: homeTitle, description },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const gaId = process.env.NEXT_PUBLIC_GA4_ID || site.analytics.ga4Id;
const loadAnalytics = Boolean(gaId) && process.env.NODE_ENV === "production";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <a
          href="#main"
          className="sr-only z-50 rounded-btn bg-brand px-4 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header name={site.name} tel={telUrl()} />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        <AnalyticsListener />
        <LocalBusinessSchema />
      </body>
      {loadAnalytics && gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
