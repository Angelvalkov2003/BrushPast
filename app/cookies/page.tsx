import { LegalDocument } from "components/legal/legal-document";
import { legalMetadata } from "lib/legal/metadata";
import { getLegalPage } from "lib/legal/pages";
import { notFound } from "next/navigation";

export const metadata = legalMetadata("cookies");

export default function CookiesPage() {
  const page = getLegalPage("cookies");
  if (!page) notFound();
  return <LegalDocument page={page} />;
}
