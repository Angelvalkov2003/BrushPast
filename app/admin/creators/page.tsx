import Link from "next/link";
import { getAllCreatorsAdmin } from "lib/supabase/admin-creators";
import { DeleteCreatorButton } from "components/admin/delete-creator-button";
import { AdminTableShell } from "components/admin/admin-table-shell";
import { adminPageHeaderClass, adminPrimaryLinkClass } from "components/admin/admin-form-styles";

export const dynamic = "force-dynamic";

export default async function AdminCreatorsPage() {
  const items = await getAllCreatorsAdmin();
  return (
    <div>
      <div className={adminPageHeaderClass}>
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Creators</h1>
        <Link href="/admin/creators/new" className={adminPrimaryLinkClass}>
          New creator
        </Link>
      </div>
      <AdminTableShell>
        <table className="admin-data-table min-w-full">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th>Name</th>
              <th>Anonymous</th>
              <th>Status</th>
              <th>Sort</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No creators yet.
                </td>
              </tr>
            ) : (
              items.map((c) => (
                <tr key={c.id}>
                  <td className="font-medium">{c.name || "—"}</td>
                  <td>{c.is_anonymous ? "Yes" : "No"}</td>
                  <td>{c.status}</td>
                  <td>{c.sort_order}</td>
                  <td className="space-x-2 whitespace-nowrap">
                    <Link href={`/admin/creators/${c.id}`} className="text-indigo-600 hover:underline">
                      Edit
                    </Link>
                    <DeleteCreatorButton id={c.id} name={c.name ?? undefined} />
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
