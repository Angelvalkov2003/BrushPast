import { AdminCreatorForm } from "components/admin/admin-creator-form";
import { createCreatorAction } from "../actions";

export default function NewCreatorPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">New creator</h1>
      <AdminCreatorForm createAction={createCreatorAction} />
    </div>
  );
}
