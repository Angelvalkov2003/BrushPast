import Link from "next/link";
import { getAllProductsAdmin } from "lib/supabase/admin-products";
import { getAllCategoriesAdmin } from "lib/supabase/admin-categories";
import { DeleteProductButton } from "components/admin/delete-product-button";
import { formatPrice } from "lib/currency";
import { toggleProductStatusAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    getAllProductsAdmin({ categoryId: params.category }),
    getAllCategoriesAdmin(),
  ]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="rounded bg-gray-900 px-4 py-2 text-white">
          New product
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Link href="/admin/products" className="rounded border px-3 py-1 text-sm">All</Link>
        {categories.map((c) => (
          <Link key={c.id} href={`/admin/products?category=${c.id}`} className="rounded border px-3 py-1 text-sm">
            {c.name || c.slug}
          </Link>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No products yet.</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3">
                    {p.main_image_url ? (
                      <img src={p.main_image_url} alt="" className="h-12 w-12 rounded object-cover" />
                    ) : "—"}
                  </td>
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3 text-gray-500">{p.slug}</td>
                  <td className="px-4 py-3">{p.price_gbp != null ? formatPrice(Number(p.price_gbp)) : "—"}</td>
                  <td className="px-4 py-3">
                    <form
                      action={async () => {
                        "use server";
                        await toggleProductStatusAction(
                          p.id,
                          p.status === "active" ? "hidden" : "active",
                        );
                      }}
                    >
                      <button
                        type="submit"
                        className={`rounded px-2 py-1 text-xs ${p.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100"}`}
                      >
                        {p.status}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <Link href={`/admin/products/${p.id}`} className="text-indigo-600 hover:underline">Edit</Link>
                    <DeleteProductButton productId={p.id} productTitle={p.title ?? undefined} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
