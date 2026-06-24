import Link from "next/link";
import { getAllOrganisationsAdmin } from "lib/supabase/admin-organisations";
import { DeleteOrganisationButton } from "components/admin/delete-organisation-button";
import { AdminTableShell } from "components/admin/admin-table-shell";
import { adminPageHeaderClass, adminPrimaryLinkClass } from "components/admin/admin-form-styles";

export const dynamic = "force-dynamic";

export default async function AdminOrganisationsPage() {
  const items = await getAllOrganisationsAdmin();
  return (
    <div>
      <div className={adminPageHeaderClass}>
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Organisations</h1>
        <Link href="/admin/organisations/new" className={adminPrimaryLinkClass}>
          New organisation
        </Link>
      </div>
      <AdminTableShell>
        <table className="admin-data-table min-w-full">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No organisations yet.
                </td>
              </tr>
            ) : (
              items.map((o) => (
                <tr key={o.id}>
                  <td className="font-medium">{o.name || "-"}</td>
                  <td className="text-gray-500">{o.slug || "-"}</td>
                  <td>{o.status}</td>
                  <td className="space-x-2 whitespace-nowrap">
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
      </AdminTableShell>
    </div>
  );
}
