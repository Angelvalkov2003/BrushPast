"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteSponsorAction } from "app/admin/(protected)/sponsors/actions";
import { toast } from "sonner";

export function DeleteSponsorButton({ sponsorId }: { sponsorId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Remove this unpaid sponsorship attempt?")) return;
    setLoading(true);
    const result = await deleteSponsorAction(sponsorId);
    if (!result.error) {
      toast.success("Sponsor removed");
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
