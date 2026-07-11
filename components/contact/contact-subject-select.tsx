"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { CONTACT_SUBJECTS, type ContactSubjectValue } from "lib/contact-config";
import { bpWhisperUtility } from "components/home/home-typography";

type Props = {
  value: ContactSubjectValue;
  onChange: (value: ContactSubjectValue) => void;
};

export function ContactSubjectSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const active = CONTACT_SUBJECTS.find((s) => s.value === value) ?? CONTACT_SUBJECTS[0];

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
    <div ref={rootRef} className="relative mt-1.5">
      <button
        type="button"
        id="subject"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 border border-bp-text/20 bg-bp-canvas/60 px-4 py-3 text-left shadow-[2px_2px_0_rgba(1,2,0,0.04)] transition-colors hover:border-bp-accent/40 focus:border-bp-accent focus:outline-none"
      >
        <span className="min-w-0">
          <span className={`${bpWhisperUtility} block text-base text-bp-accent`}>Topic</span>
          <span className="mt-0.5 block truncate text-xl font-bold text-bp-text">
            {active.label}
          </span>
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 shrink-0 text-bp-text/50 transition-transform ${open ? "rotate-180 text-bp-accent" : ""}`}
          strokeWidth={2}
        />
      </button>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Subject"
          className="absolute left-0 right-0 z-40 mt-2 max-h-[min(18rem,50vh)] overflow-y-auto border border-bp-text/15 bg-[#faf7f2] py-1 shadow-[4px_6px_0_rgba(1,2,0,0.1)]"
        >
          {CONTACT_SUBJECTS.map((option) => {
            const selected = value === option.value;
            return (
              <li key={option.value} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors ${
                    selected ? "bg-bp-canvas" : "hover:bg-bp-canvas/80"
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block text-lg font-bold text-bp-text">
                      {option.label}
                    </span>
                    <span className={`${bpWhisperUtility} mt-0.5 block text-sm italic text-bp-text/65`}>
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
  );
}
