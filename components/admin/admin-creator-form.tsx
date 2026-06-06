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
  adminInputClass,
  adminLabelClass,
  adminTextareaClass,
} from "./admin-form-styles";
import type { AdminCreator } from "lib/types/admin";

type Props = {
  creator?: AdminCreator | null;
  createAction: (fd: FormData) => Promise<{ error?: string }>;
  updateAction?: (fd: FormData) => Promise<{ error?: string }>;
};

export function AdminCreatorForm({ creator, createAction, updateAction }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(creator?.image_url ?? "");

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
          <label className={adminLabelClass}>Profile URL</label>
          <input
            name="profile_url"
            type="url"
            defaultValue={creator?.profile_url ?? ""}
            className={adminInputClass}
          />
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
