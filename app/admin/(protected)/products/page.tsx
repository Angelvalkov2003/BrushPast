import Link from "next/link";
import { getAllProductsAdmin } from "lib/supabase/admin-products";
import { getAllCategoriesAdmin } from "lib/supabase/admin-categories";
import { DeleteProductButton } from "components/admin/delete-product-button";
import { formatPrice } from "lib/currency";
import { toggleProductStatusAction } from "./actions";
import { AdminTableShell } from "components/admin/admin-table-shell";
import {
  adminPageHeaderClass,
  adminPrimaryLinkClass,
} from "components/admin/admin-form-styles";
import { boxCategoriesFromAdmin } from "lib/shop-box-config";

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
      <div className={adminPageHeaderClass}>
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Products</h1>
        <Link href="/admin/products/new" className={adminPrimaryLinkClass}>
          New product
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Link href="/admin/products" className="rounded border px-3 py-2 text-sm">
          All
        </Link>
        {boxCategoriesFromAdmin(categories).map((c) => (
          <Link
            key={c.id}
            href={`/admin/products?category=${c.id}`}
            className="rounded border px-3 py-2 text-sm"
          >
            {c.label}
          </Link>
        ))}
      </div>

      <AdminTableShell>
        <table className="admin-data-table min-w-full">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No products yet.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.main_image_url ? (
                      <img src={p.main_image_url} alt="" className="h-10 w-10 rounded object-cover sm:h-12 sm:w-12" />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="font-medium">{p.title}</td>
                  <td className="text-gray-500">{p.slug}</td>
                  <td>{p.price_gbp != null ? formatPrice(Number(p.price_gbp)) : "-"}</td>
                  <td>
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
                  <td className="space-x-2 whitespace-nowrap">
                    <Link href={`/admin/products/${p.id}`} className="text-indigo-600 hover:underline">
                      Edit
                    </Link>
                    <DeleteProductButton productId={p.id} productTitle={p.title ?? undefined} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </AdminTableShell>
    </div>
  );
}
