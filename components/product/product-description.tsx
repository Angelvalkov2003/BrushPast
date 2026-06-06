import Link from "next/link";
import type { ProductDetail } from "lib/types";
import { ProductPurchase } from "./product-purchase";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-bp-text/8 py-3 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-bp-text/55">{label}</dt>
      <dd className="text-sm text-bp-text/90 sm:text-right">{value}</dd>
    </div>
  );
}

function formatProductType(type: string) {
  return type.replace(/-/g, " ");
}

export function ProductDescription({ product }: { product: ProductDetail }) {
  const edition =
    product.editionNumber && product.totalEditionSize
      ? `${product.editionNumber} of ${product.totalEditionSize}`
      : product.totalEditionSize
        ? `Edition of ${product.totalEditionSize}`
        : null;

  return (
    <div className="flex flex-col">
      {product.categories[0] ? (
        <Link
          href={`/shop/${product.categories[0].slug}`}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-bp-accent hover:underline"
        >
          {product.categories[0].name}
        </Link>
      ) : null}

      <h1 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-bold uppercase leading-tight tracking-tight text-bp-text">
        {product.title}
      </h1>

      {product.shortDescription ? (
        <p className="mt-4 text-base leading-relaxed text-bp-text/80">{product.shortDescription}</p>
      ) : null}

      {product.creators.length > 0 || product.stories.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-bp-text/75">
          {product.creators.map((c) => (
            <span key={c.name}>
              By <strong className="text-bp-text">{c.name}</strong>
            </span>
          ))}
          {product.stories.map((s) =>
            s.pageUrl ? (
              <Link
                key={s.slug}
                href={s.pageUrl}
                className="font-semibold text-bp-accent hover:underline"
              >
                Read {s.title}&apos;s story →
              </Link>
            ) : null,
          )}
        </div>
      ) : null}

      <ProductPurchase product={product} />

      {product.fullDescription && product.fullDescription !== product.shortDescription ? (
        <div className="mt-10 border-t border-bp-text/10 pt-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-bp-text">About this piece</h2>
          <p className="mt-4 text-base leading-relaxed text-bp-text/85">{product.fullDescription}</p>
        </div>
      ) : null}

      <dl className="mt-10">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-bp-text">Details</h2>
        {product.storyNumber ? <DetailRow label="Story number" value={product.storyNumber} /> : null}
        {product.productType ? (
          <DetailRow label="Product type" value={formatProductType(product.productType)} />
        ) : null}
        {product.medium ? <DetailRow label="Medium" value={product.medium} /> : null}
        {edition ? <DetailRow label="Edition" value={edition} /> : null}
        {product.weight ? <DetailRow label="Weight" value={product.weight} /> : null}
        {product.dimensions ? <DetailRow label="Dimensions" value={product.dimensions} /> : null}
        {product.categories.length > 1
          ? product.categories.map((c) => (
              <DetailRow key={c.slug} label="Collection" value={c.name} />
            ))
          : null}
      </dl>

      {product.profitShareNote || product.impactNote ? (
        <div className="mt-8 border border-bp-accent/25 bg-bp-surface/60 p-5 md:p-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-bp-accent">Your impact</h2>
          {product.profitShareNote ? (
            <p className="mt-3 text-sm leading-relaxed text-bp-text/85">{product.profitShareNote}</p>
          ) : null}
          {product.impactNote ? (
            <p className="mt-2 text-sm leading-relaxed text-bp-text/75">{product.impactNote}</p>
          ) : null}
        </div>
      ) : null}

      {product.qrStoryUrl ? (
        <p className="mt-6 text-xs text-bp-text/55">
          Includes story link:{" "}
          <a href={product.qrStoryUrl} className="text-bp-accent hover:underline">
            {product.qrStoryUrl.replace(/^https?:\/\//, "")}
          </a>
        </p>
      ) : null}
    </div>
  );
}
