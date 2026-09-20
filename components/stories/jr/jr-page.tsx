import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDaysIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Footer from "components/layout/footer";
import { HomeCta } from "components/home/home-decor";
import {
  bpBodyClass,
  bpBodySmClass,
  bpTitleClass,
  bpTitleUtility,
  homeHandClass,
  PAGE_HERO_H1_STORY_CLASS,
} from "components/home/home-typography";
import { RevealSection } from "components/shared/reveal-section";
import { StoryPageShell, StoryPanel } from "components/stories/story-texture";
import { ShopProductCard } from "components/shop/shop-product-card";
import { displayImageUrl } from "lib/image-url";
import type { JrStoryLine } from "lib/stories/jr-content";
import { JR_STORY } from "lib/stories/jr-content";
import { getStoryProductsBySlug } from "lib/supabase/story-products";
import { getPublicStoryBySlug } from "lib/supabase/stories";

const COPY = JR_STORY;
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

function renderHighlight(text: string, highlight?: string) {
  if (!highlight) return text;
  const idx = text.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <BrushUnderline>{text.slice(idx, idx + highlight.length)}</BrushUnderline>
      {text.slice(idx + highlight.length)}
    </>
  );
}

function StoryLine({ line }: { line: JrStoryLine }) {
  const className = line.emphasis
    ? `${homeHandClass} text-[1.25rem] font-bold leading-snug text-bp-text md:text-[1.4rem]`
    : `${homeHandClass} text-[1.1rem] leading-relaxed text-bp-text/90 md:text-[1.2rem]`;

  return (
    <p className={className}>{renderHighlight(line.text, line.highlight)}</p>
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
      <p className={`${homeHandClass} mt-3 text-sm text-bp-text/55`}>- JR</p>
    </StoryPanel>
  );
}

export async function JrPage() {
  const [story, products] = await Promise.all([
    getPublicStoryBySlug(COPY.slug),
    getStoryProductsBySlug(COPY.slug),
  ]);

  const heroImage = displayImageUrl(story?.image_url) ?? COPY.heroImage;
  const heroQuote = story?.short_description ?? COPY.heroQuote;
  const highlight = COPY.heroQuoteHighlight;
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

      {/* Hero — LOVE painting once */}
      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-10 md:grid-cols-2 md:items-stretch md:gap-12 md:px-10 md:py-12">
          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-bp-accent">
              Artist story
            </p>
            <h1
              className={`${PAGE_HERO_H1_STORY_CLASS} mt-2 text-[clamp(3.25rem,8vw,5.5rem)]`}
            >
              {COPY.artistHeadline}
            </h1>
            <span
              className="mt-3 block h-1 w-20 bg-bp-accent/90 [clip-path:polygon(0_0,100%_20%,98%_100%,2%_80%)]"
              aria-hidden
            />
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
            <ul className="mt-7 flex flex-wrap gap-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-bp-text/60">
              <li className="flex items-center gap-1.5">
                <UserIcon className="h-3.5 w-3.5 text-bp-accent" />
                JR
              </li>
              <li className="flex items-center gap-1.5">
                <MapPinIcon className="h-3.5 w-3.5 text-bp-accent" />
                {COPY.location}
              </li>
              <li className="flex items-center gap-1.5">
                <CalendarDaysIcon className="h-3.5 w-3.5 text-bp-accent" />
                {COPY.year}
              </li>
            </ul>
            <p className={`${bpBodySmClass} mt-3 text-bp-text/50`}>
              {COPY.organisation}
            </p>
          </div>

          <div>
            <div className="relative min-h-[400px] md:min-h-[540px]">
              <div className="absolute inset-0 overflow-hidden border border-bp-text/12 bg-bp-canvas shadow-[6px_8px_0_rgba(1,2,0,0.06)]">
                <Image
                  src={heroImage}
                  alt="JR — LOVE painting"
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
              LOVE
            </p>
          </div>
        </div>
      </RevealSection>

      {/* My story + study-blue */}
      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start md:gap-12 md:px-10 md:py-16">
          <div>
            <h2
              className={`${bpTitleClass} ${bpTitleUtility} text-[clamp(1.75rem,3.5vw,2.35rem)] font-bold uppercase tracking-wide text-bp-accent`}
            >
              {COPY.myStory.title}
            </h2>
            <div className="mt-6 space-y-3.5">
              {COPY.myStory.lines.map((line) => (
                <StoryLine key={line.text} line={line} />
              ))}
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[380px] md:mx-0 md:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden border border-bp-text/12 bg-bp-canvas shadow-[4px_5px_0_rgba(1,2,0,0.05)]">
              <Image
                src={IMG.study}
                alt="JR study — blue wash"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </div>
            <figcaption
              className={`${homeHandClass} mt-3 text-center text-sm text-bp-text/50 md:text-left`}
            >
              Study
            </figcaption>
          </figure>
        </div>
      </RevealSection>

      {/* Making forward + forest */}
      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-12 md:px-10 md:py-16">
          <figure className="order-2 md:order-1">
            <div className="relative mx-auto aspect-[3/4] max-w-[400px] overflow-hidden border border-bp-text/12 bg-bp-canvas shadow-[4px_5px_0_rgba(1,2,0,0.05)] md:mx-0 md:max-w-none">
              <Image
                src={IMG.forest}
                alt="JR painting — forest"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </div>
          </figure>
          <div className="order-1 md:order-2">
            <h2
              className={`${bpTitleClass} ${bpTitleUtility} text-[clamp(1.75rem,3.5vw,2.35rem)] font-bold uppercase tracking-wide text-bp-accent`}
            >
              {COPY.makingForward.title}
            </h2>
            <div className="mt-6 space-y-4">
              {COPY.makingForward.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className={bodyClass}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* About artwork + windows + dog — each once */}
      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto max-w-[1200px] px-4 py-14 md:px-10 md:py-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-start md:gap-12">
            <div>
              <h2
                className={`${bpTitleClass} ${bpTitleUtility} text-[clamp(1.75rem,3.5vw,2.35rem)] font-bold uppercase tracking-wide text-bp-accent`}
              >
                {COPY.aboutTheArtwork.title}
              </h2>
              <div className="mt-6 space-y-4">
                {COPY.aboutTheArtwork.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className={bodyClass}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <figure>
                <div className="relative aspect-square overflow-hidden border border-bp-text/12 bg-bp-canvas shadow-[3px_4px_0_rgba(1,2,0,0.05)]">
                  <Image
                    src={IMG.windows}
                    alt="JR abstract — windows"
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                </div>
              </figure>
              <figure>
                <div className="relative aspect-square overflow-hidden border border-bp-text/12 bg-bp-canvas shadow-[3px_4px_0_rgba(1,2,0,0.05)]">
                  <Image
                    src={IMG.dog}
                    alt="JR drawing — dog"
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                </div>
                <figcaption
                  className={`${homeHandClass} mt-2 text-center text-sm text-bp-text/50`}
                >
                  Sketch
                </figcaption>
              </figure>
            </div>
          </div>
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

      {/* Closing */}
      <RevealSection>
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-10 md:py-14">
          <p
            className={`${homeHandClass} max-w-xl text-[1.55rem] leading-snug text-bp-text md:text-[1.85rem]`}
          >
            &ldquo;{COPY.closingQuote}&rdquo;
            <span className="mt-2 block text-base text-bp-text/55">- JR</span>
          </p>
          <HomeCta href="/stories" variant="primary" className="shrink-0">
            Explore more stories →
          </HomeCta>
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
