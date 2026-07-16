import { notFound } from "next/navigation";
import { AdminWorkshopForm } from "components/admin/admin-workshop-form";
import { getAllOrganisationsAdmin } from "lib/supabase/admin-organisations";
import { getWorkshopById } from "lib/supabase/admin-workshops";
import { createWorkshopAction, updateWorkshopAction } from "../actions";

export default async function EditWorkshopPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [workshop, organisations] = await Promise.all([
    getWorkshopById(id),
    getAllOrganisationsAdmin(),
  ]);
  if (!workshop) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit workshop</h1>
      <AdminWorkshopForm
        workshop={workshop}
        organisations={organisations}
        createAction={createWorkshopAction}
        updateAction={updateWorkshopAction}
      />
    </div>
  );
}
