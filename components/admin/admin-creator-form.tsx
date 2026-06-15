"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminImageField } from "./admin-image-field";
import { AdminStatusFields } from "./admin-status-fields";
import {
  adminButtonClass,
  adminFormClass,
  adminGrid2Class,
  adminHelpClass,
  adminInputClass,
  adminLabelClass,
  adminTextareaClass,
} from "./admin-form-styles";
import type { AdminCreator } from "lib/types/admin";
import { extractCreatorStorySlug } from "lib/creator-profile-url";
import { SITE_URL } from "lib/site-config";

type Props = {
  creator?: AdminCreator | null;
  createAction: (fd: FormData) => Promise<{ error?: string }>;
  updateAction?: (fd: FormData) => Promise<{ error?: string }>;
};

export function AdminCreatorForm({ creator, createAction, updateAction }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(creator?.image_url ?? "");
  const storySlug = extractCreatorStorySlug(creator?.profile_url);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    if (creator?.id) fd.set("id", creator.id);
    fd.set("image_url", imageUrl);
    const result = creator && updateAction ? await updateAction(fd) : await createAction(fd);
    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }
    toast.success(creator ? "Creator updated" : "Creator created");
    router.push("/admin/creators");
    router.refresh();
  };

  return (
    <form onSubmit={submit} className={adminFormClass}>
      <div className={adminGrid2Class}>
        <div>
          <label className={adminLabelClass}>Name</label>
          <input name="name" defaultValue={creator?.name ?? ""} className={adminInputClass} />
        </div>
        <div>
          <label className={adminLabelClass}>Story page</label>
          <div className="flex overflow-hidden rounded-md border border-gray-300 bg-white focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <span className="flex shrink-0 items-center border-r border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
              /stories/
            </span>
            <input
              name="profile_url"
              defaultValue={storySlug}
              placeholder="jamie"
              className="min-w-0 flex-1 border-0 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-0"
            />
          </div>
          <p className={adminHelpClass}>
            Enter only the story slug — saved as{" "}
            <code className="text-xs">
              {SITE_URL}/stories/{storySlug || "slug"}
            </code>
          </p>
        </div>
      </div>
      <div>
        <label className={adminLabelClass}>Short description</label>
        <textarea
          name="short_description"
          rows={5}
          defaultValue={creator?.short_description ?? ""}
          className={adminTextareaClass}
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" name="is_anonymous" defaultChecked={creator?.is_anonymous} />
        Anonymous on site (hidden from public)
      </label>
      <AdminImageField initialUrl={creator?.image_url ?? ""} onChange={setImageUrl} />
      <div className={adminGrid2Class}>
        <AdminStatusFields status={creator?.status} sortOrder={creator?.sort_order} />
      </div>
      <button type="submit" disabled={loading} className={adminButtonClass}>
        {loading ? "Saving…" : creator ? "Update" : "Create"}
      </button>
    </form>
  );
}
