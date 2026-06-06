import Link from "next/link";
import { getAllStoriesAdmin } from "lib/supabase/admin-stories";
import { DeleteStoryButton } from "components/admin/delete-story-button";

export const dynamic = "force-dynamic";

export default async function AdminStoriesPage() {
  const items = await getAllStoriesAdmin();
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Stories</h1>
        <Link href="/admin/stories/new" className="rounded bg-gray-900 px-4 py-2 text-white">
          New story
        </Link>
      </div>
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  No stories yet.
                </td>
              </tr>
            ) : (
              items.map((s) => (
                <tr key={s.id}>
                  <td className="px-4 py-3 font-medium">{s.title || "—"}</td>
                  <td className="px-4 py-3 text-gray-500">{s.slug || "—"}</td>
                  <td className="px-4 py-3">{s.status}</td>
                  <td className="px-4 py-3 space-x-2">
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
      </div>
    </div>
  );
}
