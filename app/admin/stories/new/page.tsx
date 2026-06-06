import { getAllCreatorsAdmin } from "lib/supabase/admin-creators";
import { getAllOrganisationsAdmin } from "lib/supabase/admin-organisations";
import { AdminStoryForm } from "components/admin/admin-story-form";
import { createStoryAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewStoryPage() {
  const [creators, organisations] = await Promise.all([
    getAllCreatorsAdmin(),
    getAllOrganisationsAdmin(),
  ]);
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">New story</h1>
      <AdminStoryForm
        creators={creators}
        organisations={organisations}
        createAction={createStoryAction}
      />
    </div>
  );
}
