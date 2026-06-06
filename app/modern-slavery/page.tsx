import { LegalDocument } from "components/legal/legal-document";
import { legalMetadata } from "lib/legal/metadata";
import { getLegalPage } from "lib/legal/pages";
import { notFound } from "next/navigation";

export const metadata = legalMetadata("modern-slavery");

export default function ModernSlaveryPage() {
  const page = getLegalPage("modern-slavery");
  if (!page) notFound();
  return <LegalDocument page={page} />;
}
