"use client";

import { Squares2X2Icon, ViewColumnsIcon } from "@heroicons/react/24/outline";

type Props = {
  compact: boolean;
  onChange: (compact: boolean) => void;
};

export function StoriesGridToggle({ compact, onChange }: Props) {
  return (
    <button
      type="button"
      onClick={() => onChange(!compact)}
      className="flex h-[42px] w-[42px] items-center justify-center border border-bp-text/20 bg-bp-canvas/60 text-bp-text shadow-[2px_2px_0_rgba(1,2,0,0.04)] transition-colors hover:border-bp-accent/40 hover:text-bp-accent md:hidden"
      aria-pressed={compact}
      aria-label={compact ? "Show full story cards" : "Show compact grid"}
      title={compact ? "Full cards" : "Compact grid"}
    >
      {compact ? (
        <ViewColumnsIcon className="h-4 w-4" strokeWidth={2} />
      ) : (
        <Squares2X2Icon className="h-4 w-4" strokeWidth={2} />
      )}
    </button>
  );
}
