import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="border-b border-bp-text/10 bg-bp-canvas">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 md:grid-cols-2 md:items-center md:gap-14 md:px-10 md:py-20">
        <div>
          <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-bold uppercase leading-[1.05] tracking-tight text-bp-text">
            Stories that stay with you.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-bp-text/80 md:text-lg">
            Real stories shared through art, writing, photography and design. Created with
            people rebuilding from homelessness, addiction, incarceration and life&apos;s hardest
            chapters.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/stories"
              className="inline-flex bg-bp-accent px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-bp-canvas transition-opacity hover:opacity-90"
            >
              Explore stories
            </Link>
            <Link
              href="/shop"
              className="inline-flex border-2 border-bp-text px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-bp-text transition-colors hover:bg-bp-text hover:text-bp-canvas"
            >
              Start a collection
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-bp-surface md:aspect-square">
          <Image
            src="/home-hero.png"
            alt="Brush Past — coffee, gift box and story card"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
