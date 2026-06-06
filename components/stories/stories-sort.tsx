"use client";

import { useEffect, useRef, useState } from "react";
import { Caveat } from "next/font/google";
import { Bars3BottomLeftIcon, CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

export type StorySortKey = "latest" | "oldest" | "featured";

const SORT_OPTIONS: { value: StorySortKey; label: string; hint: string }[] = [
  { value: "latest", label: "Latest", hint: "Newest first" },
  { value: "oldest", label: "Oldest", hint: "Earliest first" },
  { value: "featured", label: "Featured", hint: "Curated order" },
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
      {/* Desktop: segmented pills */}
      <div
        className="hidden items-center gap-4 sm:flex"
        role="group"
        aria-label="Sort stories"
      >
        <span
          className={`${caveat.className} text-xl leading-none text-bp-text/80 md:text-2xl`}
        >
          Sort
        </span>
        <div className="flex border border-bp-text/15 bg-bp-surface/50 p-1">
          {SORT_OPTIONS.map((option) => {
            const selected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                title={option.hint}
                onClick={() => onChange(option.value)}
                className={
                  selected
                    ? "bg-bp-text px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-bp-canvas transition-colors md:text-xs"
                    : "px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-bp-text/55 transition-colors hover:bg-bp-text/5 hover:text-bp-text md:text-xs"
                }
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile: custom menu trigger */}
      <div className="sm:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 border border-bp-text/20 bg-bp-surface/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-bp-text"
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <Bars3BottomLeftIcon className="h-4 w-4 text-bp-accent" strokeWidth={2} />
          <span className={caveat.className}>Sort</span>
          <span className="normal-case tracking-normal text-bp-text/70">·</span>
          <span>{active.label}</span>
          <ChevronDownIcon
            className={`h-4 w-4 text-bp-text/50 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open ? (
          <ul
            role="listbox"
            aria-label="Sort stories"
            className="absolute right-0 z-40 mt-2 min-w-[200px] border border-bp-text/15 bg-bp-canvas py-1 shadow-lg"
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
                    className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-bp-surface"
                  >
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.15em] text-bp-text">
                        {option.label}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-bp-text/55">
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
