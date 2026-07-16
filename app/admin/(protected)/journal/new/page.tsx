import { AdminJournalForm } from "components/admin/admin-journal-form";
import { createJournalPostAction } from "../actions";

export const dynamic = "force-dynamic";

export default function NewJournalPostPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">New journal post</h1>
      <AdminJournalForm createAction={createJournalPostAction} />
    </div>
  );
}
