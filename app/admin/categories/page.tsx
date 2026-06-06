import Link from "next/link";
import { getAllCategoriesAdmin } from "lib/supabase/admin-categories";
import { DeleteCategoryButton } from "components/admin/delete-category-button";
import { AdminTableShell } from "components/admin/admin-table-shell";
import { adminPageHeaderClass, adminPrimaryLinkClass } from "components/admin/admin-form-styles";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await getAllCategoriesAdmin();

  return (
    <div>
      <div className={adminPageHeaderClass}>
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Categories</h1>
        <Link href="/admin/categories/new" className={adminPrimaryLinkClass}>
          New category
        </Link>
      </div>
      <AdminTableShell>
        <table className="admin-data-table min-w-full">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Sort</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No categories yet.
                </td>
              </tr>
            ) : (
              categories.map((c) => (
                <tr key={c.id}>
                  <td className="font-medium">{c.name || "—"}</td>
                  <td className="text-gray-500">{c.slug}</td>
                  <td>{c.status}</td>
                  <td>{c.sort_order}</td>
                  <td className="space-x-2 whitespace-nowrap">
                    <Link href={`/admin/categories/${c.id}`} className="text-indigo-600 hover:underline">
                      Edit
                    </Link>
                    <DeleteCategoryButton categoryId={c.id} name={c.name ?? c.slug ?? undefined} />
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
