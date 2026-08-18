import { getAllSponsorsAdmin, getSponsorAdminStats } from "lib/supabase/sponsors";
import { AdminTableShell } from "components/admin/admin-table-shell";
import { adminPageTitleClass } from "components/admin/admin-form-styles";
import { DeleteSponsorButton } from "components/admin/delete-sponsor-button";
import { formatSponsorAmount, sponsorTierLabel } from "lib/sponsor-config";
import { formatPrice } from "lib/currency";

export const dynamic = "force-dynamic";

function statusClass(status: string) {
  if (status === "paid") return "bg-green-100 text-green-800";
  if (status === "pending") return "bg-amber-100 text-amber-800";
  if (status === "failed" || status === "refunded") return "bg-red-100 text-red-800";
  return "bg-gray-100 text-gray-700";
}

export default async function AdminSponsorsPage() {
  const [sponsors, stats] = await Promise.all([
    getAllSponsorsAdmin(),
    getSponsorAdminStats(),
  ]);

  return (
    <div>
      <h1 className={adminPageTitleClass}>Sponsors</h1>
      <p className="mb-4 text-sm text-gray-500 sm:mb-6">
        {stats.paid} paid · {stats.pending} pending ·{" "}
        {formatPrice(stats.paidTotalGbp)} received
      </p>

      <AdminTableShell>
        <table className="admin-data-table min-w-full">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th>Sponsor</th>
              <th>Amount</th>
              <th>Tier</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sponsors.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No sponsors yet.
                </td>
              </tr>
            ) : (
              sponsors.map((sponsor) => (
                <tr key={sponsor.id}>
                  <td>
                    <p className="font-medium">{sponsor.full_name || "—"}</p>
                    {sponsor.email ? (
                      <a
                        href={`mailto:${sponsor.email}`}
                        className="text-xs text-indigo-600 hover:underline"
                      >
                        {sponsor.email}
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">No email</span>
                    )}
                  </td>
                  <td className="font-medium">
                    {formatSponsorAmount(Number(sponsor.amount_gbp))}
                  </td>
                  <td>{sponsorTierLabel(sponsor.tier)}</td>
                  <td>
                    <span
                      className={`rounded px-2 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass(sponsor.payment_status)}`}
                    >
                      {sponsor.payment_status}
                    </span>
                  </td>
                  <td className="text-gray-500">
                    {new Date(sponsor.created_at).toLocaleString("en-GB")}
                  </td>
                  <td>
                    {sponsor.payment_status === "pending" ? (
                      <DeleteSponsorButton sponsorId={sponsor.id} />
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
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
