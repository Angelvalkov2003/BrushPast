"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteMessageAction } from "app/admin/messages/actions";
import { toast } from "sonner";

export function DeleteMessageButton({ messageId }: { messageId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Delete this message?")) return;
    setLoading(true);
    const result = await deleteMessageAction(messageId);
    if (!result.error) {
      toast.success("Message deleted");
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
