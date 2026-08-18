"use client";

import Image from "next/image";
import clsx from "clsx";
import { IndexCard, PolaroidFrame } from "components/home/home-decor";
import {
  bpBodyClass,
  bpBodySmClass,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
} from "components/home/home-typography";
import { formatPrice } from "lib/currency";
import { isValidImageUrl } from "lib/image-url";
import {
  BOX_CATEGORY_ROWS,
  type BoxDraft,
} from "lib/shop-box-config";
import { priceOfDraft } from "lib/shop-box-pricing";
import { selectedItemInCategory, totalItemCount } from "lib/shop-box-rules";

export function BuilderCta({
  children,
  disabled,
  onClick,
  className,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `${bpTitleClass} ${bpTitleUtility} inline-flex items-center justify-center bg-bp-accent px-7 py-3 text-lg font-bold uppercase tracking-[0.08em] text-bp-canvas shadow-[3px_3px_0_rgba(1,2,0,0.2)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0`,
        className,
      )}
    >
      {children}
    </button>
  );
}

function SlotThumb({
  title,
  imageUrl,
  emptyLabel,
}: {
  title?: string;
  imageUrl?: string;
  emptyLabel: string;
}) {
  return (
    <div className="min-w-0">
      {title && imageUrl && isValidImageUrl(imageUrl) ? (
        <div className="relative aspect-square overflow-hidden border border-bp-text/10 bg-bp-text/5">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>
      ) : (
        <div className="flex aspect-square items-center justify-center border border-dashed border-bp-text/25 bg-bp-text/[0.04] px-1 text-center">
          <span className={`${bpBodySmClass} text-[10px] uppercase tracking-[0.12em] text-bp-text/40`}>
            {emptyLabel}
          </span>
        </div>
      )}
      <p className={`${bpBodySmClass} mt-1.5 truncate text-center text-[11px] text-bp-text/70`}>
        {title ?? emptyLabel}
      </p>
    </div>
  );
}

export function BoxCartPanel({
  draft,
  canContinue,
  onContinue,
  onChange,
  cta,
}: {
  draft: BoxDraft;
  canContinue: boolean;
  onContinue: () => void;
  onChange?: () => void;
  cta: string;
}) {
  const count = totalItemCount(draft.items);
  const price = priceOfDraft(draft);
  const needed = draft.type === "a" ? 3 : draft.type === "b" ? 2 : 1;
  const item = draft.items[0] ?? null;
  const multi = needed > 1;

  return (
    <IndexCard className="p-5 md:p-6">
      <p className={`${bpWhisperUtility} text-xl text-bp-accent`}>Your box</p>
      <h2
        className={`${bpTitleClass} ${bpTitleUtility} mt-1 text-2xl font-bold uppercase tracking-wide text-bp-text`}
      >
        {count === 0
          ? needed === 1
            ? "Waiting for a piece"
            : `Waiting for ${needed === 2 ? "two" : "three"} pieces`
          : multi
            ? `${count} of ${needed} in your box`
            : "1 piece in your box"}
      </h2>

      {draft.type === "a" ? (
        <div className="mt-5 grid grid-cols-3 gap-2">
          {BOX_CATEGORY_ROWS.map((row) => {
            const slot = selectedItemInCategory(draft, row.key);
            return (
              <SlotThumb
                key={row.key}
                title={slot?.title}
                imageUrl={slot?.imageUrl}
                emptyLabel={row.label}
              />
            );
          })}
        </div>
      ) : draft.type === "b" ? (
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[0, 1].map((index) => {
            const slot = draft.items[index];
            return (
              <SlotThumb
                key={index}
                title={slot?.title}
                imageUrl={slot?.imageUrl}
                emptyLabel={`Piece ${index + 1}`}
              />
            );
          })}
        </div>
      ) : (
        <div className="mt-5">
          {item ? (
            <PolaroidFrame index={1} tilt={false} className="pb-6">
              <div className="relative aspect-square overflow-hidden bg-bp-text/5">
                {isValidImageUrl(item.imageUrl) ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-4 text-center">
                    <span className={`${bpWhisperUtility} text-bp-text/35`}>
                      No image
                    </span>
                  </div>
                )}
              </div>
            </PolaroidFrame>
          ) : (
            <div className="flex aspect-square flex-col items-center justify-center border border-dashed border-bp-text/25 bg-bp-text/[0.04] px-6 text-center">
              <span className={`${bpWhisperUtility} text-lg text-bp-text/40`}>
                Empty for now
              </span>
              <p className={`${bpBodySmClass} mt-2 max-w-[14rem] text-bp-text/45`}>
                Pick a t-shirt, print or coffee and it appears here.
              </p>
            </div>
          )}
        </div>
      )}

      {item && !multi ? (
        <div className="mt-4">
          <p className={`${bpBodySmClass} uppercase tracking-[0.16em] text-bp-accent`}>
            {BOX_CATEGORY_ROWS.find((row) => row.key === item.categoryKey)?.label}
          </p>
          <p className="mt-1 font-bold leading-snug text-bp-text">{item.title}</p>
          {item.variantLabel ? (
            <p className={`${bpBodySmClass} mt-1 text-bp-text/55`}>
              {item.variantLabel}
            </p>
          ) : null}
        </div>
      ) : null}

      {onChange ? (
        <button
          type="button"
          onClick={onChange}
          className={`${bpBodySmClass} mt-4 font-semibold text-bp-accent underline-offset-2 hover:underline`}
        >
          {multi ? "Change pieces" : "Change piece"}
        </button>
      ) : null}

      <ul className="mt-5 flex flex-wrap gap-2">
        {BOX_CATEGORY_ROWS.map((row) => {
          const selected = Boolean(selectedItemInCategory(draft, row.key));
          return (
            <li
              key={row.key}
              className={clsx(
                `${bpBodySmClass} border px-2.5 py-1 uppercase tracking-[0.12em]`,
                selected
                  ? "border-bp-accent bg-bp-accent/10 font-bold text-bp-accent"
                  : "border-bp-text/15 text-bp-text/45",
              )}
            >
              {row.label}
              {selected ? " · in box" : ""}
            </li>
          );
        })}
      </ul>

      {draft.giftMessage.trim() ? (
        <p className={`${bpBodyClass} mt-4 line-clamp-3 text-sm italic text-bp-text/70`}>
          “{draft.giftMessage.trim()}”
        </p>
      ) : null}

      <p
        className={`${bpTitleClass} ${bpTitleUtility} mt-5 text-3xl font-bold text-bp-text`}
      >
        {count > 0 ? formatPrice(price) : "—"}
      </p>

      <BuilderCta
        className="mt-5 w-full"
        disabled={!canContinue}
        onClick={onContinue}
      >
        {cta}
      </BuilderCta>
    </IndexCard>
  );
}

export function BoxMobileCtaBar({
  draft,
  canContinue,
  onContinue,
  cta,
}: {
  draft: BoxDraft;
  canContinue: boolean;
  onContinue: () => void;
  cta: string;
}) {
  const count = totalItemCount(draft.items);
  const price = priceOfDraft(draft);
  const item = draft.items[0];
  const needed = draft.type === "a" ? 3 : draft.type === "b" ? 2 : 1;

  return (
    <div className="sticky bottom-0 z-20 max-w-full overflow-x-clip border-t border-bp-text/12 bg-[#faf6f0]/95 px-4 py-3 shadow-[0_-8px_24px_rgba(1,2,0,0.08)] backdrop-blur-sm lg:hidden">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-bp-text/10 bg-bp-text/5">
          {item && isValidImageUrl(item.imageUrl) ? (
            <Image
              src={item.imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className={`${bpBodySmClass} truncate text-bp-text/70`}>
            {needed > 1
              ? count === 0
                ? `Pick ${needed} pieces`
                : `${count} of ${needed} in your box`
              : item
                ? item.title
                : "Pick a piece for your box"}
          </p>
          <p
            className={`${bpTitleClass} ${bpTitleUtility} text-lg font-bold text-bp-text`}
          >
            {count > 0 ? formatPrice(price) : "—"}
          </p>
        </div>
        <BuilderCta
          className="min-w-0 shrink px-3 py-2 text-sm leading-tight sm:shrink-0 sm:px-4 sm:py-2.5 sm:text-base"
          disabled={!canContinue}
          onClick={onContinue}
        >
          {cta}
        </BuilderCta>
      </div>
    </div>
  );
}
