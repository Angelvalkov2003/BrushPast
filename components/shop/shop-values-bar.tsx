import Link from "next/link";
import { PROFIT_REINVESTMENT } from "lib/site-config";

const ITEMS = [
  { title: "Real stories. Real people. Real change." },
  { title: PROFIT_REINVESTMENT },
  { title: "Supporting workshops, mentorship and recovery." },
  { title: "Every purchase helps unlock opportunity and purpose." },
];

export function ShopValuesBar() {
  return (
    <section className="border-t border-bp-text/10 bg-bp-surface px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <p key={item.title} className="text-sm font-semibold uppercase leading-snug tracking-wide text-bp-text/80">
            {item.title}
          </p>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-[1400px] text-right">
        <Link
          href="/shop"
          className="text-xs font-bold uppercase tracking-[0.2em] text-bp-accent hover:underline"
        >
          Browse all categories →
        </Link>
      </div>
    </section>
  );
}
