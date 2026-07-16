"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCategoryAction } from "app/admin/(protected)/categories/actions";
import { toast } from "sonner";

export function DeleteCategoryButton({
  categoryId,
  name = "this category",
}: {
  categoryId: string;
  name?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${name}"?`)) return;
    setLoading(true);
    const result = await deleteCategoryAction(categoryId);
    if (!result.error) {
      toast.success("Category deleted");
      router.refresh();
    } else {
      toast.error(result.error);
    }
    setLoading(false);
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:underline disabled:opacity-50"
    >
      {loading ? "Deleting…" : "Delete"}
    </button>
  );
}
