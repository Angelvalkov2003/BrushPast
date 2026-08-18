"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ImageUploadButton } from "./image-upload-button";
import {
  AdminProductVariantsEditor,
  initialVariantsFromProduct,
} from "./admin-product-variants-editor";
import {
  adminButtonClass,
  adminFormClass,
  adminGridClass,
  adminGrid2Class,
  adminInputClass,
  adminLabelClass,
  adminSelectClass,
  adminTextareaClass,
  adminTextareaLgClass,
} from "./admin-form-styles";
import type { AdminCategory, AdminOrganisation, AdminProduct, AdminProductVariantInput, AdminStory, AdminWorkshop, ContentStatus, InventoryType } from "lib/types/admin";
import { boxCategoriesFromAdmin } from "lib/shop-box-config";

type Props = {
  product?: AdminProduct | null;
  categories: AdminCategory[];
  stories: AdminStory[];
  workshops: AdminWorkshop[];
  organisations: AdminOrganisation[];
  createAction: (formData: FormData) => Promise<{ error?: string }>;
  updateAction?: (formData: FormData) => Promise<{ error?: string }>;
};

const STATUSES: ContentStatus[] = ["draft", "active", "hidden", "archived"];
const INVENTORY_TYPES: InventoryType[] = ["single", "limited", "unlimited"];

export function AdminProductForm({
  product,
  categories,
  stories,
  workshops,
  organisations,
  createAction,
  updateAction,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState(product?.main_image_url ?? "");
  const [gallery, setGallery] = useState<string[]>(
    product?.images?.map((i) => i.image_url ?? "").filter(Boolean) ?? [],
  );
  const boxCategories = boxCategoriesFromAdmin(categories);
  const [categoryId, setCategoryId] = useState(() => {
    const ids = product?.category_ids ?? [];
    return ids.find((id) => boxCategories.some((item) => item.id === id)) ?? "";
  });
  const [storyIds, setStoryIds] = useState<string[]>(product?.story_ids ?? []);
  const [organisationIds, setOrganisationIds] = useState<string[]>(
    product?.organisation_ids ?? [],
  );
  const [workshopId, setWorkshopId] = useState(product?.workshop_id ?? "");
  const [variants, setVariants] = useState<AdminProductVariantInput[]>(() =>
    initialVariantsFromProduct(product?.variants),
  );

  const adminBoxCategories = ["tshirt", "coffee", "print"].flatMap((key) =>
    boxCategories.filter((item) => item.key === key),
  );

  const toggleStory = (id: string) => {
    setStoryIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const toggleOrganisation = (id: string) => {
    setOrganisationIds((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id],
    );
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryId) {
      toast.error("Choose one category: T-Shirt, Coffee or Print.");
      return;
    }

    const form = e.currentTarget;
    setLoading(true);

    try {
      const fd = new FormData(form);
      fd.set("main_image_url", mainImage);
      fd.set("category_id", categoryId);
      fd.set("story_ids", JSON.stringify(storyIds));
      fd.set("organisation_ids", JSON.stringify(organisationIds));
      fd.set("workshop_id", workshopId);
      fd.set("gallery_urls", JSON.stringify(gallery));
      fd.set("variants", JSON.stringify(variants));

      const result = product && updateAction ? await updateAction(fd) : await createAction(fd);
      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success(product ? "Product updated" : "Product created");
      router.replace("/admin/products");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className={adminFormClass}>
      <div className={adminGridClass}>
        <div>
          <label className={adminLabelClass}>Title *</label>
          <input name="title" required defaultValue={product?.title ?? ""} className={adminInputClass} />
        </div>
        <div>
          <label className={adminLabelClass}>Slug</label>
          <input name="slug" defaultValue={product?.slug ?? ""} className={adminInputClass} />
        </div>
        <div>
          <label className={adminLabelClass}>Price (GBP) *</label>
          <input name="price_gbp" type="number" step="0.01" min="0" required defaultValue={product?.price_gbp ?? ""} className={adminInputClass} />
        </div>
        <div>
          <label className={adminLabelClass}>Sort order</label>
          <input name="sort_order" type="number" defaultValue={product?.sort_order ?? 0} className={adminInputClass} />
        </div>
        <div>
          <label className={adminLabelClass}>Status</label>
          <select name="status" defaultValue={product?.status ?? "draft"} className={adminSelectClass}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={adminLabelClass}>Inventory</label>
          <select name="inventory_type" defaultValue={product?.inventory_type ?? "unlimited"} className={adminSelectClass}>
            {INVENTORY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={adminLabelClass}>Stock qty</label>
          <input name="inventory_quantity" type="number" min="0" defaultValue={product?.inventory_quantity ?? ""} className={adminInputClass} />
        </div>
      </div>

      <div>
        <label className={`${adminLabelClass} mb-3`}>Category *</label>
        <p className="mb-3 text-sm text-gray-600">
          Each product belongs to one collection: T-Shirt, Coffee or Print.
        </p>
        {adminBoxCategories.length === 0 ? (
          <p className="text-sm text-red-700">
            The T-Shirt, Coffee and Print categories are missing. Add them under
            Categories first.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {adminBoxCategories.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
              >
                <input
                  type="radio"
                  name="category_id"
                  value={item.id}
                  checked={categoryId === item.id}
                  onChange={() => setCategoryId(item.id)}
                  required
                />
                {item.label}
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className={adminLabelClass}>Short description</label>
        <textarea name="short_description" rows={3} defaultValue={product?.short_description ?? ""} className={adminTextareaClass} />
      </div>
      <div>
        <label className={adminLabelClass}>Full description</label>
        <textarea name="full_description" rows={8} defaultValue={product?.full_description ?? ""} className={adminTextareaLgClass} />
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900">Details (product page)</h2>
        <p className="mt-1 text-sm text-gray-600">
          Optional specs shown under &ldquo;Details&rdquo; on the shop product page. Leave blank to
          hide each row.
        </p>
        <div className={`${adminGridClass} mt-5`}>
          <div>
            <label className={adminLabelClass}>Story number</label>
            <input
              name="story_number"
              placeholder="e.g. BP-003"
              defaultValue={product?.story_number ?? ""}
              className={adminInputClass}
            />
          </div>
          <div>
            <label className={adminLabelClass}>Product type</label>
            <input
              name="product_type"
              placeholder="e.g. t-shirt, print, gift-box"
              defaultValue={product?.product_type ?? ""}
              className={adminInputClass}
            />
          </div>
          <div>
            <label className={adminLabelClass}>Medium</label>
            <input
              name="medium"
              placeholder="e.g. cotton, mixed media"
              defaultValue={product?.medium ?? ""}
              className={adminInputClass}
            />
          </div>
          <div>
            <label className={adminLabelClass}>Edition number</label>
            <input
              name="edition_number"
              placeholder="e.g. 12"
              defaultValue={product?.edition_number ?? ""}
              className={adminInputClass}
            />
          </div>
          <div>
            <label className={adminLabelClass}>Total edition size</label>
            <input
              name="total_edition_size"
              placeholder="e.g. 50"
              defaultValue={product?.total_edition_size ?? ""}
              className={adminInputClass}
            />
          </div>
          <div>
            <label className={adminLabelClass}>Weight</label>
            <input
              name="weight"
              placeholder="e.g. 220g"
              defaultValue={product?.weight ?? ""}
              className={adminInputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass}>Dimensions</label>
            <input
              name="dimensions"
              placeholder="e.g. 30×40cm, Size M"
              defaultValue={product?.dimensions ?? ""}
              className={adminInputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass}>Story link (QR / URL)</label>
            <input
              name="qr_story_url"
              type="url"
              placeholder="https://brushpast.org/stories/..."
              defaultValue={product?.qr_story_url ?? ""}
              className={adminInputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass}>Profit share note</label>
            <textarea
              name="profit_share_note"
              rows={2}
              placeholder="Shown in Your impact section"
              defaultValue={product?.profit_share_note ?? ""}
              className={adminTextareaClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabelClass}>Impact note</label>
            <textarea
              name="impact_note"
              rows={2}
              placeholder="Shown in Your impact section"
              defaultValue={product?.impact_note ?? ""}
              className={adminTextareaClass}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900">Connections (product page)</h2>
        <p className="mt-1 text-sm text-gray-600">
          Link this product to a story, workshop, or partner organisation. Cards appear on the
          public product page.
        </p>

        <div className="mt-5">
          <label className={adminLabelClass}>Linked stories</label>
          <div className="mt-2 flex max-h-48 flex-wrap gap-2 overflow-y-auto">
            {stories.length === 0 ? (
              <p className="text-sm text-gray-500">No stories in admin yet.</p>
            ) : (
              stories.map((s) => (
                <label
                  key={s.id}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={storyIds.includes(s.id)}
                    onChange={() => toggleStory(s.id)}
                  />
                  {s.title || s.slug}
                </label>
              ))
            )}
          </div>
        </div>

        <div className="mt-5">
          <label className={adminLabelClass}>Workshop</label>
          <select
            value={workshopId}
            onChange={(e) => setWorkshopId(e.target.value)}
            className={adminSelectClass}
          >
            <option value="">None</option>
            {workshops.map((w) => (
              <option key={w.id} value={w.id}>
                {w.title || w.slug}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <label className={adminLabelClass}>Partner organisations</label>
          <div className="mt-2 flex max-h-48 flex-wrap gap-2 overflow-y-auto">
            {organisations.length === 0 ? (
              <p className="text-sm text-gray-500">No organisations in admin yet.</p>
            ) : (
              organisations.map((o) => (
                <label
                  key={o.id}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={organisationIds.includes(o.id)}
                    onChange={() => toggleOrganisation(o.id)}
                  />
                  {o.name || o.slug}
                </label>
              ))
            )}
          </div>
        </div>
      </div>

      <div className={adminGrid2Class}>
        <div>
          <label className={adminLabelClass}>Main image</label>
          {mainImage ? <img src={mainImage} alt="" className="mt-3 h-32 w-32 rounded-lg object-cover" /> : null}
          <div className="mt-3">
            <ImageUploadButton onUploadComplete={(url) => setMainImage(url)} label="Upload main image" />
          </div>
        </div>
        <div>
          <label className={adminLabelClass}>Gallery</label>
          <div className="mt-3 flex flex-wrap gap-3">
            {gallery.map((url, i) => (
              <div key={url + i} className="relative">
                <img src={url} alt="" className="h-24 w-24 rounded-lg object-cover" />
                <button type="button" className="absolute -right-1 -top-1 rounded-full bg-red-600 px-1.5 text-xs text-white" onClick={() => setGallery((g) => g.filter((_, j) => j !== i))}>×</button>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <ImageUploadButton onUploadComplete={(url) => setGallery((g) => [...g, url])} label="Add gallery image" />
          </div>
        </div>
      </div>

      <AdminProductVariantsEditor variants={variants} onChange={setVariants} />

      <button type="submit" disabled={loading} className={adminButtonClass}>
        {loading ? "Saving…" : product ? "Update product" : "Create product"}
      </button>
    </form>
  );
}
