import { notFound } from "next/navigation";
import { getAllCreatorsAdmin } from "lib/supabase/admin-creators";
import { getAllOrganisationsAdmin } from "lib/supabase/admin-organisations";
import { getStoryById } from "lib/supabase/admin-stories";
import { AdminStoryForm } from "components/admin/admin-story-form";
import { createStoryAction, updateStoryAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditStoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [story, creators, organisations] = await Promise.all([
    getStoryById(id),
    getAllCreatorsAdmin(),
    getAllOrganisationsAdmin(),
  ]);
  if (!story) notFound();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit story</h1>
      <AdminStoryForm
        story={story}
        creators={creators}
        organisations={organisations}
        createAction={createStoryAction}
        updateAction={updateStoryAction}
      />
    </div>
  );
}
