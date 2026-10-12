import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/url";

const routes = ["", "/services", "/book", "/gallery", "/team", "/reviews", "/about", "/faq", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return routes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/privacy" ? 0.3 : 0.8,
  }));
}
