"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteJournalPostAction } from "app/admin/journal/actions";
import { toast } from "sonner";

export function DeleteJournalButton({ id, title }: { id: string; title?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      className="text-red-600 hover:underline disabled:opacity-50"
      onClick={async () => {
        if (!confirm(`Delete "${title || "post"}"?`)) return;
        setLoading(true);
        const r = await deleteJournalPostAction(id);
        if (!r.error) {
          toast.success("Deleted");
          router.refresh();
        } else {
          toast.error(r.error);
        }
        setLoading(false);
      }}
    >
      {loading ? "…" : "Delete"}
    </button>
  );
}
