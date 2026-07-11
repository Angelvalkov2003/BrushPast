"use client";

import { useEffect, useRef, useState } from "react";
import { Bars3BottomLeftIcon, CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { bpWhisperUtility } from "components/home/home-typography";

export type StorySortKey = "latest" | "oldest" | "featured";

const SORT_OPTIONS: { value: StorySortKey; label: string; hint: string }[] = [
  { value: "featured", label: "Featured", hint: "Highest sort first" },
  { value: "latest", label: "Latest", hint: "Newest first" },
  { value: "oldest", label: "Oldest", hint: "Earliest first" },
];

type Props = {
  value: StorySortKey;
  onChange: (value: StorySortKey) => void;
};

export function StoriesSort({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const active = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0]!;

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <div
        className="hidden items-center gap-3 sm:flex"
        role="group"
        aria-label="Sort stories"
      >
        <span className="text-xl text-bp-text/80 md:text-2xl">Sort</span>
        <div className="flex border border-bp-text/15 bg-bp-canvas/60 p-1 shadow-[2px_2px_0_rgba(1,2,0,0.04)]">
          {SORT_OPTIONS.map((option) => {
            const selected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                title={option.hint}
                onClick={() => onChange(option.value)}
                className={`px-4 py-2 text-base transition-colors ${
                  selected
                    ? "bg-bp-accent font-bold text-bp-canvas"
                    : "text-bp-text/55 hover:bg-bp-text/5 hover:text-bp-text"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="sm:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 border border-bp-text/20 bg-bp-canvas/60 px-3 py-2 text-base text-bp-text shadow-[2px_2px_0_rgba(1,2,0,0.04)]"
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <Bars3BottomLeftIcon className="h-4 w-4 text-bp-accent" strokeWidth={2} />
          <span>Sort</span>
          <span className="text-bp-text/50">·</span>
          <span>{active.label}</span>
          <ChevronDownIcon
            className={`h-4 w-4 text-bp-text/50 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open ? (
          <ul
            role="listbox"
            aria-label="Sort stories"
            className="absolute right-0 z-40 mt-2 min-w-[200px] border border-bp-text/15 bg-[#faf7f2] py-1 shadow-[4px_6px_0_rgba(1,2,0,0.1)]"
          >
            {SORT_OPTIONS.map((option) => {
              const selected = value === option.value;
              return (
                <li key={option.value} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-bp-canvas"
                  >
                    <span>
                      <span className="block text-lg font-bold text-bp-text">
                        {option.label}
                      </span>
                      <span className={`${bpWhisperUtility} mt-0.5 block text-sm italic text-bp-text/55`}>
                        {option.hint}
                      </span>
                    </span>
                    {selected ? (
                      <CheckIcon className="h-5 w-5 shrink-0 text-bp-accent" strokeWidth={2} />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
