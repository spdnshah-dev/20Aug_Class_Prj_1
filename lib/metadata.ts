import type { Metadata } from "next";
import { site } from "@/content/site";

/** Title pattern from the spec: "<Page> | [SALON NAME], [AREA]". */
export function pageMeta(page: string, description: string, path: string): Metadata {
  const title = `${page} | ${site.name}, ${site.area}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { title, description },
  };
}
