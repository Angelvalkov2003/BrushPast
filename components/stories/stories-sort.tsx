"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Bars3BottomLeftIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  bpBodyClass,
  bpEmphasisUtility,
  bpWhisperUtility,
} from "components/home/home-typography";

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

type MenuCoords = {
  top: number;
  left: number;
  width: number;
};

export function StoriesSort({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<MenuCoords | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const active =
    SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0]!;

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateCoords = () => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const menuWidth = Math.max(rect.width, 220);
    const gutter = 12;
    const left = Math.min(
      Math.max(gutter, rect.right - menuWidth),
      window.innerWidth - menuWidth - gutter,
    );
    setCoords({
      top: rect.bottom + 8,
      left,
      width: menuWidth,
    });
  };

  useLayoutEffect(() => {
    if (!open) return;
    updateCoords();
    const onScrollOrResize = () => updateCoords();
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, true);
    return () => {
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (rootRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const menu = open && coords && mounted
    ? createPortal(
        <ul
          ref={menuRef}
          id={listId}
          role="listbox"
          aria-label="Sort stories"
          style={{
            position: "fixed",
            top: coords.top,
            left: coords.left,
            width: coords.width,
            maxHeight: `min(320px, calc(100dvh - ${coords.top + 12}px))`,
          }}
          className="z-[200] overflow-y-auto border border-bp-text/15 bg-bp-canvas py-1 shadow-[4px_6px_0_rgba(1,2,0,0.12)]"
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
                    <span
                      className={`${bpBodyClass} ${bpEmphasisUtility} block text-bp-text`}
                    >
                      {option.label}
                    </span>
                    <span
                      className={`${bpWhisperUtility} mt-0.5 block text-sm italic text-bp-text/55`}
                    >
                      {option.hint}
                    </span>
                  </span>
                  {selected ? (
                    <CheckIcon
                      className="h-5 w-5 shrink-0 text-bp-accent"
                      strokeWidth={2}
                    />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>,
        document.body,
      )
    : null;

  return (
    <div ref={rootRef} className="relative z-30">
      <div
        className="hidden items-center gap-3 sm:flex"
        role="group"
        aria-label="Sort stories"
      >
        <span className={`${bpBodyClass} ${bpEmphasisUtility} text-bp-text/80`}>
          Sort
        </span>
        <div className="flex gap-1 border border-bp-text/15 p-1">
          {SORT_OPTIONS.map((option) => {
            const selected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                title={option.hint}
                onClick={() => onChange(option.value)}
                className={`${bpBodyClass} px-4 py-2 transition-colors ${
                  selected
                    ? "bg-bp-accent font-bold text-bp-canvas"
                    : "bg-bp-canvas text-bp-text/65 hover:text-bp-text"
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
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`${bpBodyClass} flex items-center gap-2 border border-bp-text/20 bg-bp-canvas px-3 py-2 text-bp-text`}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? listId : undefined}
        >
          <Bars3BottomLeftIcon
            className="h-4 w-4 text-bp-accent"
            strokeWidth={2}
          />
          <span>Sort</span>
          <span className="text-bp-text/50">·</span>
          <span>{active.label}</span>
          <ChevronDownIcon
            className={`h-4 w-4 text-bp-text/50 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
        {menu}
      </div>
    </div>
  );
}
