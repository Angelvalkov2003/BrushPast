import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["400"] });

export function ShopHero() {
  return (
    <header className="border-b border-bp-text/10">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-10 md:grid-cols-2 md:items-center md:gap-12 md:px-10 md:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">The Archive</p>
          <h1 className="mt-2 text-[clamp(2.5rem,8vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-bp-text">
            The Archive Shop
          </h1>
          <p className="mt-6 max-w-md text-sm font-semibold uppercase tracking-wide text-bp-text/80 md:text-base">
            Art, objects and editions created through lived experience.
          </p>
          <p className={`${caveat.className} mt-4 text-2xl text-bp-text/90 md:text-3xl`}>
            Every piece shares a story.
          </p>
          <Link
            href="#categories"
            className="mt-8 inline-flex items-center gap-2 bg-bp-text px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-bp-canvas transition-opacity hover:opacity-90"
          >
            Explore the archive
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-bp-surface md:aspect-[5/4]">
          <Image
            src="/shop-hero.png"
            alt="Archive shop — art, coffee and editions"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </header>
  );
}
