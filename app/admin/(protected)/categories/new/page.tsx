import { AdminCategoryForm } from "components/admin/admin-category-form";
import { createCategoryAction } from "../actions";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">New category</h1>
      <AdminCategoryForm createAction={createCategoryAction} />
    </div>
  );
}
