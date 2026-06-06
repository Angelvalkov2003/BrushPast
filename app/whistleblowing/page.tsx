import { LegalDocument } from "components/legal/legal-document";
import { legalMetadata } from "lib/legal/metadata";
import { getLegalPage } from "lib/legal/pages";
import { notFound } from "next/navigation";

export const metadata = legalMetadata("whistleblowing");

export default function WhistleblowingPage() {
  const page = getLegalPage("whistleblowing");
  if (!page) notFound();
  return <LegalDocument page={page} />;
}
