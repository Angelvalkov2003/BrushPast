"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  bpBodyClass,
  bpBodySmClass,
  bpTitleClass,
  bpTitleUtility,
} from "components/home/home-typography";
import {
  CONTRIBUTION_ALLOCATIONS,
  CONTRIBUTION_COPY,
  CONTRIBUTION_PRESETS_GBP,
  parseContributionAmount,
  type ContributionAllocationId,
} from "lib/checkout-contribution";

type Props = {
  presetGbp: number | null;
  customRaw: string;
  allocation: ContributionAllocationId | "";
  onPreset: (amount: number | null) => void;
  onCustomRaw: (value: string) => void;
  onAllocation: (value: ContributionAllocationId | "") => void;
};

export function CheckoutContribution({
  presetGbp,
  customRaw,
  allocation,
  onPreset,
  onCustomRaw,
  onAllocation,
}: Props) {
  const [otherMode, setOtherMode] = useState(false);
  const customAmount = parseContributionAmount(customRaw);
  const hasContribution =
    (presetGbp != null && presetGbp > 0) ||
    (customAmount != null && customAmount > 0);

  return (
    <fieldset className="border border-bp-text/15 bg-bp-canvas/60 p-5">
      <legend
        className={`${bpTitleClass} ${bpTitleUtility} px-1 text-lg font-bold uppercase tracking-[0.08em] text-bp-text`}
      >
        {CONTRIBUTION_COPY.heading}
      </legend>
      <p className={`${bpBodyClass} mt-2 text-sm text-bp-text/75`}>
        {CONTRIBUTION_COPY.body}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {CONTRIBUTION_PRESETS_GBP.map((amount) => {
          const selected = !otherMode && presetGbp === amount;
          return (
            <button
              key={amount}
              type="button"
              onClick={() => {
                setOtherMode(false);
                onCustomRaw("");
                onPreset(selected ? null : amount);
              }}
              className={clsx(
                `${bpTitleClass} ${bpTitleUtility} min-w-[4.5rem] border px-4 py-2.5 text-sm font-bold transition-colors`,
                selected
                  ? "border-bp-accent bg-bp-accent text-bp-canvas"
                  : "border-bp-text/20 bg-bp-canvas text-bp-text hover:border-bp-accent/50",
              )}
            >
              £{amount}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => {
            setOtherMode(true);
            onPreset(null);
          }}
          className={clsx(
            `${bpTitleClass} ${bpTitleUtility} border px-4 py-2.5 text-sm font-bold transition-colors`,
            otherMode
              ? "border-bp-accent bg-bp-accent text-bp-canvas"
              : "border-bp-text/20 bg-bp-canvas text-bp-text hover:border-bp-accent/50",
          )}
        >
          Other amount
        </button>
        <button
          type="button"
          onClick={() => {
            setOtherMode(false);
            onPreset(null);
            onCustomRaw("");
            onAllocation("");
          }}
          className={`${bpBodySmClass} px-3 py-2 text-bp-text/55 underline-offset-2 hover:text-bp-accent hover:underline`}
        >
          No thanks
        </button>
      </div>

      {otherMode ? (
        <div className="relative mt-4 max-w-xs">
          <span
            className={`${bpTitleClass} ${bpTitleUtility} absolute left-3 top-1/2 -translate-y-1/2 text-bp-text/45`}
            aria-hidden
          >
            £
          </span>
          <label htmlFor="contribution-other" className="sr-only">
            Other contribution amount
          </label>
          <input
            id="contribution-other"
            inputMode="decimal"
            value={customRaw}
            onChange={(event) => {
              onPreset(null);
              onCustomRaw(event.target.value);
            }}
            placeholder="Enter amount"
            className={`${bpBodyClass} w-full border border-bp-text/20 bg-bp-canvas py-2.5 pl-8 pr-3 text-bp-text focus:border-bp-accent focus:outline-none focus:ring-1 focus:ring-bp-accent/30`}
          />
          {customRaw.trim() && customAmount == null ? (
            <p className={`${bpBodySmClass} mt-1 text-red-700`}>
              Enter a valid amount.
            </p>
          ) : null}
        </div>
      ) : null}

      {hasContribution ? (
        <div className="mt-5 space-y-2">
          <p
            className={`${bpBodySmClass} font-bold uppercase tracking-[0.14em] text-bp-text/45`}
          >
            Where should it go? (optional)
          </p>
          {CONTRIBUTION_ALLOCATIONS.map((item) => (
            <label
              key={item.id}
              className="flex cursor-pointer items-center gap-3 border border-bp-text/12 px-3 py-2.5 transition-colors hover:border-bp-accent/40"
            >
              <input
                type="radio"
                name="contribution_allocation"
                value={item.id}
                checked={allocation === item.id}
                onChange={() => onAllocation(item.id)}
                className="accent-bp-accent"
              />
              <span className={`${bpBodySmClass} text-bp-text`}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      ) : null}
    </fieldset>
  );
}
