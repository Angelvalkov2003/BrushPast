"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminImageField } from "./admin-image-field";
import { ImageUploadButton } from "./image-upload-button";
import {
  adminButtonClass,
  adminFormClass,
  adminGrid2Class,
  adminHelpClass,
  adminInputClass,
  adminLabelClass,
  adminSelectClass,
  adminTextareaClass,
  adminTextareaLgClass,
} from "./admin-form-styles";
import type { AdminJournalPost, ContentStatus } from "lib/types/admin";

type Props = {
  post?: AdminJournalPost | null;
  createAction: (fd: FormData) => Promise<{ error?: string }>;
  updateAction?: (fd: FormData) => Promise<{ error?: string }>;
};

const STATUSES: ContentStatus[] = ["draft", "active", "hidden", "archived"];

export function AdminJournalForm({ post, createAction, updateAction }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState(post?.main_image_url ?? "");
  const [gallery, setGallery] = useState<string[]>(
    post?.images
      ?.slice()
      .sort((a, b) => b.sort_order - a.sort_order)
      .map((img) => img.image_url ?? "")
      .filter(Boolean) ?? [],
  );

  useEffect(() => {
    setMainImage(post?.main_image_url ?? "");
    setGallery(
      post?.images
        ?.slice()
        .sort((a, b) => b.sort_order - a.sort_order)
        .map((img) => img.image_url ?? "")
        .filter(Boolean) ?? [],
    );
  }, [post?.main_image_url, post?.images]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    if (post?.id) fd.set("id", post.id);
    fd.set("main_image_url", mainImage);
    fd.set("gallery_urls", JSON.stringify(gallery));

    const result = post && updateAction ? await updateAction(fd) : await createAction(fd);
    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    toast.success(post ? "Journal post updated" : "Journal post created");
    if (post) {
      router.refresh();
      setLoading(false);
      return;
    }
    router.push("/admin/journal");
    router.refresh();
  };

  return (
    <form onSubmit={submit} className={adminFormClass}>
      <div className={adminGrid2Class}>
        <div>
          <label className={adminLabelClass}>Title *</label>
          <input name="title" required defaultValue={post?.title ?? ""} className={adminInputClass} />
        </div>
        <div>
          <label className={adminLabelClass}>Slug</label>
          <input name="slug" defaultValue={post?.slug ?? ""} className={adminInputClass} />
          <p className={adminHelpClass}>URL: /journal/your-slug</p>
        </div>
      </div>

      <div className={adminGrid2Class}>
        <div>
          <label className={adminLabelClass}>Sort order</label>
          <input
            name="sort_order"
            type="number"
            defaultValue={post?.sort_order ?? 0}
            className={adminInputClass}
          />
          <p className={adminHelpClass}>Higher number appears first on the Journal page</p>
        </div>
        <div>
          <label className={adminLabelClass}>Status</label>
          <select name="status" defaultValue={post?.status ?? "draft"} className={adminSelectClass}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={adminLabelClass}>Description</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={post?.description ?? ""}
          className={adminTextareaClass}
        />
        <p className={adminHelpClass}>Short summary shown on the listing card and under the title</p>
      </div>

      <AdminImageField
        label="Main image"
        name="main_image_url"
        initialUrl={mainImage}
        onChange={setMainImage}
      />

      <div>
        <label className={adminLabelClass}>Body text</label>
        <textarea name="body" rows={14} defaultValue={post?.body ?? ""} className={adminTextareaLgClass} />
        <p className={adminHelpClass}>Use blank lines between paragraphs</p>
      </div>

      <div>
        <label className={adminLabelClass}>Gallery images (below text)</label>
        <div className="mt-3 flex flex-wrap gap-3">
          {gallery.map((url, i) => (
            <div key={url + i} className="relative">
              <img src={url} alt="" className="h-24 w-24 rounded-lg object-cover" />
              <button
                type="button"
                className="absolute -right-1 -top-1 rounded-full bg-red-600 px-1.5 text-xs text-white"
                onClick={() => setGallery((g) => g.filter((_, j) => j !== i))}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <ImageUploadButton
            onUploadComplete={(url) => setGallery((g) => [...g, url])}
            label="Add gallery image"
          />
        </div>
      </div>

      <button type="submit" disabled={loading} className={adminButtonClass}>
        {loading ? "Saving…" : post ? "Update post" : "Create post"}
      </button>
    </form>
  );
}
