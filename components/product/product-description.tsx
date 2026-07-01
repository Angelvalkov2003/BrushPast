import Image from "next/image";
import Link from "next/link";
import type { ProductDetail } from "lib/types";
import { IndexCard } from "components/home/home-decor";
import { homeHandClass, homeSerifClass } from "components/home/home-typography";
import { ProductPurchase } from "./product-purchase";

const aboutBodyHandClass = `${homeHandClass} text-[1.25rem] leading-relaxed text-bp-text/90 md:text-[1.45rem] md:leading-relaxed`;

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

  const extraCategories =
    product.categories.length > 1
      ? product.categories.map((c) => ({ label: "Collection", value: c.name }))
      : [];

  const detailRows = [
    product.storyNumber ? { label: "Story number", value: product.storyNumber } : null,
    product.productType
      ? { label: "Product type", value: formatProductType(product.productType) }
      : null,
    product.medium ? { label: "Medium", value: product.medium } : null,
    edition ? { label: "Edition", value: edition } : null,
    product.weight ? { label: "Weight", value: product.weight } : null,
    product.dimensions ? { label: "Dimensions", value: product.dimensions } : null,
    ...extraCategories.map((c) => ({ label: c.label, value: c.value })),
  ].filter(Boolean) as { label: string; value: string }[];

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

      <ProductPurchase product={product} />

      {product.fullDescription && product.fullDescription !== product.shortDescription ? (
        <div className="relative mt-10 overflow-hidden border border-bp-text/12 p-6 shadow-[2px_3px_0_rgba(1,2,0,0.06)] md:p-8">
          <Image
            src="/background2.webp"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-bp-accent-bg/78 backdrop-blur-[1px]" aria-hidden />
          <div className="relative z-10">
            <h2 className={`${homeHandClass} text-2xl text-bp-accent md:text-3xl`}>
              About this piece
            </h2>
            <p className={`${aboutBodyHandClass} mt-5`}>{product.fullDescription}</p>
          </div>
        </div>
      ) : null}

      {detailRows.length > 0 ? (
        <dl className="mt-10">
          <h2 className={`${homeHandClass} mb-3 text-2xl text-bp-text`}>Details</h2>
          {detailRows.map((row) => (
            <DetailRow key={`${row.label}-${row.value}`} label={row.label} value={row.value} />
          ))}
        </dl>
      ) : null}

      {product.profitShareNote || product.impactNote ? (
        <IndexCard className="mt-8 border-bp-accent/20 bg-bp-accent-bg">
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

      {product.qrStoryUrl && product.linkedStories.length === 0 ? (
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
