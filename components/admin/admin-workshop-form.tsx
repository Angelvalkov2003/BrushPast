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
  adminSelectClass,
  adminTextareaClass,
} from "./admin-form-styles";
import type { AdminOrganisation, AdminWorkshop } from "lib/types/admin";
import { WORKSHOP_CATEGORIES } from "lib/workshops-config";

type Props = {
  workshop?: AdminWorkshop | null;
  organisations: AdminOrganisation[];
  createAction: (fd: FormData) => Promise<{ error?: string }>;
  updateAction?: (fd: FormData) => Promise<{ error?: string }>;
};

export function AdminWorkshopForm({
  workshop,
  organisations,
  createAction,
  updateAction,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(workshop?.image_url ?? "");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    if (workshop?.id) fd.set("id", workshop.id);
    fd.set("image_url", imageUrl);
    const result = workshop && updateAction ? await updateAction(fd) : await createAction(fd);
    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }
    toast.success(workshop ? "Workshop updated" : "Workshop created");
    router.push("/admin/workshops");
    router.refresh();
  };

  return (
    <form onSubmit={submit} className={adminFormClass}>
      <div className={adminGrid2Class}>
        <div>
          <label className={adminLabelClass}>Title</label>
          <input name="title" defaultValue={workshop?.title ?? ""} className={adminInputClass} />
        </div>
        <div>
          <label className={adminLabelClass}>Slug</label>
          <input name="slug" defaultValue={workshop?.slug ?? ""} className={adminInputClass} />
        </div>
      </div>
      <div className={adminGrid2Class}>
        <div>
          <label className={adminLabelClass}>Location</label>
          <input
            name="location_label"
            defaultValue={workshop?.location_label ?? ""}
            className={adminInputClass}
            placeholder="e.g. Peckham, London"
          />
        </div>
        <div>
          <label className={adminLabelClass}>Category</label>
          <select
            name="workshop_category"
            defaultValue={workshop?.workshop_category ?? ""}
            className={adminSelectClass}
          >
            <option value="">—</option>
            {WORKSHOP_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={adminLabelClass}>Short description</label>
        <textarea
          name="short_description"
          rows={4}
          defaultValue={workshop?.short_description ?? ""}
          className={adminTextareaClass}
        />
      </div>
      <div>
        <label className={adminLabelClass}>Page URL</label>
        <input
          name="page_url"
          defaultValue={workshop?.page_url ?? ""}
          className={adminInputClass}
          placeholder="/workshops/workshop-no-1"
        />
        <p className={adminHelpClass}>Link to the hand-coded workshop page in the app</p>
      </div>
      <div>
        <label className={adminLabelClass}>Organisation</label>
        <select
          name="organisation_id"
          defaultValue={workshop?.organisation_id ?? ""}
          className={adminSelectClass}
        >
          <option value="">—</option>
          {organisations.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name || o.slug || o.id}
            </option>
          ))}
        </select>
      </div>
      <AdminImageField initialUrl={workshop?.image_url ?? ""} onChange={setImageUrl} />
      <div className={adminGrid2Class}>
        <AdminStatusFields status={workshop?.status} sortOrder={workshop?.sort_order} />
      </div>
      <button type="submit" disabled={loading} className={adminButtonClass}>
        {loading ? "Saving…" : workshop ? "Update" : "Create"}
      </button>
    </form>
  );
}
