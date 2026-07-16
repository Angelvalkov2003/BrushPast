"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCollectionAction, updateCollectionAction } from "app/admin/(protected)/collections/actions";
import { toast } from "sonner";
import {
  adminButtonClass,
  adminFormClass,
  adminGridClass,
  adminHelpClass,
  adminInputClass,
  adminLabelClass,
  adminTextareaClass,
} from "./admin-form-styles";

interface CollectionFormData {
  handle: string;
  title: string;
  description: string;
  position: string;
}

interface CollectionFormProps {
  collection?: any;
}

export function CollectionForm({ collection }: CollectionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [handleError, setHandleError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CollectionFormData>({
    handle: collection?.handle || "",
    title: collection?.title || "",
    description: collection?.description || "",
    position: collection?.position?.toString() || "0",
  });

  // Format handle/slug: lowercase, remove spaces, only allow letters, numbers, and hyphens
  const formatHandle = (value: string): string => {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "") // Remove all spaces
      .replace(/[^a-z0-9-]/g, "") // Remove all non-alphanumeric characters except hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
  };

  // Generate handle from title
  const generateHandleFromTitle = (title: string): string => {
    return formatHandle(title);
  };

  const handleHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatHandle(e.target.value);
    setFormData({ ...formData, handle: formatted });
    // Clear error when user starts typing
    if (handleError) {
      setHandleError(null);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    // Auto-generate handle from title if handle is empty
    if (!formData.handle || formData.handle === formatHandle(collection?.title || "")) {
      setFormData({ 
        ...formData, 
        title: newTitle,
        handle: generateHandleFromTitle(newTitle)
      });
    } else {
      setFormData({ ...formData, title: newTitle });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate handle from title if not provided, and trim to remove any spaces
      const finalHandle = (formData.handle.trim() || generateHandleFromTitle(formData.title)).trim();

      const collectionData = {
        handle: finalHandle,
        title: formData.title,
        description: formData.description.trim() || undefined,
        position: parseInt(formData.position) || 0,
      };

      let result;
      if (collection) {
        result = await updateCollectionAction({ ...collectionData, id: collection.id });
      } else {
        result = await createCollectionAction(collectionData);
      }

      if (result.success) {
        toast.success(collection ? "Collection updated successfully" : "Collection created successfully");
        router.push("/admin/collections");
        router.refresh();
      } else {
        const errorMessage = result.error || "Failed to save collection";
        // Check if error is about duplicate handle
        if (errorMessage.includes("Slug") && errorMessage.includes("already taken")) {
          setHandleError(errorMessage);
        } else {
          toast.error(errorMessage);
        }
      }
    } catch (error: any) {
      console.error("Error saving collection:", error);
      const errorMessage = error.message || "Failed to save collection";
      // Check if error is about duplicate handle
      if (errorMessage.includes("Slug") && errorMessage.includes("already taken")) {
        setHandleError(errorMessage);
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={adminFormClass}>
      <div className={adminGridClass}>
        <div>
          <label className={adminLabelClass}>Handle (URL slug)</label>
          <input
            type="text"
            value={formData.handle}
            onChange={handleHandleChange}
            className={`${adminInputClass} ${
              handleError ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""
            }`}
            placeholder="teniskazelena"
          />
          {handleError ? (
            <p className={`${adminHelpClass} text-red-600`}>{handleError}</p>
          ) : (
            <p className={adminHelpClass}>
              If left blank, generated from the name. Lowercase letters and numbers only, no spaces.
            </p>
          )}
        </div>

        <div>
          <label className={adminLabelClass}>Name *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={handleTitleChange}
            className={adminInputClass}
          />
        </div>

        <div>
          <label className={adminLabelClass}>Position</label>
          <input
            type="number"
            min="0"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className={adminInputClass}
            placeholder="0 = first position"
          />
          <p className={adminHelpClass}>0 = first position; higher numbers appear later</p>
        </div>
      </div>

      <div>
        <label className={adminLabelClass}>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={5}
          className={adminTextareaClass}
          placeholder="Collection description (optional)"
        />
        <p className={adminHelpClass}>Shown below the collection title on the storefront</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={loading}
          className={adminButtonClass}
        >
          {loading ? "Saving..." : collection ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
