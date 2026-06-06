import { redirect } from "next/navigation";

export default async function LegacyCollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  redirect(`/shop/${collection}`);
}
