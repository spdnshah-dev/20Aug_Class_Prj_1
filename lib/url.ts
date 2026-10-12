import { site } from "@/content/site";
import { isUrl } from "./format";

/**
 * The site's main web address. Uses `domain` from content/site.ts once it is
 * filled in; until then, the Vercel preview address or localhost.
 */
export function siteUrl(): string {
  if (isUrl(site.domain)) return site.domain.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
