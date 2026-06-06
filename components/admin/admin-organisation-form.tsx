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
import type { AdminOrganisation } from "lib/types/admin";

type Props = {
  organisation?: AdminOrganisation | null;
  createAction: (fd: FormData) => Promise<{ error?: string }>;
  updateAction?: (fd: FormData) => Promise<{ error?: string }>;
};

export function AdminOrganisationForm({ organisation, createAction, updateAction }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(organisation?.image_url ?? "");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    if (organisation?.id) fd.set("id", organisation.id);
    fd.set("image_url", imageUrl);
    const result =
      organisation && updateAction ? await updateAction(fd) : await createAction(fd);
    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }
    toast.success(organisation ? "Organisation updated" : "Organisation created");
    router.push("/admin/organisations");
    router.refresh();
  };

  return (
    <form onSubmit={submit} className={adminFormClass}>
      <div className={adminGrid2Class}>
        <div>
          <label className={adminLabelClass}>Name</label>
          <input name="name" defaultValue={organisation?.name ?? ""} className={adminInputClass} />
        </div>
        <div>
          <label className={adminLabelClass}>Slug (internal page)</label>
          <input name="slug" defaultValue={organisation?.slug ?? ""} className={adminInputClass} />
        </div>
      </div>
      <div>
        <label className={adminLabelClass}>Short description</label>
        <textarea
          name="short_description"
          rows={5}
          defaultValue={organisation?.short_description ?? ""}
          className={adminTextareaClass}
        />
      </div>
      <div>
        <label className={adminLabelClass}>External website</label>
        <input
          name="external_url"
          type="url"
          defaultValue={organisation?.external_url ?? ""}
          className={adminInputClass}
        />
      </div>
      <AdminImageField initialUrl={organisation?.image_url ?? ""} onChange={setImageUrl} />
      <div className={adminGrid2Class}>
        <AdminStatusFields status={organisation?.status} sortOrder={organisation?.sort_order} />
      </div>
      <button type="submit" disabled={loading} className={adminButtonClass}>
        {loading ? "Saving…" : organisation ? "Update" : "Create"}
      </button>
    </form>
  );
}
