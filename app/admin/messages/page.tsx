import { getAllCustomerMessages } from "lib/supabase/admin-messages";
import { DeleteMessageButton } from "components/admin/delete-message-button";
import { CONTACT_SOURCE } from "lib/contact-config";
import { adminPageTitleClass } from "components/admin/admin-form-styles";

export const dynamic = "force-dynamic";

function sourceLabel(source: string | null) {
  if (source === CONTACT_SOURCE) return "Get in Touch";
  if (source === "contact") return "Contact";
  return source || "Unknown";
}

function sourceBadgeClass(source: string | null) {
  if (source === CONTACT_SOURCE) return "bg-bp-accent/15 text-bp-accent";
  return "bg-gray-100 text-gray-600";
}

export default async function AdminMessagesPage() {
  const messages = await getAllCustomerMessages();
  const getInTouch = messages.filter((m) => m.source_form === CONTACT_SOURCE);

  return (
    <div>
      <h1 className={adminPageTitleClass}>Messages</h1>
      <p className="mb-4 text-sm text-gray-500 sm:mb-6">
        {messages.length} total · {getInTouch.length} from Get in Touch
      </p>
      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="rounded-lg bg-white p-4 shadow sm:p-6">
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{m.customer_info || "Unknown"}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <span
                      className={`rounded px-2 py-0.5 font-semibold uppercase tracking-wide ${sourceBadgeClass(m.source_form)}`}
                    >
                      {sourceLabel(m.source_form)}
                    </span>
                    <span>{new Date(m.created_at).toLocaleString("en-GB")}</span>
                  </p>
                </div>
                <DeleteMessageButton messageId={m.id} />
              </div>
              <p className="whitespace-pre-line text-sm text-gray-800">{m.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
