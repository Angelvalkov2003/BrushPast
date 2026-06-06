"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="group mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-bp-text/70 transition-colors hover:text-bp-accent"
      aria-label="Go back"
      type="button"
    >
      <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
      Back
    </button>
  );
}
