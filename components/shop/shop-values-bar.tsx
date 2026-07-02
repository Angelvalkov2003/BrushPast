import Link from "next/link";
import { IndexCard } from "components/home/home-decor";
import { homeHandClass } from "components/home/home-typography";
import { PROFIT_REINVESTMENT } from "lib/site-config";
import { TEXTURE_IMAGES } from "components/shared/texture-section";

const ITEMS = [
  "Real stories. Real people. Real change.",
  PROFIT_REINVESTMENT,
  "Supporting workshops, mentorship and recovery.",
  "Every purchase helps unlock opportunity and purpose.",
];

export function ShopValuesBar() {
  return (
    <section className="relative overflow-hidden border-t border-bp-text/10 bg-bp-dark text-bp-canvas">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${TEXTURE_IMAGES.secondary})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-bp-dark/85" aria-hidden />

      <div className="relative mx-auto max-w-[1400px] px-4 py-14 md:px-10 md:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <IndexCard panelTexture={null} key={item} className="border-bp-canvas/15 bg-bp-dark/40 text-center">
              <p className={`${homeHandClass} text-xl leading-snug text-bp-canvas`}>{item}</p>
            </IndexCard>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/shop#categories"
            className={`${homeHandClass} text-xl text-bp-accent transition-colors hover:text-bp-canvas`}
          >
            Browse all categories →
          </Link>
        </div>
      </div>
    </section>
  );
}
