import { AdminOrganisationForm } from "components/admin/admin-organisation-form";
import { createOrganisationAction } from "../actions";

export default function NewOrganisationPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">New organisation</h1>
      <AdminOrganisationForm createAction={createOrganisationAction} />
    </div>
  );
}
