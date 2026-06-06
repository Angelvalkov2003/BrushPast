"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ImageUploadButton } from "./image-upload-button";
import {
  adminButtonClass,
  adminFormClass,
  adminGridClass,
  adminInputClass,
  adminLabelClass,
  adminSelectClass,
  adminTextareaClass,
} from "./admin-form-styles";
import type { AdminCategory, ContentStatus } from "lib/types/admin";

const STATUSES: ContentStatus[] = ["draft", "active", "hidden", "archived"];

type Props = {
  category?: AdminCategory | null;
  createAction: (fd: FormData) => Promise<{ error?: string }>;
  updateAction?: (fd: FormData) => Promise<{ error?: string }>;
};

export function AdminCategoryForm({ category, createAction, updateAction }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(category?.image_url ?? "");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    fd.set("image_url", imageUrl);
    if (category?.id) fd.set("id", category.id);

    const result = category && updateAction ? await updateAction(fd) : await createAction(fd);
    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }
    toast.success(category ? "Category updated" : "Category created");
    router.push("/admin/categories");
    router.refresh();
  };

  return (
    <form onSubmit={submit} className={adminFormClass}>
      <div className={adminGridClass}>
        <div>
          <label className={adminLabelClass}>Name</label>
          <input name="name" defaultValue={category?.name ?? ""} className={adminInputClass} />
        </div>
        <div>
          <label className={adminLabelClass}>Slug</label>
          <input name="slug" defaultValue={category?.slug ?? ""} className={adminInputClass} />
        </div>
        <div>
          <label className={adminLabelClass}>Sort order</label>
          <input
            name="sort_order"
            type="number"
            defaultValue={category?.sort_order ?? 0}
            className={adminInputClass}
          />
        </div>
        <div>
          <label className={adminLabelClass}>Status</label>
          <select name="status" defaultValue={category?.status ?? "draft"} className={adminSelectClass}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={adminLabelClass}>Shop description</label>
        <textarea
          name="short_description"
          rows={4}
          placeholder="e.g. Stories worn in public."
          defaultValue={category?.short_description ?? ""}
          className={adminTextareaClass}
        />
      </div>
      <div>
        <label className={adminLabelClass}>Shop CTA label</label>
        <input
          name="shop_cta"
          placeholder="e.g. Shop apparel"
          defaultValue={category?.shop_cta ?? ""}
          className={adminInputClass}
        />
      </div>
      <div>
        <label className={adminLabelClass}>Image</label>
        {imageUrl ? <img src={imageUrl} alt="" className="mt-3 h-32 w-32 rounded-lg object-cover" /> : null}
        <div className="mt-3">
          <ImageUploadButton onUploadComplete={setImageUrl} label="Upload image" />
        </div>
      </div>
      <button type="submit" disabled={loading} className={adminButtonClass}>
        {loading ? "Saving…" : category ? "Update" : "Create"}
      </button>
    </form>
  );
}
