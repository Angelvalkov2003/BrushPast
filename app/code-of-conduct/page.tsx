import { LegalDocument } from "components/legal/legal-document";
import { legalMetadata } from "lib/legal/metadata";
import { getLegalPage } from "lib/legal/pages";
import { notFound } from "next/navigation";

export const metadata = legalMetadata("code-of-conduct");

export default function CodeOfConductPage() {
  const page = getLegalPage("code-of-conduct");
  if (!page) notFound();
  return <LegalDocument page={page} />;
}
