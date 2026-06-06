import type { Metadata } from "next";
import { getLegalPage } from "./pages";
import { SITE_NAME } from "lib/site-config";

export function legalMetadata(slug: string): Metadata {
  const page = getLegalPage(slug);
  if (!page) {
    return { title: "Not found" };
  }
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: `${page.title} | ${SITE_NAME}`,
      description: page.description,
    },
  };
}
