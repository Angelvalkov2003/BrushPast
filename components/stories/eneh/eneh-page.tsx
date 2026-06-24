import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Caveat, Lora } from "next/font/google";
import { RevealSection } from "components/shared/reveal-section";
import Footer from "components/layout/footer";
import { ShopProductCard } from "components/shop/shop-product-card";
import { displayImageUrl } from "lib/image-url";
import type { EnehPhoto } from "lib/stories/eneh-content";
import { ENEH_STORY } from "lib/stories/eneh-content";
import { getStoryProductsBySlug } from "lib/supabase/story-products";
import { getPublicStoryBySlug } from "lib/supabase/stories";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const lora = Lora({ subsets: ["latin"], style: ["italic"], weight: ["400", "500"] });
const COPY = ENEH_STORY;

function BrushUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <span
        className="pointer-events-none absolute -bottom-0.5 left-0 h-[0.35em] w-full -skew-x-6 bg-bp-accent/80"
        aria-hidden
      />
    </span>
  );
}

function PhotoCard({ photo, index }: { photo: EnehPhoto; index: number }) {
  const rotate = ["rotate-[-0.6deg]", "rotate-[0.5deg]", "rotate-[-0.4deg]", "rotate-[0.7deg]", "rotate-[-0.3deg]"][
    index % 5
  ];

  return (
    <figure className={`group ${rotate}`}>
      <div className="relative aspect-[4/5] overflow-hidden border border-bp-text/15 bg-[#f5f0e8] shadow-[5px_5px_0_rgba(1,2,0,0.06)]">
        <Image
          src={photo.src}
          alt={photo.caption ?? `Eneh's day - photo ${index + 1}`}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {photo.caption ? (
        <figcaption
          className={`${caveat.className} mt-5 px-1 text-center text-[1.35rem] leading-snug text-bp-text/90 md:text-[1.5rem]`}
        >
          {photo.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export async function EnehPage() {
  const [story, products] = await Promise.all([
    getPublicStoryBySlug(COPY.slug),
    getStoryProductsBySlug(COPY.slug),
  ]);

  const heroImage = displayImageUrl(story?.image_url) ?? COPY.heroImage;

  return (
    <div className="bg-[#f9f6f0] text-bp-text">
      <div className="px-4 py-4 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Link
            href="/stories"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-bp-text/70 hover:text-bp-accent hover:underline"
          >
            ← Back to stories
          </Link>
        </div>
      </div>

      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-center px-4 py-10 md:px-10 md:py-14 lg:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bp-accent">
              Photography
            </p>
            <h1 className="mt-3 text-[clamp(2.25rem,7vw,4.5rem)] font-black uppercase leading-[0.92] tracking-tight">
              {COPY.headline}
            </h1>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-bp-text/70">
              {COPY.title} · {COPY.tags}
            </p>
            <p
              className={`${lora.className} mt-8 max-w-lg text-xl leading-relaxed text-bp-text/85 md:text-2xl`}
            >
              {COPY.intro}
            </p>
          </div>

          <div className="relative flex items-center justify-center px-4 py-8 md:px-10 lg:py-12">
            <div
              className="relative aspect-[4/5] w-full max-w-md overflow-hidden border-8 border-bp-canvas shadow-[10px_10px_0_rgba(191,50,1,0.08)]"
              style={{ transform: "rotate(1.2deg)" }}
            >
              <Image
                src={heroImage}
                alt="Eneh - day in photos"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="border-b border-bp-text/10 px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {COPY.photos.map((photo, i) => (
              <PhotoCard key={photo.src} photo={photo} index={i} />
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="border-b border-bp-text/10 bg-bp-canvas px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto flex max-w-[1400px] justify-center">
          <p
            className={`${caveat.className} max-w-2xl text-center text-[1.75rem] leading-snug text-bp-text md:text-[2rem]`}
          >
            <BrushUnderline>{COPY.closingQuote}</BrushUnderline>
          </p>
        </div>
      </RevealSection>

      {products.length > 0 ? (
        <RevealSection className="border-b border-bp-text/10 px-4 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1400px]">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">
              From this story
            </p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-wide md:text-3xl">
              Take a piece home
            </h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <li key={product.id}>
                  <ShopProductCard product={product} />
                </li>
              ))}
            </ul>
          </div>
        </RevealSection>
      ) : null}

      <Footer />
    </div>
  );
}
