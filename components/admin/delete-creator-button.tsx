"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCreatorAction } from "app/admin/creators/actions";
import { toast } from "sonner";

export function DeleteCreatorButton({ id, name }: { id: string; name?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <button
      type="button"
      disabled={loading}
      className="text-red-600 hover:underline disabled:opacity-50"
      onClick={async () => {
        if (!confirm(`Delete "${name || "creator"}"?`)) return;
        setLoading(true);
        const r = await deleteCreatorAction(id);
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
