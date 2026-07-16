import { notFound } from "next/navigation";
import { getCategoryById } from "lib/supabase/admin-categories";
import { AdminCategoryForm } from "components/admin/admin-category-form";
import { createCategoryAction, updateCategoryAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await getCategoryById(id);
  if (!category) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit category</h1>
      <AdminCategoryForm
        category={category}
        createAction={createCategoryAction}
        updateAction={updateCategoryAction}
      />
    </div>
  );
}
