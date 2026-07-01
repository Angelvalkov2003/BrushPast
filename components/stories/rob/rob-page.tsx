import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { RevealSection } from "components/shared/reveal-section";
import Footer from "components/layout/footer";
import { ShopProductCard } from "components/shop/shop-product-card";
import { displayImageUrl } from "lib/image-url";
import type { RobParagraph, RobPoemLine } from "lib/stories/rob-content";
import { ROB_STORY } from "lib/stories/rob-content";
import { getStoryProductsBySlug } from "lib/supabase/story-products";
import { getPublicStoryBySlug } from "lib/supabase/stories";
import { bpSubtitleClass, homeHandClass } from "components/home/home-typography";

const COPY = ROB_STORY;

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

function PoemLine({ line, dark }: { line: RobPoemLine; dark?: boolean }) {
  if (line.pull) {
    return (
      <p
        className={`${homeHandClass} my-4 text-[1.85rem] font-bold leading-snug md:text-[2.1rem] ${
          dark ? "text-bp-canvas" : "text-bp-text"
        }`}
      >
        {renderHighlight(line.text, line.highlight)}
      </p>
    );
  }

  return (
    <p
      className={`${homeHandClass} ${
        line.emphasis
          ? "text-[1.7rem] font-bold leading-snug md:text-[1.95rem]"
          : "text-[1.35rem] leading-relaxed md:text-[1.5rem]"
      } ${dark ? "text-bp-canvas/95" : "text-bp-text/90"}`}
    >
      {renderHighlight(line.text, line.highlight)}
    </p>
  );
}

function StoryParagraph({ block }: { block: RobParagraph }) {
  if (block.pull) {
    return (
      <blockquote
        className={`${homeHandClass} relative my-6 border-l-[3px] border-bp-accent py-1 pl-5 text-[1.65rem] leading-snug text-bp-text md:text-[1.85rem]`}
      >
        <span className="absolute -left-2 top-2 text-2xl text-bp-accent/40" aria-hidden>
          ❝
        </span>
        {renderHighlight(block.text, block.highlight)}
      </blockquote>
    );
  }

  const sizeClass = block.emphasis
    ? "text-[1.3rem] leading-snug md:text-[1.45rem]"
    : "text-[1.15rem] leading-relaxed md:text-[1.25rem]";

  return (
    <p className={`${homeHandClass} ${sizeClass} text-bp-text/92`}>
      {renderHighlight(block.text, block.highlight)}
    </p>
  );
}

const COLUMN_MARKERS = ["I", "II", "III"];

export async function RobPage() {
  const [story, products] = await Promise.all([
    getPublicStoryBySlug(COPY.slug),
    getStoryProductsBySlug(COPY.slug),
  ]);

  const heroImage = displayImageUrl(story?.image_url) ?? COPY.heroImage;
  const highlightIdx = COPY.heroQuote.toLowerCase().indexOf(COPY.heroQuoteHighlight.toLowerCase());
  const quoteBefore = highlightIdx >= 0 ? COPY.heroQuote.slice(0, highlightIdx) : COPY.heroQuote;
  const quoteAfter =
    highlightIdx >= 0 ? COPY.heroQuote.slice(highlightIdx + COPY.heroQuoteHighlight.length) : "";

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
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-bp-accent">
              {COPY.poemTitle}
            </p>
            <h1 className="mt-2 text-[clamp(3.5rem,12vw,6.5rem)] uppercase leading-[0.85] tracking-tighter">
              {COPY.title}
            </h1>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-bp-text/60">
              {COPY.credits.words} · {COPY.credits.photography}
            </p>
            <p className={`${bpSubtitleClass} mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-bp-text/75`}>
              {COPY.tags}
            </p>
            <div className="relative mt-8 max-w-lg rotate-[-0.4deg] border border-bp-text/25 bg-bp-dark p-6 shadow-[6px_6px_0_rgba(191,50,1,0.15)] md:p-8">
              <p
                className={`${homeHandClass} text-[1.55rem] leading-snug text-bp-canvas md:text-[1.75rem]`}
              >
                {quoteBefore}
                {highlightIdx >= 0 ? (
                  <BrushUnderline>{COPY.heroQuoteHighlight}</BrushUnderline>
                ) : null}
                {quoteAfter}
              </p>
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[560px]">
            <Image
              src={heroImage}
              alt="Rob - Glitch"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </RevealSection>

      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-10 md:py-12">
          <p
            className={`${homeHandClass} text-center text-2xl text-bp-text/80 md:text-3xl`}
          >
            {COPY.poemIntro}
          </p>
        </div>

        <div className="mx-auto max-w-[1400px] space-y-0 px-4 pb-14 md:px-10 md:pb-16">
          {COPY.poemStanzas.map((stanza, i) => {
            const dark = i % 2 === 1;
            return (
              <div
                key={i}
                className={`px-6 py-10 md:px-12 md:py-12 ${
                  dark ? "bg-bp-dark text-bp-canvas" : "border border-bp-text/12 bg-[#f7f3ec]"
                }`}
              >
                <div className="mx-auto max-w-2xl space-y-2">
                  {stanza.lines.map((line) => (
                    <PoemLine key={line.text} line={line} dark={dark} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </RevealSection>

      <RevealSection className="relative overflow-hidden border-b border-bp-text/10 bg-bp-surface/30">
        <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-10 md:py-16">
          <h2 className="text-center text-[clamp(2rem,6vw,3.5rem)] font-black uppercase tracking-tight">
            {COPY.storyHeading}
          </h2>
          <p
            className={`${homeHandClass} mx-auto mt-6 max-w-2xl text-center text-xl text-bp-text/75 md:text-2xl`}
          >
            {COPY.storyIntro}
          </p>
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          aria-hidden
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 31px, #d4c9bc 31px, #d4c9bc 32px)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-4 pb-14 md:px-10 md:pb-20">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
            {COPY.storyColumns.map((column, colIdx) => (
              <div
                key={colIdx}
                className="relative border-t-2 border-bp-text/10 bg-bp-canvas/85 px-5 py-8 md:px-6 md:py-10"
              >
                <span
                  className={`${homeHandClass} absolute -top-5 left-4 bg-bp-canvas px-2 text-3xl text-bp-accent md:text-4xl`}
                  aria-hidden
                >
                  {COLUMN_MARKERS[colIdx]}
                </span>
                <div className="space-y-5">
                  {column.paragraphs.map((block) => (
                    <StoryParagraph key={block.text.slice(0, 32)} block={block} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="border-b border-bp-text/10 px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-[1400px] gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="flex flex-col border border-bp-text/15 bg-bp-canvas">
            <div className="bg-bp-text px-4 py-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-bp-canvas">
                {COPY.glitchNote.title}
              </h2>
            </div>
            <div className="flex flex-1 items-center p-6 md:p-8">
              <p
                className={`${homeHandClass} text-[2rem] leading-tight text-bp-text md:text-[2.35rem]`}
              >
                <BrushUnderline>{COPY.glitchNote.quote}</BrushUnderline>
              </p>
            </div>
          </div>

          <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden border border-bp-text/15 bg-[#ebe4d8] p-8">
            <p
              className={`${homeHandClass} relative z-10 max-w-sm text-center text-[1.5rem] leading-snug text-bp-text/90 md:text-[1.75rem]`}
            >
              {COPY.notebookQuote}
            </p>
          </div>

          <div className="flex min-h-[280px] items-center justify-center bg-bp-text p-8 md:p-10">
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
    </div>
  );
}
