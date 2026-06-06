import { redirect } from "next/navigation";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string }>;
}) {
  const { collection } = await searchParams;
  if (collection) redirect(`/shop/${collection}`);
  redirect("/shop");
}
