import Link from "next/link";
import { getAllStoriesAdmin } from "lib/supabase/admin-stories";
import { DeleteStoryButton } from "components/admin/delete-story-button";
import { AdminTableShell } from "components/admin/admin-table-shell";
import { adminPageHeaderClass, adminPrimaryLinkClass } from "components/admin/admin-form-styles";

export const dynamic = "force-dynamic";

export default async function AdminStoriesPage() {
  const items = await getAllStoriesAdmin();
  return (
    <div>
      <div className={adminPageHeaderClass}>
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Stories</h1>
        <Link href="/admin/stories/new" className={adminPrimaryLinkClass}>
          New story
        </Link>
      </div>
      <AdminTableShell>
        <table className="admin-data-table min-w-full">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No stories yet.
                </td>
              </tr>
            ) : (
              items.map((s) => (
                <tr key={s.id}>
                  <td className="font-medium">{s.title || "-"}</td>
                  <td className="text-gray-500">{s.slug || "-"}</td>
                  <td>{s.status}</td>
                  <td className="space-x-2 whitespace-nowrap">
                    <Link href={`/admin/stories/${s.id}`} className="text-indigo-600 hover:underline">
                      Edit
                    </Link>
                    <DeleteStoryButton id={s.id} title={s.title ?? undefined} />
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
