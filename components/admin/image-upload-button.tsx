"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";

interface ImageUploadButtonProps {
  onUploadComplete: (url: string) => void;
  label?: string;
  className?: string;
}

export function ImageUploadButton({
  onUploadComplete,
  label = "Upload image",
  className = "",
}: ImageUploadButtonProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 10MB");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Failed to parse response:", parseError);
        throw new Error("Error processing server response");
      }

      if (!response.ok) {
        console.error("Upload failed:", data);
        throw new Error(data.error || `Image upload failed (${response.status})`);
      }

      onUploadComplete(data.url);
      toast.success("Image uploaded successfully");
    } catch (error: unknown) {
      console.error("Error uploading image:", error);
      toast.error(error instanceof Error ? error.message : "Image upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
        tabIndex={-1}
        aria-hidden
      />
      <button
        type="button"
        disabled={uploading}
        onClick={() => fileInputRef.current?.click()}
        className={`inline-block rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      >
        {uploading ? "Uploading..." : label}
      </button>
    </div>
  );
}
