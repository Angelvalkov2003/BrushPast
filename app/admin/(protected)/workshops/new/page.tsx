import { AdminWorkshopForm } from "components/admin/admin-workshop-form";
import { getAllOrganisationsAdmin } from "lib/supabase/admin-organisations";
import { createWorkshopAction } from "../actions";

export default async function NewWorkshopPage() {
  const organisations = await getAllOrganisationsAdmin();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">New workshop</h1>
      <AdminWorkshopForm organisations={organisations} createAction={createWorkshopAction} />
    </div>
  );
}
