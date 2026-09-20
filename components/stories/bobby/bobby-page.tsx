import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import Footer from "components/layout/footer";
import { HomeCta } from "components/home/home-decor";
import {
  bpBodyClass,
  bpTitleClass,
  bpTitleUtility,
  homeHandClass,
  PAGE_HERO_H1_STORY_CLASS,
} from "components/home/home-typography";
import { RevealSection } from "components/shared/reveal-section";
import { StoryPageShell, StoryPanel } from "components/stories/story-texture";
import { ShopProductCard } from "components/shop/shop-product-card";
import { BOBBY_STORY } from "lib/stories/bobby-content";
import { getStoryProductsBySlug } from "lib/supabase/story-products";

const COPY = BOBBY_STORY;
const IMG = COPY.images;
const bodyClass = `${bpBodyClass} text-[1rem] leading-relaxed text-bp-text/88 md:text-[1.05rem]`;

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

function FragmentCard({
  title,
  quote,
  rotate,
}: {
  title: string;
  quote: string;
  rotate: string;
}) {
  return (
    <StoryPanel
      as="article"
      className={`relative border border-bp-text/12 p-5 shadow-[2px_3px_0_rgba(0,0,0,0.05)] ${rotate}`}
    >
      <h3 className={`${homeHandClass} text-xl font-bold text-bp-accent`}>
        {title}
      </h3>
      <p className={`${homeHandClass} mt-3 text-lg leading-snug text-bp-text/85`}>
        &ldquo;{quote}&rdquo;
      </p>
      <p className={`${homeHandClass} mt-3 text-sm text-bp-text/55`}>- Bobby</p>
    </StoryPanel>
  );
}

export async function BobbyPage() {
  const products = await getStoryProductsBySlug(COPY.slug);
  const highlight = COPY.heroQuoteHighlight;
  const heroQuote = COPY.heroQuote;
  const highlightIdx = heroQuote.toLowerCase().indexOf(highlight.toLowerCase());
  const quoteBefore =
    highlightIdx >= 0 ? heroQuote.slice(0, highlightIdx) : heroQuote;
  const quoteAfter =
    highlightIdx >= 0
      ? heroQuote.slice(highlightIdx + highlight.length)
      : "";

  return (
    <StoryPageShell>
      <div className="px-4 py-4 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/stories"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-bp-text/70 hover:text-bp-accent hover:underline"
          >
            ← Back to stories
          </Link>
        </div>
      </div>

      {/* Hero — Suicide painting once */}
      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-10 md:grid-cols-2 md:items-stretch md:gap-12 md:px-10 md:py-12">
          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-bp-accent">
              Artist story
            </p>
            <h1
              className={`${PAGE_HERO_H1_STORY_CLASS} mt-2 text-[clamp(3.25rem,8vw,5.5rem)]`}
            >
              {COPY.headline}
            </h1>
            <span
              className="mt-3 block h-1 w-20 bg-bp-accent/90 [clip-path:polygon(0_0,100%_20%,98%_100%,2%_80%)]"
              aria-hidden
            />
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-bp-text/70">
              {COPY.subtitle}
            </p>
            <div className="relative mt-8 max-w-xl">
              <span
                className="absolute -left-0.5 -top-1 text-4xl text-bp-accent/70"
                aria-hidden
              >
                &ldquo;
              </span>
              <p
                className={`${homeHandClass} pl-5 text-[1.6rem] leading-snug text-bp-text md:text-[1.9rem]`}
              >
                {quoteBefore}
                {highlightIdx >= 0 ? (
                  <BrushUnderline>{highlight}</BrushUnderline>
                ) : null}
                {quoteAfter}
              </p>
            </div>
            <p
              className={`${homeHandClass} mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-bp-text/60 md:text-xs`}
            >
              {COPY.tags.join(" • ")}
            </p>
          </div>

          <div>
            <div className="relative min-h-[400px] md:min-h-[540px]">
              <div className="absolute inset-0 overflow-hidden border border-bp-text/12 bg-bp-canvas shadow-[6px_8px_0_rgba(1,2,0,0.06)]">
                <Image
                  src={IMG.hero}
                  alt="Bobby — Suicide painting"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <p
              className={`${homeHandClass} mt-3 text-center text-base text-bp-text/50 md:text-right`}
            >
              Suicide
            </p>
          </div>
        </div>
      </RevealSection>

      {/* Intro + mohawk */}
      <RevealSection
        id="story-body"
        className="scroll-mt-24 border-b border-bp-text/10"
      >
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start md:gap-12 md:px-10 md:py-16">
          <div>
            <p
              className={`${homeHandClass} text-[1.45rem] leading-snug text-bp-text md:text-[1.7rem]`}
            >
              &ldquo;
              <BrushUnderline>{COPY.introPullQuote}</BrushUnderline>
              &rdquo;
            </p>
            <div className="mt-6 space-y-4">
              {COPY.introBody.map((p) => (
                <p key={p.slice(0, 48)} className={bodyClass}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[380px] md:mx-0 md:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden border border-bp-text/12 bg-bp-canvas shadow-[4px_5px_0_rgba(1,2,0,0.05)]">
              <Image
                src={IMG.mohawk}
                alt="Bobby — mohawk portrait"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </div>
            <figcaption
              className={`${homeHandClass} mt-3 text-center text-sm text-bp-text/50 md:text-left`}
            >
              Portrait
            </figcaption>
          </figure>
        </div>
      </RevealSection>

      {/* In his words + human-beans */}
      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-12 md:px-10 md:py-16">
          <figure className="order-2 md:order-1">
            <div className="relative mx-auto aspect-[3/4] max-w-[400px] overflow-hidden border border-bp-text/12 bg-bp-canvas shadow-[4px_5px_0_rgba(1,2,0,0.05)] md:mx-0 md:max-w-none">
              <Image
                src={IMG.humanBeans}
                alt="Bobby — Human Beans / Man in a Can"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </div>
            <figcaption
              className={`${homeHandClass} mt-3 text-center text-sm text-bp-text/50 md:text-left`}
            >
              Human Beans
            </figcaption>
          </figure>
          <div className="order-1 md:order-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-bp-accent">
              {COPY.inHisWords.title}
            </p>
            <p
              className={`${homeHandClass} mt-5 text-[1.45rem] leading-snug text-bp-text md:text-[1.65rem]`}
            >
              <span className="text-4xl leading-none text-bp-accent/80">
                &ldquo;
              </span>
              {COPY.inHisWords.quote}
            </p>
            <div className="mt-6 space-y-4">
              {COPY.inHisWords.paragraphs.map((p) => (
                <p key={p.slice(0, 48)} className={bodyClass}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* About artwork + systema */}
      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start md:gap-12 md:px-10 md:py-16">
          <div>
            <h2
              className={`${bpTitleClass} ${bpTitleUtility} text-[clamp(1.75rem,3.5vw,2.35rem)] font-bold uppercase tracking-wide text-bp-accent`}
            >
              {COPY.aboutArtwork.title}
            </h2>
            <div className="mt-6 space-y-4">
              {COPY.aboutArtwork.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className={bodyClass}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[400px] md:mx-0 md:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden border border-bp-text/12 bg-bp-canvas shadow-[4px_5px_0_rgba(1,2,0,0.05)]">
              <Image
                src={IMG.systema}
                alt="Bobby — Systema Non Laborad"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </div>
            <figcaption
              className={`${homeHandClass} mt-3 text-center text-sm text-bp-text/50 md:text-left`}
            >
              Systema Non Laborad
            </figcaption>
          </figure>
        </div>
      </RevealSection>

      {/* Fragments — text only, no repeated photos */}
      <RevealSection className="border-b border-bp-text/10 px-4 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2
            className={`${homeHandClass} text-center text-3xl font-bold uppercase tracking-[0.18em] text-bp-accent`}
          >
            {COPY.fragments.title}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {COPY.fragments.items.map((item, i) => (
              <FragmentCard
                key={item.title}
                title={item.title}
                quote={item.quote}
                rotate={
                  [
                    "rotate-[-0.6deg]",
                    "rotate-[0.7deg]",
                    "rotate-[-0.4deg]",
                    "rotate-[0.5deg]",
                  ][i] ?? ""
                }
              />
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Closing + CTA */}
      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-10 md:py-14">
          <div>
            <p
              className={`${homeHandClass} max-w-xl text-[1.55rem] leading-snug text-bp-text md:text-[1.85rem]`}
            >
              &ldquo;{COPY.closingQuote}&rdquo;
              <span className="mt-2 block text-base text-bp-text/55">
                - Bobby
              </span>
            </p>
            <div className="mt-6 flex items-start gap-3">
              <UserGroupIcon
                className="mt-0.5 h-7 w-7 shrink-0 text-bp-accent/80"
                strokeWidth={1.2}
              />
              <div>
                <p className="max-w-md text-sm leading-relaxed text-bp-text/85">
                  {COPY.cta.left}{" "}
                  <BrushUnderline>{COPY.cta.highlight}</BrushUnderline>{" "}
                  {COPY.cta.right}
                </p>
                <p className="mt-1 text-xs text-bp-text/55">{COPY.cta.aside}</p>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <HomeCta href={COPY.cta.href} variant="primary">
              {COPY.cta.button}
            </HomeCta>
            <HomeCta href="/stories" variant="outline">
              Explore more stories →
            </HomeCta>
          </div>
        </div>
      </RevealSection>

      {products.length > 0 ? (
        <RevealSection className="border-t border-bp-text/10 px-4 py-14 md:px-10 md:py-16">
          <div className="mx-auto max-w-[1200px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-bp-accent">
              From this story
            </p>
            <h2
              className={`${bpTitleClass} ${bpTitleUtility} mt-2 text-2xl font-bold uppercase tracking-wide`}
            >
              Take a piece home
            </h2>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
    </StoryPageShell>
  );
}
