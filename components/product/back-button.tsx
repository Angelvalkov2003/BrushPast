"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { bpWhisperUtility } from "components/home/home-typography";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`${bpWhisperUtility} group mb-6 flex items-center gap-2 text-lg text-bp-text/65 transition-colors hover:text-bp-accent`}
      aria-label="Go back"
      type="button"
    >
      <ArrowLeftIcon className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
      Back
    </button>
  );
}
