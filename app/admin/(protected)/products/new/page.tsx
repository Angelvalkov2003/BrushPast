import { getAllCategoriesAdmin } from "lib/supabase/admin-categories";
import { getAllOrganisationsAdmin } from "lib/supabase/admin-organisations";
import { getAllStoriesAdmin } from "lib/supabase/admin-stories";
import { getAllWorkshopsAdmin } from "lib/supabase/admin-workshops";
import { AdminProductForm } from "components/admin/admin-product-form";
import { createProductAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const [categories, stories, workshops, organisations] = await Promise.all([
    getAllCategoriesAdmin(),
    getAllStoriesAdmin(),
    getAllWorkshopsAdmin(),
    getAllOrganisationsAdmin(),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">New product</h1>
      <AdminProductForm
        categories={categories}
        stories={stories}
        workshops={workshops}
        organisations={organisations}
        createAction={createProductAction}
      />
    </div>
  );
}
