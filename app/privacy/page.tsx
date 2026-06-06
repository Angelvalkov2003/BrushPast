import { LegalDocument } from "components/legal/legal-document";
import { legalMetadata } from "lib/legal/metadata";
import { getLegalPage } from "lib/legal/pages";
import { notFound } from "next/navigation";

export const metadata = legalMetadata("privacy");

export default function PrivacyPage() {
  const page = getLegalPage("privacy");
  if (!page) notFound();
  return <LegalDocument page={page} />;
}
