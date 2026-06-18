"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteWorkshopAction } from "app/admin/workshops/actions";
import { toast } from "sonner";

export function DeleteWorkshopButton({ id, title }: { id: string; title?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <button
      type="button"
      disabled={loading}
      className="text-red-600 hover:underline disabled:opacity-50"
      onClick={async () => {
        if (!confirm(`Delete "${title || "workshop"}"?`)) return;
        setLoading(true);
        const r = await deleteWorkshopAction(id);
        if (!r.error) {
          toast.success("Deleted");
          router.refresh();
        } else toast.error(r.error);
        setLoading(false);
      }}
    >
      {loading ? "…" : "Delete"}
    </button>
  );
}
