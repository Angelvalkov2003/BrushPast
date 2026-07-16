import Link from "next/link";
import { getAllWorkshopsAdmin } from "lib/supabase/admin-workshops";
import { DeleteWorkshopButton } from "components/admin/delete-workshop-button";
import { AdminTableShell } from "components/admin/admin-table-shell";
import { adminPageHeaderClass, adminPrimaryLinkClass } from "components/admin/admin-form-styles";

export const dynamic = "force-dynamic";

export default async function AdminWorkshopsPage() {
  const items = await getAllWorkshopsAdmin();
  return (
    <div>
      <div className={adminPageHeaderClass}>
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Workshops</h1>
        <Link href="/admin/workshops/new" className={adminPrimaryLinkClass}>
          New workshop
        </Link>
      </div>
      <AdminTableShell>
        <table className="admin-data-table min-w-full">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No workshops yet.
                </td>
              </tr>
            ) : (
              items.map((w) => (
                <tr key={w.id}>
                  <td className="font-medium">{w.title || "-"}</td>
                  <td className="text-gray-500">{w.slug || "-"}</td>
                  <td className="text-gray-500">{w.location_label || "-"}</td>
                  <td>{w.status}</td>
                  <td className="space-x-2 whitespace-nowrap">
                    <Link href={`/admin/workshops/${w.id}`} className="text-indigo-600 hover:underline">
                      Edit
                    </Link>
                    <DeleteWorkshopButton id={w.id} title={w.title ?? undefined} />
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
