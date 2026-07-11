import { StoryPageShell, StoryPanel } from "components/stories/story-texture";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { RevealSection } from "components/shared/reveal-section";
import Footer from "components/layout/footer";
import { ShopProductCard } from "components/shop/shop-product-card";
import { displayImageUrl } from "lib/image-url";
import type { GeorgeParagraph } from "lib/stories/george-content";
import { GEORGE_STORY } from "lib/stories/george-content";
import { getStoryProductsBySlug } from "lib/supabase/story-products";
import { getPublicStoryBySlug } from "lib/supabase/stories";
import { bpWhisperUtility, homeHandClass } from "components/home/home-typography";

const COPY = GEORGE_STORY;

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

function HandDivider() {
  return (
    <svg
      className="my-6 w-full max-w-[120px] text-bp-accent/70"
      viewBox="0 0 120 8"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 5C28 2 52 7 78 4C96 2 108 3 118 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function renderHighlightedText(text: string, highlight?: string) {
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

function StoryParagraph({ block }: { block: GeorgeParagraph }) {
  if (block.pull) {
    return (
      <blockquote
        className={`${homeHandClass} relative my-6 border-l-[3px] border-bp-accent py-1 pl-5 text-[1.65rem] leading-snug text-bp-text md:text-[1.85rem]`}
      >
        <span className="absolute -left-2 top-2 text-2xl text-bp-accent/40" aria-hidden>
          ❝
        </span>
        {renderHighlightedText(block.text, block.highlight)}
      </blockquote>
    );
  }

  const sizeClass = block.emphasis
    ? "text-[1.35rem] leading-snug md:text-[1.5rem]"
    : "text-[1.2rem] leading-relaxed md:text-[1.3rem]";

  return (
    <p className={`${homeHandClass} ${sizeClass} text-bp-text/92`}>
      {renderHighlightedText(block.text, block.highlight)}
    </p>
  );
}

const COLUMN_MARKERS = ["I", "II"];

export async function GeorgePage() {
  const [story, products] = await Promise.all([
    getPublicStoryBySlug(COPY.slug),
    getStoryProductsBySlug(COPY.slug),
  ]);

  const heroImage = displayImageUrl(story?.image_url) ?? COPY.heroImage;

  const heroQuote = COPY.heroQuote;
  const highlight = COPY.heroQuoteHighlight;
  const highlightIdx = heroQuote.toLowerCase().indexOf(highlight.toLowerCase());
  const quoteBefore = highlightIdx >= 0 ? heroQuote.slice(0, highlightIdx) : heroQuote;
  const quoteAfter = highlightIdx >= 0 ? heroQuote.slice(highlightIdx + highlight.length) : "";

  return (
    <StoryPageShell>
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
              Story
            </p>
            <h1 className="mt-2 text-[clamp(3rem,10vw,5.5rem)] uppercase leading-[0.88] tracking-tighter text-bp-text">
              {COPY.title}
            </h1>
            <p className="mt-3 text-lg font-bold uppercase tracking-[0.14em] text-bp-text/80 md:text-xl">
              {COPY.subtitle}
            </p>
            <p className={`${homeHandClass} ${bpWhisperUtility} mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-bp-text/75`}>
              {COPY.tags}
            </p>
            <StoryPanel className="relative mt-8 max-w-lg rotate-[0.25deg] border border-bp-text/25 p-6 shadow-[6px_6px_0_rgba(60,45,30,0.12)] md:p-8" tint="bg-[#f0ebe3]/88">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.3]"
                aria-hidden
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(transparent, transparent 27px, #d5ccc0 27px, #d5ccc0 28px)",
                }}
              />
              <p
                className={`${homeHandClass} relative z-10 text-[1.45rem] leading-snug text-bp-text md:text-[1.65rem]`}
              >
                {quoteBefore}
                {highlightIdx >= 0 ? <BrushUnderline>{highlight}</BrushUnderline> : null}
                {quoteAfter}
              </p>
            </StoryPanel>
          </div>

          <div className="relative flex items-center justify-center bg-[#e5ddd2] px-4 py-8 md:px-10 lg:py-12">
            <div
              className="relative aspect-[4/5] w-full max-w-md overflow-hidden shadow-[8px_8px_0_rgba(1,2,0,0.08)]"
              style={{
                clipPath: "polygon(5% 1%, 99% 0%, 100% 98%, 2% 100%, 0% 72%, 4% 40%)",
              }}
            >
              <Image
                src={heroImage}
                alt="George - artist image for Brush Past"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="relative overflow-hidden border-b border-bp-text/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          aria-hidden
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 31px, #d0c6b8 31px, #d0c6b8 32px)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-4 py-14 md:px-10 md:py-20">
          <p
            className={`${homeHandClass} mx-auto mb-14 max-w-2xl text-center text-xl text-bp-text/80 md:text-2xl`}
          >
            {COPY.storyIntro}
          </p>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
            {COPY.storyColumns.map((column, colIdx) => (
              <StoryPanel
                key={colIdx}
                className="relative border-t-2 border-bp-text/10 px-5 py-8 md:px-6 md:py-10"
              >
                <span
                  className={`${homeHandClass} absolute -top-5 left-4 bg-[#faf6f0]/95 px-2 text-3xl text-bp-accent md:text-4xl`}
                  aria-hidden
                >
                  {COLUMN_MARKERS[colIdx]}
                </span>
                <div className="space-y-5">
                  {column.paragraphs.map((block, i) => (
                    <div key={block.text.slice(0, 32)}>
                      {i > 0 && i % 2 === 0 ? <HandDivider /> : null}
                      <StoryParagraph block={block} />
                    </div>
                  ))}
                </div>
              </StoryPanel>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="border-b border-bp-text/10 px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-[1400px] gap-6 lg:grid-cols-3 lg:gap-8">
          <StoryPanel className="flex flex-col border border-bp-text/15">
            <div className="bg-bp-text px-4 py-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-bp-canvas">
                {COPY.studio.title}
              </h2>
            </div>
            <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
              <div className="space-y-5">
                {COPY.studio.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 48)}
                    className={`${homeHandClass} text-[1.25rem] leading-relaxed text-bp-text/90 md:text-[1.35rem]`}
                  >
                    {p}
                  </p>
                ))}
              </div>
              <p
                className={`${homeHandClass} mt-8 text-[1.75rem] leading-tight text-bp-text md:text-[2rem]`}
              >
                <BrushUnderline>{COPY.studio.quote}</BrushUnderline>
              </p>
            </div>
          </StoryPanel>

          <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden border border-bp-text/15 bg-[#ebe4d9] p-8 shadow-[inset_0_2px_12px_rgba(0,0,0,0.05)]">
            <div className="absolute inset-0 opacity-40" aria-hidden>
              <div className="h-full w-full bg-[linear-gradient(#c8bdb0_1px,transparent_1px)] bg-[length:100%_28px]" />
            </div>
            <p
              className={`${homeHandClass} relative z-10 max-w-xs rotate-[-1deg] text-center text-[1.5rem] leading-snug text-bp-text/90 md:text-[1.75rem]`}
            >
              {COPY.notebookQuote}
            </p>
          </div>

          <div className="flex min-h-[300px] items-center justify-center bg-bp-text p-8 md:p-10">
            <p
              className={`${homeHandClass} text-center text-[1.65rem] leading-snug text-bp-canvas md:text-[1.95rem]`}
            >
              <BrushUnderline>{COPY.closingQuote}</BrushUnderline>
            </p>
          </div>
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
    </StoryPageShell>
  );
}
