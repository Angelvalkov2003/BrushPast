import { notFound } from "next/navigation";
import { getOrganisationById } from "lib/supabase/admin-organisations";
import { AdminOrganisationForm } from "components/admin/admin-organisation-form";
import { createOrganisationAction, updateOrganisationAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditOrganisationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const organisation = await getOrganisationById(id);
  if (!organisation) notFound();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit organisation</h1>
      <AdminOrganisationForm
        organisation={organisation}
        createAction={createOrganisationAction}
        updateAction={updateOrganisationAction}
      />
    </div>
  );
}
