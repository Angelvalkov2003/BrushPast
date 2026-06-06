import { notFound } from "next/navigation";
import { getCreatorById } from "lib/supabase/admin-creators";
import { AdminCreatorForm } from "components/admin/admin-creator-form";
import { createCreatorAction, updateCreatorAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditCreatorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const creator = await getCreatorById(id);
  if (!creator) notFound();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit creator</h1>
      <AdminCreatorForm
        creator={creator}
        createAction={createCreatorAction}
        updateAction={updateCreatorAction}
      />
    </div>
  );
}
