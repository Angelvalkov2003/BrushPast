import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Caveat, Lora } from "next/font/google";
import {
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Footer from "components/layout/footer";
import { ShopProductCard } from "components/shop/shop-product-card";
import { displayImageUrl } from "lib/image-url";
import { DAVID_STORY } from "lib/stories/david-content";
import { getStoryProductsBySlug } from "lib/supabase/story-products";
import { getPublicStoryBySlug } from "lib/supabase/stories";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const lora = Lora({ subsets: ["latin"], style: ["italic"], weight: ["400", "500"] });
const COPY = DAVID_STORY;

function BrushUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <span
        className="pointer-events-none absolute -bottom-0.5 left-0 h-[0.35em] w-full -skew-x-6 bg-bp-accent/75"
        aria-hidden
      />
    </span>
  );
}

function CoffeeCupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path
        d="M14 22h32v28c0 4-3 7-7 7H21c-4 0-7-3-7-7V22z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path d="M46 26h6c4 0 7 3 7 7s-3 7-7 7h-6" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M22 14c0-4 3-7 10-7s10 3 10 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export async function DavidPage() {
  const [story, products] = await Promise.all([
    getPublicStoryBySlug(COPY.slug),
    getStoryProductsBySlug(COPY.slug),
  ]);

  const heroImage = displayImageUrl(story?.image_url) ?? COPY.heroImage;

  return (
    <div className="bg-bp-canvas text-bp-text">
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

      {/* Hero */}
      <section className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-4 py-12 md:px-10 md:py-16 lg:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">Story</p>
            <h1 className="mt-3 text-[clamp(3rem,10vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-tight">
              {COPY.headline}
            </h1>
            <p className="mt-2 text-lg font-bold uppercase tracking-[0.12em] text-bp-text md:text-xl">
              {COPY.subtitle}
            </p>
            <p className={`${lora.className} mt-8 text-2xl leading-snug md:text-3xl`}>
              &ldquo;{COPY.heroQuote}&rdquo;
            </p>
            <ul className="mt-8 flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.12em] text-bp-text/70">
              <li className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-bp-accent" />
                {COPY.location}
              </li>
              <li className="flex items-center gap-2">
                <CalendarDaysIcon className="h-4 w-4 text-bp-accent" />
                {COPY.year}
              </li>
            </ul>
            <a
              href="#story-body"
              className="mt-10 inline-flex w-fit bg-bp-text px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-bp-canvas hover:opacity-90"
            >
              Read David&apos;s story →
            </a>
          </div>
          <div className="relative min-h-[400px] lg:min-h-[560px]">
            <Image
              src={heroImage}
              alt="David"
              fill
              className="object-cover object-center grayscale"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* The Rooms — three columns */}
      <section
        id="story-body"
        className="scroll-mt-24 border-b border-bp-text/10 bg-bp-surface px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-3 lg:items-start">
          <div className="border border-bp-text/10 bg-[#f5f0e8] p-6 shadow-sm md:p-8">
            <p className={`${caveat.className} text-xl leading-snug text-bp-text md:text-2xl`}>
              &ldquo;{COPY.handwrittenQuote}&rdquo;
            </p>
            <p className="mt-4 text-sm font-semibold text-bp-text/70">— David</p>
          </div>
          <div className="space-y-4 font-serif text-base leading-relaxed text-bp-text/85 md:text-lg">
            {COPY.narrativeMiddle.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
          <div className="space-y-4 font-serif text-base leading-relaxed text-bp-text/85 md:text-lg">
            {COPY.narrativeRight.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Portrait + pull quote */}
      <section className="border-b border-bp-text/10 px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:items-start">
          <div className="relative aspect-square max-w-md overflow-hidden rounded-sm bg-bp-text/5">
            <Image
              src={COPY.portraitImage}
              alt="David at a Brush Past event"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div>
            <p className={`${lora.className} text-[1.65rem] leading-snug text-bp-text md:text-[2rem]`}>
              &ldquo;{COPY.pullQuote}&rdquo;
            </p>
            <div className="mt-8 space-y-4 font-serif text-base leading-relaxed text-bp-text/85 md:text-lg">
              {COPY.reflectionParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="border-b border-bp-text/10 bg-bp-surface px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {COPY.features.map((feature) => (
            <article key={feature.id} className="flex flex-col">
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-sm bg-bp-text/5">
                {"image" in feature && feature.image ? (
                  <Image
                    src={feature.image}
                    alt=""
                    fill
                    className={`object-cover ${"imageGrayscale" in feature && feature.imageGrayscale ? "grayscale" : ""}`}
                    sizes="25vw"
                  />
                ) : feature.icon === "chat" ? (
                  <div className="flex h-full items-center justify-center text-bp-accent">
                    <ChatBubbleLeftRightIcon className="h-20 w-20" strokeWidth={1.1} />
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-bp-accent">
                    <CoffeeCupIcon className="h-20 w-20" />
                  </div>
                )}
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-bp-accent">
                {feature.title}
              </h3>
              <p className="mt-3 flex-1 font-serif text-sm leading-relaxed text-bp-text/80">
                {feature.body}
              </p>
              {"href" in feature && feature.href ? (
                <Link
                  href={feature.href}
                  className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-bp-text hover:text-bp-accent"
                >
                  View shop →
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-bp-accent text-bp-canvas">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-12 md:grid-cols-[1fr_1.4fr_auto] md:items-center md:gap-10 md:px-10 md:py-14">
          <p className={`${caveat.className} text-3xl leading-none md:text-4xl`}>
            <BrushUnderline>{COPY.footerCta.left}</BrushUnderline>
          </p>
          <p className="text-sm leading-relaxed text-bp-canvas/95 md:text-base">
            {COPY.footerCta.center}
          </p>
          <Link
            href={COPY.footerCta.href}
            className="inline-flex shrink-0 justify-center border-2 border-bp-canvas bg-bp-canvas px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-bp-text hover:opacity-90"
          >
            {COPY.footerCta.button} →
          </Link>
        </div>
      </section>

      {products.length > 0 ? (
        <section className="px-4 py-14 md:px-10 md:py-20">
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
        </section>
      ) : null}

      <Footer />
    </div>
  );
}
