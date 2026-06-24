import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Caveat, Lora } from "next/font/google";
import { RevealSection } from "components/shared/reveal-section";
import Footer from "components/layout/footer";
import { ShopProductCard } from "components/shop/shop-product-card";
import { displayImageUrl } from "lib/image-url";
import type { EdBeerbohmParagraph } from "lib/stories/ed-beerbohm-content";
import { ED_BEERBOHM_STORY } from "lib/stories/ed-beerbohm-content";
import { getStoryProductsBySlug } from "lib/supabase/story-products";
import { getPublicStoryBySlug } from "lib/supabase/stories";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const lora = Lora({ subsets: ["latin"], style: ["italic"], weight: ["400", "500"] });
const COPY = ED_BEERBOHM_STORY;

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

function StoryParagraph({ block }: { block: EdBeerbohmParagraph }) {
  if (block.pull) {
    return (
      <blockquote
        className={`${caveat.className} relative my-6 border-l-[3px] border-bp-accent py-1 pl-5 text-[1.65rem] leading-snug text-bp-text md:text-[1.85rem]`}
      >
        <span className="absolute -left-2 top-2 text-2xl text-bp-accent/40" aria-hidden>
          ❝
        </span>
        {renderHighlightedText(block.text, block.highlight)}
      </blockquote>
    );
  }

  const sizeClass = block.emphasis
    ? "text-[1.3rem] leading-snug md:text-[1.45rem]"
    : "text-[1.15rem] leading-relaxed md:text-[1.28rem]";

  return (
    <p className={`${caveat.className} ${sizeClass} text-bp-text/92`}>
      {renderHighlightedText(block.text, block.highlight)}
    </p>
  );
}

const COLUMN_MARKERS = ["I", "II", "III"];

export async function EdBeerbohmPage() {
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

      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-center px-4 py-10 md:px-10 md:py-14 lg:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bp-accent">
              Art &amp; film
            </p>
            <h1 className="mt-3 text-[clamp(2.5rem,9vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tighter">
              {COPY.title}
            </h1>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-bp-text/75">
              {COPY.tags}
            </p>
            <div className="relative mt-8 max-w-lg rotate-[0.25deg] border border-bp-text/20 bg-[#f0ebe3] p-6 shadow-[6px_6px_0_rgba(80,60,40,0.1)] md:p-8">
              <p
                className={`${lora.className} relative z-10 text-[1.35rem] leading-relaxed text-bp-text md:text-[1.5rem]`}
              >
                {quoteBefore}
                {highlightIdx >= 0 ? <BrushUnderline>{highlight}</BrushUnderline> : null}
                {quoteAfter}
              </p>
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[560px]">
            <Image
              src={heroImage}
              alt="Ed Beerbohm"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </RevealSection>

      <RevealSection className="relative overflow-hidden border-b border-bp-text/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          aria-hidden
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 31px, #d5cdc3 31px, #d5cdc3 32px)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-4 py-14 md:px-10 md:py-20">
          <p
            className={`${lora.className} mx-auto mb-14 max-w-2xl text-center text-xl text-bp-text/80 md:text-2xl`}
          >
            {COPY.storyIntro}
          </p>

          <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
            {COPY.storyColumns.map((column, colIdx) => (
              <div
                key={colIdx}
                className="relative border-t-2 border-bp-text/10 bg-bp-canvas/85 px-5 py-8 md:px-6 md:py-10"
              >
                <span
                  className={`${caveat.className} absolute -top-5 left-4 bg-bp-canvas px-2 text-3xl text-bp-accent md:text-4xl`}
                  aria-hidden
                >
                  {COLUMN_MARKERS[colIdx]}
                </span>
                <div className="space-y-5">
                  {column.paragraphs.map((block, i) => (
                    <div key={block.text.slice(0, 32)}>
                      {i > 0 && i % 3 === 0 ? <HandDivider /> : null}
                      <StoryParagraph block={block} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="border-b border-bp-text/10 bg-[#ebe5dc] px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-[1400px] gap-6 sm:grid-cols-2">
          {COPY.galleryImages.map((src, i) => (
            <div
              key={src}
              className={`relative aspect-[4/3] overflow-hidden border border-bp-text/15 shadow-[6px_6px_0_rgba(1,2,0,0.06)] ${
                i === 0 ? "sm:mt-8" : "sm:-mt-4"
              }`}
              style={{ transform: `rotate(${i === 0 ? -0.8 : 0.6}deg)` }}
            >
              <Image
                src={src}
                alt={`Ed Beerbohm - artwork ${i + 2}`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </RevealSection>

      <RevealSection className="border-b border-bp-text/10 bg-bp-surface/40 px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-[1400px] gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="flex flex-col border border-bp-text/15 bg-bp-canvas">
            <div className="bg-bp-text px-4 py-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-bp-canvas">
                {COPY.interior.title}
              </h2>
            </div>
            <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
              <div className="space-y-5">
                {COPY.interior.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 48)}
                    className={`${caveat.className} text-[1.2rem] leading-relaxed text-bp-text/90 md:text-[1.3rem]`}
                  >
                    {p}
                  </p>
                ))}
              </div>
              <p
                className={`${caveat.className} mt-8 text-[1.65rem] leading-tight text-bp-text md:text-[1.85rem]`}
              >
                <BrushUnderline>{COPY.interior.quote}</BrushUnderline>
              </p>
            </div>
          </div>

          <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden border border-bp-text/15 bg-[#e5ddd2] p-8">
            <p
              className={`${caveat.className} relative z-10 max-w-sm text-center text-[1.5rem] leading-snug text-bp-text/90 md:text-[1.7rem]`}
            >
              {COPY.notebookQuote}
            </p>
          </div>

          <div className="flex min-h-[300px] items-center justify-center bg-bp-text p-8 md:p-10">
            <p
              className={`${caveat.className} text-center text-[1.55rem] leading-snug text-bp-canvas md:text-[1.85rem]`}
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
    </div>
  );
}
