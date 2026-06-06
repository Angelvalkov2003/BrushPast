import Link from "next/link";
import { getAllCreatorsAdmin } from "lib/supabase/admin-creators";
import { DeleteCreatorButton } from "components/admin/delete-creator-button";

export const dynamic = "force-dynamic";

export default async function AdminCreatorsPage() {
  const items = await getAllCreatorsAdmin();
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Creators</h1>
        <Link href="/admin/creators/new" className="rounded bg-gray-900 px-4 py-2 text-white">
          New creator
        </Link>
      </div>
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Anonymous</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Sort</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No creators yet.
                </td>
              </tr>
            ) : (
              items.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-3 font-medium">{c.name || "—"}</td>
                  <td className="px-4 py-3">{c.is_anonymous ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">{c.status}</td>
                  <td className="px-4 py-3">{c.sort_order}</td>
                  <td className="px-4 py-3 space-x-2">
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
      </div>
    </div>
  );
}
