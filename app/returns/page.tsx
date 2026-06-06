import { LegalDocument } from "components/legal/legal-document";
import { legalMetadata } from "lib/legal/metadata";
import { getLegalPage } from "lib/legal/pages";
import { notFound } from "next/navigation";

export const metadata = legalMetadata("returns");

export default function ReturnsPage() {
  const page = getLegalPage("returns");
  if (!page) notFound();
  return <LegalDocument page={page} />;
}
