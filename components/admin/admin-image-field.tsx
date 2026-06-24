"use client";

import { useEffect, useRef, useState } from "react";
import { isValidImageUrl } from "lib/image-url";
import { ImageUploadButton } from "./image-upload-button";
import { adminHelpClass, adminInputClass, adminLabelClass } from "./admin-form-styles";

type Props = {
  label?: string;
  initialUrl?: string;
  name?: string;
  /** Sync URL to parent for FormData (avoids React controlled hidden-input bug) */
  onChange?: (url: string) => void;
};

export function AdminImageField({
  label = "Image",
  initialUrl = "",
  name = "image_url",
  onChange,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState(initialUrl);
  const hiddenRef = useRef<HTMLInputElement>(null);

  const applyUrl = (next: string) => {
    setPreviewUrl(next);
    if (hiddenRef.current) hiddenRef.current.value = next;
    onChange?.(next);
  };

  useEffect(() => {
    applyUrl(initialUrl);
  }, [initialUrl]);

  return (
    <div>
      <label className={adminLabelClass}>{label}</label>
      {isValidImageUrl(previewUrl) ? (
        <img src={previewUrl} alt="" className="mt-3 h-32 w-32 rounded-lg object-cover" />
      ) : previewUrl ? (
        <p className={`${adminHelpClass} text-amber-700`}>
          Invalid image URL - use https://… or upload a file. Placeholders like (file.jpg) are not
          shown on the site.
        </p>
      ) : null}
      <input ref={hiddenRef} type="hidden" name={name} defaultValue={initialUrl} />
      <div className="mt-3 flex flex-col gap-3">
        <ImageUploadButton onUploadComplete={applyUrl} label="Upload image" />
        <input
          type="url"
          placeholder="Or paste image URL"
          value={previewUrl}
          onChange={(e) => applyUrl(e.target.value)}
          className={adminInputClass}
        />
      </div>
    </div>
  );
}
