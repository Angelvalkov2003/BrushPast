"use client";

import Image from "next/image";
import { PolaroidFrame } from "components/home/home-decor";
import {
  bpBodyClass,
  bpBodySmClass,
  bpTitleClass,
  bpTitleUtility,
} from "components/home/home-typography";
import { formatPrice } from "lib/currency";
import { isValidImageUrl } from "lib/image-url";
import type { BoxDraft } from "lib/shop-box-config";
import { priceOfDraft } from "lib/shop-box-pricing";
import { categoryLabel } from "lib/shop-box-config";

export function BoxReview({
  draft,
  onEdit,
  onRemove,
}: {
  draft: BoxDraft;
  onEdit: () => void;
  onRemove: (itemId: string) => void;
}) {
  const total = priceOfDraft(draft);

  return (
    <div>
      <h2
        className={`${bpTitleClass} ${bpTitleUtility} text-3xl font-bold uppercase tracking-wide text-bp-text`}
      >
        Review your box
      </h2>
      <p className={`${bpBodyClass} mt-2 text-bp-text/70`}>
        This is the piece we will pack. Change or remove it if you want something
        else — the price updates live.
      </p>

      <ul className="mt-8 space-y-5">
        {draft.items.map((item) => (
          <li
            key={item.id}
            className="flex gap-5 border border-bp-text/12 bg-bp-canvas/50 p-4 shadow-[2px_3px_0_rgba(1,2,0,0.06)]"
          >
            <div className="w-28 shrink-0">
              <PolaroidFrame index={0} tilt={false} className="pb-5">
                <div className="relative aspect-square overflow-hidden bg-bp-text/5">
                  {isValidImageUrl(item.imageUrl) ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  ) : null}
                </div>
              </PolaroidFrame>
            </div>
            <div className="min-w-0 flex-1">
              <p className={`${bpBodySmClass} uppercase tracking-[0.14em] text-bp-accent`}>
                {categoryLabel(item.categoryKey)}
              </p>
              <p className={`${bpTitleClass} ${bpTitleUtility} mt-1 text-xl font-bold text-bp-text`}>
                {item.title}
              </p>
              {item.variantLabel ? (
                <p className={`${bpBodySmClass} mt-1 text-bp-text/55`}>
                  {item.variantLabel}
                </p>
              ) : null}
              <p className={`${bpBodyClass} mt-2 text-bp-text`}>
                {formatPrice(item.unitPrice)}
              </p>
              <div className="mt-4 flex gap-4">
                <button
                  type="button"
                  onClick={onEdit}
                  className={`${bpBodySmClass} font-semibold text-bp-accent underline-offset-2 hover:underline`}
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className={`${bpBodySmClass} font-semibold text-bp-text/55 underline-offset-2 hover:underline`}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {draft.items.length === 0 ? (
        <p className={`${bpBodyClass} mt-8 text-bp-text/55`}>
          Your box is empty. Go back and choose a piece.
        </p>
      ) : (
        <p
          className={`${bpTitleClass} ${bpTitleUtility} mt-6 text-2xl font-bold text-bp-text`}
        >
          Box total {formatPrice(total)}
        </p>
      )}
    </div>
  );
}
