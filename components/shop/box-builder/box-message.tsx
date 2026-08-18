"use client";

import {
  bpBodyClass,
  bpBodySmClass,
  bpTitleClass,
  bpTitleUtility,
} from "components/home/home-typography";
import { BOX_GIFT_MESSAGE_MAX } from "lib/shop-box-config";

export function BoxMessage({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}) {
  return (
    <div>
      <h2
        className={`${bpTitleClass} ${bpTitleUtility} text-3xl font-bold uppercase tracking-wide text-bp-text`}
      >
        Add a gift message
      </h2>
      <p className={`${bpBodyClass} mt-2 max-w-lg text-bp-text/70`}>
        Every box includes a note. This is required — tell them why this story
        is for them.
      </p>
      <label htmlFor="box-gift-message" className="sr-only">
        Gift message
      </label>
      <textarea
        id="box-gift-message"
        required
        rows={7}
        maxLength={BOX_GIFT_MESSAGE_MAX}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Write your message…"
        className={`${bpBodyClass} mt-6 w-full border border-bp-text/20 bg-bp-canvas/80 px-4 py-3 text-bp-text shadow-[2px_3px_0_rgba(1,2,0,0.04)] focus:border-bp-accent focus:outline-none focus:ring-1 focus:ring-bp-accent/30`}
      />
      <div className="mt-2 flex justify-between gap-4">
        {error ? (
          <p className={`${bpBodySmClass} text-red-700`} role="alert">
            {error}
          </p>
        ) : (
          <p className={`${bpBodySmClass} text-bp-text/50`}>
            Packed with the box. Shown to you at checkout.
          </p>
        )}
        <p className={`${bpBodySmClass} shrink-0 text-bp-text/45`}>
          {value.length}/{BOX_GIFT_MESSAGE_MAX}
        </p>
      </div>
    </div>
  );
}
