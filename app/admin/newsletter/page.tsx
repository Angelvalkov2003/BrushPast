import { getAllNewsletterSubscribers } from "lib/supabase/admin-newsletter";
import { DeleteNewsletterSubscriberButton } from "components/admin/delete-newsletter-subscriber-button";
import { AdminTableShell } from "components/admin/admin-table-shell";
import { adminPageTitleClass } from "components/admin/admin-form-styles";
import {
  NEWSLETTER_SOURCE_ABOUT,
  NEWSLETTER_SOURCE_HOME,
  NEWSLETTER_SOURCE_LABELS,
} from "lib/newsletter-config";

export const dynamic = "force-dynamic";

function sourceLabel(source: string) {
  return NEWSLETTER_SOURCE_LABELS[source] ?? source;
}

export default async function AdminNewsletterPage() {
  const subscribers = await getAllNewsletterSubscribers();
  const homeCount = subscribers.filter((s) => s.source === NEWSLETTER_SOURCE_HOME).length;
  const aboutCount = subscribers.filter((s) => s.source === NEWSLETTER_SOURCE_ABOUT).length;

  return (
    <div>
      <h1 className={adminPageTitleClass}>Newsletter</h1>
      <p className="mb-4 text-sm text-gray-500 sm:mb-6">
        {subscribers.length} subscribers · {homeCount} from Join the story · {aboutCount} from Stay
        in the loop
      </p>

      <AdminTableShell>
        <table className="admin-data-table min-w-full">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th>Email</th>
              <th>Source</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No subscribers yet.
                </td>
              </tr>
            ) : (
              subscribers.map((s) => (
                <tr key={s.id}>
                  <td className="font-medium">
                    <a href={`mailto:${s.email}`} className="text-indigo-600 hover:underline">
                      {s.email}
                    </a>
                  </td>
                  <td>
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700">
                      {sourceLabel(s.source)}
                    </span>
                  </td>
                  <td className="text-gray-500">
                    {new Date(s.created_at).toLocaleString("en-GB")}
                  </td>
                  <td>
                    <DeleteNewsletterSubscriberButton subscriberId={s.id} />
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
