import Grid from "components/grid";
import { GridTileImage } from "components/grid/tile";
import { OutOfStockPlaque } from "components/shop/out-of-stock-plaque";
import { Product } from "lib/types";
import Link from "next/link";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={`/product/${product.handle}`}
            prefetch={true}
            aria-label={
              product.available
                ? product.title
                : `${product.title} — out of stock`
            }
          >
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.price.toString(),
                compareAtAmount: product.compareAtPrice?.toString(),
                currencyCode: "GBP",
              }}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            {!product.available ? <OutOfStockPlaque /> : null}
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
