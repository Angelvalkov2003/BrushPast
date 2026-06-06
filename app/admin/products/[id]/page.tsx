import { notFound } from "next/navigation";
import { getProductByIdAdmin } from "lib/supabase/admin-products";
import { getAllCategoriesAdmin } from "lib/supabase/admin-categories";
import { AdminProductForm } from "components/admin/admin-product-form";
import { createProductAction, updateProductAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductByIdAdmin(id),
    getAllCategoriesAdmin(),
  ]);

  if (!product) notFound();

  async function updateWithId(fd: FormData) {
    "use server";
    fd.set("id", id);
    return updateProductAction(fd);
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit product</h1>
      <AdminProductForm
        product={product}
        categories={categories}
        createAction={createProductAction}
        updateAction={updateWithId}
      />
    </div>
  );
}
