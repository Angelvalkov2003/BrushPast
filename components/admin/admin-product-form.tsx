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
import type { AdminCategory, AdminProduct, AdminProductVariantInput, ContentStatus, InventoryType } from "lib/types/admin";

type Props = {
  product?: AdminProduct | null;
  categories: AdminCategory[];
  createAction: (formData: FormData) => Promise<{ error?: string }>;
  updateAction?: (formData: FormData) => Promise<{ error?: string }>;
};

const STATUSES: ContentStatus[] = ["draft", "active", "hidden", "archived"];
const INVENTORY_TYPES: InventoryType[] = ["single", "limited", "unlimited"];

export function AdminProductForm({ product, categories, createAction, updateAction }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState(product?.main_image_url ?? "");
  const [gallery, setGallery] = useState<string[]>(
    product?.images?.map((i) => i.image_url ?? "").filter(Boolean) ?? [],
  );
  const [categoryIds, setCategoryIds] = useState<string[]>(product?.category_ids ?? []);
  const [variants, setVariants] = useState<AdminProductVariantInput[]>(() =>
    initialVariantsFromProduct(product?.variants),
  );

  const toggleCategory = (id: string) => {
    setCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    fd.set("main_image_url", mainImage);
    fd.set("category_ids", JSON.stringify(categoryIds));
    fd.set("gallery_urls", JSON.stringify(gallery));
    fd.set("variants", JSON.stringify(variants));

    const result = product && updateAction ? await updateAction(fd) : await createAction(fd);
    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }
    toast.success(product ? "Product updated" : "Product created");
    router.push("/admin/products");
    router.refresh();
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
        <label className={adminLabelClass}>Short description</label>
        <textarea name="short_description" rows={3} defaultValue={product?.short_description ?? ""} className={adminTextareaClass} />
      </div>
      <div>
        <label className={adminLabelClass}>Full description</label>
        <textarea name="full_description" rows={8} defaultValue={product?.full_description ?? ""} className={adminTextareaLgClass} />
      </div>

      <div>
        <label className={`${adminLabelClass} mb-3`}>Categories</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <label key={c.id} className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm">
              <input type="checkbox" checked={categoryIds.includes(c.id)} onChange={() => toggleCategory(c.id)} />
              {c.name || c.slug}
            </label>
          ))}
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
