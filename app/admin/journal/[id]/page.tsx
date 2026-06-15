import { notFound } from "next/navigation";
import { AdminJournalForm } from "components/admin/admin-journal-form";
import { getJournalPostById } from "lib/supabase/admin-journal";
import { createJournalPostAction, updateJournalPostAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditJournalPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getJournalPostById(id);
  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit journal post</h1>
      <AdminJournalForm
        post={post}
        createAction={createJournalPostAction}
        updateAction={updateJournalPostAction}
      />
    </div>
  );
}
