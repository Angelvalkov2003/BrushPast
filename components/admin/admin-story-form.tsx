"use client";

import { useEffect, useState } from "react";
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
import type { AdminOrganisation, AdminStory } from "lib/types/admin";
import { STORY_TAG_OPTIONS } from "lib/stories-config";

type Props = {
  story?: AdminStory | null;
  organisations: AdminOrganisation[];
  createAction: (fd: FormData) => Promise<{ error?: string }>;
  updateAction?: (fd: FormData) => Promise<{ error?: string }>;
};

export function AdminStoryForm({
  story,
  organisations,
  createAction,
  updateAction,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(story?.image_url ?? "");

  useEffect(() => {
    setImageUrl(story?.image_url ?? "");
  }, [story?.image_url]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    if (story?.id) fd.set("id", story.id);
    fd.set("image_url", imageUrl);
    const result = story && updateAction ? await updateAction(fd) : await createAction(fd);
    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }
    toast.success(story ? "Story updated" : "Story created");
    if (story) {
      router.refresh();
      setLoading(false);
      return;
    }
    router.push("/admin/stories");
    router.refresh();
  };

  return (
    <form onSubmit={submit} className={adminFormClass}>
      <div className={adminGrid2Class}>
        <div>
          <label className={adminLabelClass}>Title</label>
          <input name="title" defaultValue={story?.title ?? ""} className={adminInputClass} />
        </div>
        <div>
          <label className={adminLabelClass}>Slug</label>
          <input name="slug" defaultValue={story?.slug ?? ""} className={adminInputClass} />
          <p className={adminHelpClass}>Used for filters and fallback routing only</p>
        </div>
      </div>
      <div>
        <label className={adminLabelClass}>Page URL</label>
        <input
          name="page_url"
          defaultValue={story?.page_url ?? ""}
          placeholder="/stories/the-roundabout-meeting"
          className={adminInputClass}
        />
        <p className={adminHelpClass}>
          Path to your hand-built page in <code className="text-xs">app/stories/…/page.tsx</code>. Listing
          cards link here.
        </p>
      </div>
      <div>
        <label className={adminLabelClass}>Quote / short description</label>
        <textarea
          name="short_description"
          rows={4}
          placeholder="Shown on /stories grid card"
          defaultValue={story?.short_description ?? ""}
          className={adminTextareaClass}
        />
      </div>
      <div>
        <label className={`${adminLabelClass} mb-3`}>Tags (filters on /stories)</label>
        <div className="flex flex-wrap gap-2">
          {STORY_TAG_OPTIONS.map((tag) => (
            <label key={tag} className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm capitalize">
              <input
                type="checkbox"
                name="tags"
                value={tag}
                defaultChecked={story?.tags?.includes(tag)}
              />
              {tag}
            </label>
          ))}
        </div>
      </div>
      <div className={adminGrid2Class}>
        <div>
          <label className={adminLabelClass}>Organisation</label>
          <select
            name="organisation_id"
            defaultValue={story?.organisation_id ?? ""}
            className={adminSelectClass}
          >
            <option value="">- None -</option>
            {organisations.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name || o.slug || o.id}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="is_anonymous"
              defaultChecked={story?.is_anonymous}
            />
            Anonymous (hidden from public /stories listing)
          </label>
        </div>
      </div>
      <AdminImageField
        initialUrl={story?.image_url ?? ""}
        onChange={setImageUrl}
      />
      <div className={adminGrid2Class}>
        <AdminStatusFields status={story?.status} sortOrder={story?.sort_order} />
      </div>
      <button type="submit" disabled={loading} className={adminButtonClass}>
        {loading ? "Saving…" : story ? "Update" : "Create"}
      </button>
    </form>
  );
}
