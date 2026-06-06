import Link from "next/link";
import { getAllOrganisationsAdmin } from "lib/supabase/admin-organisations";
import { DeleteOrganisationButton } from "components/admin/delete-organisation-button";

export const dynamic = "force-dynamic";

export default async function AdminOrganisationsPage() {
  const items = await getAllOrganisationsAdmin();
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Organisations</h1>
        <Link href="/admin/organisations/new" className="rounded bg-gray-900 px-4 py-2 text-white">
          New organisation
        </Link>
      </div>
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  No organisations yet.
                </td>
              </tr>
            ) : (
              items.map((o) => (
                <tr key={o.id}>
                  <td className="px-4 py-3 font-medium">{o.name || "—"}</td>
                  <td className="px-4 py-3 text-gray-500">{o.slug || "—"}</td>
                  <td className="px-4 py-3">{o.status}</td>
                  <td className="px-4 py-3 space-x-2">
                    <Link href={`/admin/organisations/${o.id}`} className="text-indigo-600 hover:underline">
                      Edit
                    </Link>
                    <DeleteOrganisationButton id={o.id} name={o.name ?? undefined} />
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
