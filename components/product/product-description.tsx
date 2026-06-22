import Link from "next/link";
import type { ProductDetail } from "lib/types";
import { IndexCard } from "components/home/home-decor";
import { homeHandClass, homeSerifClass } from "components/home/home-typography";
import { ProductPurchase } from "./product-purchase";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-dashed border-bp-text/12 py-3 sm:flex-row sm:justify-between sm:gap-4">
      <dt className={`${homeHandClass} text-base text-bp-text/60`}>{label}</dt>
      <dd className={`${homeSerifClass} text-sm text-bp-text/90 sm:text-right`}>{value}</dd>
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
          className={`${homeHandClass} text-lg text-bp-accent hover:underline`}
        >
          {product.categories[0].name}
        </Link>
      ) : null}

      <h1
        className={`${homeHandClass} mt-3 text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[0.95] text-bp-text`}
      >
        {product.title}
      </h1>

      {product.shortDescription ? (
        <p className={`${homeSerifClass} mt-4 text-base italic leading-relaxed text-bp-text/85 md:text-lg`}>
          {product.shortDescription}
        </p>
      ) : null}

      {product.stories.length > 0 ? (
        <div className={`${homeSerifClass} mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-bp-text/75`}>
          {product.stories.map((s) =>
            s.pageUrl ? (
              <Link
                key={s.slug}
                href={s.pageUrl}
                className={`${homeHandClass} text-base text-bp-accent hover:underline`}
              >
                Read {s.title}&apos;s story →
              </Link>
            ) : (
              <span key={s.slug}>
                By <strong className="text-bp-text">{s.title}</strong>
              </span>
            ),
          )}
        </div>
      ) : null}

      <ProductPurchase product={product} />

      {product.fullDescription && product.fullDescription !== product.shortDescription ? (
        <IndexCard className="mt-10">
          <h2 className={`${homeHandClass} text-2xl text-bp-accent`}>About this piece</h2>
          <p className={`${homeSerifClass} mt-4 text-base leading-relaxed text-bp-text/85`}>
            {product.fullDescription}
          </p>
        </IndexCard>
      ) : null}

      <dl className="mt-10">
        <h2 className={`${homeHandClass} mb-3 text-2xl text-bp-text`}>Details</h2>
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
        <IndexCard className="mt-8 border-bp-accent/20 bg-bp-accent/5">
          <h2 className={`${homeHandClass} text-2xl text-bp-accent`}>Your impact</h2>
          {product.profitShareNote ? (
            <p className={`${homeSerifClass} mt-3 text-sm leading-relaxed text-bp-text/85`}>
              {product.profitShareNote}
            </p>
          ) : null}
          {product.impactNote ? (
            <p className={`${homeSerifClass} mt-2 text-sm leading-relaxed text-bp-text/75`}>
              {product.impactNote}
            </p>
          ) : null}
        </IndexCard>
      ) : null}

      {product.qrStoryUrl ? (
        <p className={`${homeSerifClass} mt-6 text-xs text-bp-text/55`}>
          Includes story link:{" "}
          <a href={product.qrStoryUrl} className="text-bp-accent hover:underline">
            {product.qrStoryUrl.replace(/^https?:\/\//, "")}
          </a>
        </p>
      ) : null}
    </div>
  );
}
