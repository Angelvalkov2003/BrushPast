import { getAllOrganisationsAdmin } from "lib/supabase/admin-organisations";
import { AdminStoryForm } from "components/admin/admin-story-form";
import { createStoryAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewStoryPage() {
  const organisations = await getAllOrganisationsAdmin();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">New story</h1>
      <AdminStoryForm organisations={organisations} createAction={createStoryAction} />
    </div>
  );
}
