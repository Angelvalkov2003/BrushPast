"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProductAction } from "app/admin/(protected)/products/actions";
import { toast } from "sonner";

export function DeleteProductButton({
  productId,
  productTitle = "this product",
}: {
  productId: string;
  productTitle?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${productTitle}"?`)) {
      return;
    }

    setLoading(true);
    try {
      const result = await deleteProductAction(productId);
      if (!result.error) {
        toast.success("Product deleted");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:text-red-900 disabled:opacity-50"
    >
      {loading ? "Deleting…" : "Delete"}
    </button>
  );
}
