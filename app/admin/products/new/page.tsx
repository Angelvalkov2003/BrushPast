import { getAllCategoriesAdmin } from "lib/supabase/admin-categories";
import { AdminProductForm } from "components/admin/admin-product-form";
import { createProductAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await getAllCategoriesAdmin();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">New product</h1>
      <AdminProductForm categories={categories} createAction={createProductAction} />
    </div>
  );
}
