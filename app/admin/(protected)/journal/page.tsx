import Link from "next/link";
import { getAllJournalPostsAdmin } from "lib/supabase/admin-journal";
import { DeleteJournalButton } from "components/admin/delete-journal-button";
import { AdminTableShell } from "components/admin/admin-table-shell";
import { adminPageHeaderClass, adminPrimaryLinkClass } from "components/admin/admin-form-styles";

export const dynamic = "force-dynamic";

export default async function AdminJournalPage() {
  const items = await getAllJournalPostsAdmin();

  return (
    <div>
      <div className={adminPageHeaderClass}>
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Journal</h1>
        <Link href="/admin/journal/new" className={adminPrimaryLinkClass}>
          New post
        </Link>
      </div>
      <AdminTableShell>
        <table className="admin-data-table min-w-full">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Sort</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No journal posts yet.
                </td>
              </tr>
            ) : (
              items.map((p) => (
                <tr key={p.id}>
                  <td className="font-medium">{p.title || "-"}</td>
                  <td className="text-gray-500">{p.slug || "-"}</td>
                  <td>{p.sort_order}</td>
                  <td>{p.status}</td>
                  <td className="space-x-2 whitespace-nowrap">
                    <Link href={`/admin/journal/${p.id}`} className="text-indigo-600 hover:underline">
                      Edit
                    </Link>
                    {p.slug && p.status === "active" ? (
                      <Link href={`/journal/${p.slug}`} className="text-gray-600 hover:underline" target="_blank">
                        View
                      </Link>
                    ) : null}
                    <DeleteJournalButton id={p.id} title={p.title ?? undefined} />
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
