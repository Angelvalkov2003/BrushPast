"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";
import Link from "next/link";
import { BoxStepIndicator } from "./box-step-indicator";
import { BoxCategorySection } from "./box-category-section";
import {
  BoxSizeModal,
  defaultVariantForProduct,
  productNeedsVariantChoice,
} from "./box-size-modal";
import { BoxCartPanel, BoxMobileCtaBar } from "./box-summary-bar";
import { BoxReview } from "./box-review";
import { BoxMessage } from "./box-message";
import { SectionEyebrow } from "components/home/home-decor";
import {
  bpBodyClass,
  bpTitleClass,
  bpTitleUtility,
} from "components/home/home-typography";
import { useCart } from "components/cart/cart-context";
import {
  BOX_GIFT_MESSAGE_MAX,
  PAIR_COMBO_META,
  boxTypeIntro,
  boxTypeLabel,
  emptyBoxDraft,
  singlePriceForCategory,
  type BoxBuilderStep,
  type BoxCategoryKey,
  type BoxDraft,
  type BoxPairComboId,
  type BoxSelectionItem,
  type BoxTypeId,
} from "lib/shop-box-config";
import { priceOfDraft } from "lib/shop-box-pricing";
import {
  applySelection,
  canSelectInCategory,
  categoryRowsForBuilder,
  isBoxComplete,
  removeSelection,
  totalItemCount,
} from "lib/shop-box-rules";
import { formatVariantLabel, optionsFromVariant } from "lib/product-variants";
import type { BoxCatalog, BoxCatalogProduct } from "lib/supabase/shop-box-products";
import type { ProductVariant } from "lib/types";

function selectionFromProduct(
  product: BoxCatalogProduct,
  variant: ProductVariant,
): BoxSelectionItem {
  return {
    id: `${product.id}-${variant.id}-${Date.now()}`,
    productId: product.id,
    variantId: variant.id,
    categoryKey: product.categoryKey,
    title: product.title,
    handle: product.handle,
    imageUrl: product.featuredImage?.url ?? "",
    variantLabel: formatVariantLabel(
      optionsFromVariant(variant),
      variant.title,
    ),
    sku: variant.sku,
    unitPrice: singlePriceForCategory(product.categoryKey),
    quantity: 1,
    maxQuantity: variant.maxQuantity,
  };
}

export function BoxBuilder({
  boxType,
  catalog,
  lockedCategory,
  comboId,
}: {
  boxType: BoxTypeId;
  catalog: BoxCatalog;
  lockedCategory?: BoxCategoryKey;
  comboId?: BoxPairComboId;
}) {
  const router = useRouter();
  const { addBoxItem, stockError, clearStockError } = useCart();
  const [step, setStep] = useState<BoxBuilderStep>("choose");
  const [draft, setDraft] = useState<BoxDraft>(() =>
    emptyBoxDraft(boxType, comboId),
  );
  const [sizeProduct, setSizeProduct] = useState<BoxCatalogProduct | null>(
    null,
  );
  const [messageError, setMessageError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const skipStepScroll = useRef(true);

  useEffect(() => {
    setDraft(emptyBoxDraft(boxType, comboId));
    setStep("choose");
  }, [boxType, comboId, lockedCategory]);

  useEffect(() => {
    clearStockError();
  }, [clearStockError, step]);

  useEffect(() => {
    if (skipStepScroll.current) {
      skipStepScroll.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const categoryRows = categoryRowsForBuilder({
    type: boxType,
    lockedCategory,
    comboId,
  });

  const complete = isBoxComplete(draft);
  const messageOk = draft.giftMessage.trim().length > 0;
  const pendingVariantProduct = sizeProduct;
  const selectedCount = totalItemCount(draft.items);

  const handlePickProduct = (product: BoxCatalogProduct) => {
    if (!product.available) return;
    const gate = canSelectInCategory(draft, product.categoryKey);
    if (!gate.ok && !gate.replaces) {
      setSubmitError(gate.reason ?? "You cannot add that piece.");
      return;
    }
    setSubmitError(null);
    if (productNeedsVariantChoice(product)) {
      setSizeProduct(product);
      return;
    }
    const variant = defaultVariantForProduct(product);
    if (!variant?.available) return;
    setDraft((current) =>
      applySelection(current, selectionFromProduct(product, variant)),
    );
  };

  const handleConfirmVariant = (variant: ProductVariant) => {
    if (!sizeProduct) return;
    setDraft((current) =>
      applySelection(current, selectionFromProduct(sizeProduct, variant)),
    );
    setSizeProduct(null);
  };

  const goReview = () => {
    if (!complete) return;
    setStep("review");
  };

  const goMessage = () => {
    if (!complete) {
      setStep("choose");
      return;
    }
    setStep("message");
  };

  const handleCheckout = () => {
    const trimmed = draft.giftMessage.trim();
    if (!trimmed) {
      setMessageError("A gift message is required.");
      return;
    }
    if (trimmed.length > BOX_GIFT_MESSAGE_MAX) {
      setMessageError(
        `Keep the message under ${BOX_GIFT_MESSAGE_MAX} characters.`,
      );
      return;
    }
    setMessageError(null);
    setSubmitError(null);

    let added = false;
    flushSync(() => {
      added = addBoxItem({
        type: draft.type,
        comboId: draft.comboId,
        giftMessage: trimmed,
        contents: draft.items,
        boxPrice: priceOfDraft({ ...draft, giftMessage: trimmed }),
      });
    });

    if (!added) {
      setSubmitError(stockError ?? "Could not add this box to your bag.");
      return;
    }

    router.push("/checkout");
  };

  const summaryCta = useMemo(() => {
    if (step === "choose") return "Review your box →";
    if (step === "review")
      return complete ? "Add a message →" : "Choose a piece →";
    return "Checkout →";
  }, [step, complete]);

  const onSummaryContinue = () => {
    if (step === "choose") goReview();
    else if (step === "review") {
      if (!complete) {
        setStep("choose");
        return;
      }
      goMessage();
    } else handleCheckout();
  };

  const canContinue =
    step === "choose"
      ? complete
      : step === "review"
        ? true
        : complete && messageOk;

  const headingExtra =
    boxType === "b" && comboId
      ? PAIR_COMBO_META[comboId].label
      : boxType === "c" && lockedCategory
        ? categoryRows[0]?.label
        : null;

  const cart = (
    <BoxCartPanel
      draft={draft}
      canContinue={canContinue}
      onContinue={onSummaryContinue}
      onChange={step !== "choose" ? () => setStep("choose") : undefined}
      cta={summaryCta}
    />
  );

  return (
    <div>
      <Link
        href="/shop"
        className={`${bpBodyClass} text-bp-text/65 transition-colors hover:text-bp-accent`}
      >
        ← Choose a box type
      </Link>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-14">
        <div className="min-w-0 pb-24 lg:pb-0">
          <SectionEyebrow>Build your box</SectionEyebrow>
          <h1
            className={`${bpTitleClass} ${bpTitleUtility} mt-2 text-[clamp(2.4rem,6vw,4.25rem)] font-bold uppercase leading-[0.92] text-bp-text`}
          >
            {boxTypeLabel(boxType)}
            {headingExtra ? (
              <span className="mt-2 block text-[clamp(1.25rem,3vw,2rem)] font-bold normal-case tracking-normal text-bp-accent">
                {headingExtra}
              </span>
            ) : null}
          </h1>
          <p className={`${bpBodyClass} mt-4 max-w-xl text-bp-text/75`}>
            {boxTypeIntro(boxType).lead}
          </p>
          {boxType === "d" ? (
            <p className={`${bpBodyClass} mt-2 text-bp-accent`}>
              {selectedCount} of 3 pieces selected
              {selectedCount === 2
                ? " · 7% off"
                : selectedCount === 3
                  ? " · 10% off"
                  : ""}
            </p>
          ) : null}

          <div className="mt-8 lg:hidden">{cart}</div>

          <div className="mt-8">
            <BoxStepIndicator
              current={step}
              complete={complete}
              messageOk={messageOk}
              onStepSelect={setStep}
            />
          </div>

          {step === "choose" ? (
            <div className="mt-4">
              <p
                className={`${bpBodyClass} border-b border-bp-text/10 py-6 text-bp-text/70`}
              >
                {boxTypeIntro(boxType).choose}
              </p>
              {categoryRows.map((row) => {
                const selectedId = draft.items.find(
                  (item) => item.categoryKey === row.key,
                )?.productId;
                return (
                  <BoxCategorySection
                    key={row.key}
                    categoryKey={row.key}
                    label={row.label}
                    products={catalog[row.key]}
                    selectedProductId={
                      boxType === "d" ? undefined : selectedId
                    }
                    selected={
                      boxType === "d"
                        ? draft.items.some(
                            (item) => item.categoryKey === row.key,
                          )
                        : Boolean(selectedId)
                    }
                    onSelectProduct={handlePickProduct}
                  />
                );
              })}
            </div>
          ) : null}

          {step === "review" ? (
            <div className="mt-8">
              <BoxReview
                draft={draft}
                onEdit={() => setStep("choose")}
                onRemove={(itemId) => {
                  const next = removeSelection(draft, itemId);
                  setDraft(next);
                  if (next.items.length === 0) setStep("choose");
                }}
              />
            </div>
          ) : null}

          {step === "message" ? (
            <div className="mt-8">
              <BoxMessage
                value={draft.giftMessage}
                error={messageError}
                onChange={(value) => {
                  setDraft((current) => ({ ...current, giftMessage: value }));
                  if (value.trim()) setMessageError(null);
                }}
              />
            </div>
          ) : null}

          {submitError || stockError ? (
            <p className="mt-4 text-sm text-red-700" role="alert">
              {submitError ?? stockError}
            </p>
          ) : null}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28">{cart}</div>
        </aside>
      </div>

      <BoxMobileCtaBar
        draft={draft}
        canContinue={canContinue}
        onContinue={onSummaryContinue}
        cta={summaryCta}
      />

      <BoxSizeModal
        key={pendingVariantProduct?.id ?? "size-modal"}
        product={pendingVariantProduct}
        open={Boolean(pendingVariantProduct)}
        onClose={() => setSizeProduct(null)}
        onConfirm={handleConfirmVariant}
      />
    </div>
  );
}
