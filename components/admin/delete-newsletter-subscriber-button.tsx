"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteNewsletterSubscriberAction } from "app/admin/newsletter/actions";
import { toast } from "sonner";

export function DeleteNewsletterSubscriberButton({ subscriberId }: { subscriberId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Remove this subscriber?")) return;
    setLoading(true);
    const result = await deleteNewsletterSubscriberAction(subscriberId);
    if (!result.error) {
      toast.success("Subscriber removed");
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
      {loading ? "Removing…" : "Delete"}
    </button>
  );
}
