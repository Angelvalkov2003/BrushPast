import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { StoryPageShell } from "components/stories/story-texture";
import { displayImageUrl } from "lib/image-url";
import type { RobPoemLine } from "lib/stories/rob-content";
import { ROB_STORY } from "lib/stories/rob-content";
import { getStoryProductsBySlug } from "lib/supabase/story-products";
import { getPublicStoryBySlug } from "lib/supabase/stories";
import { ShopProductCard } from "components/shop/shop-product-card";

const COPY = ROB_STORY;
const bodyClass = `${bpBodyClass} text-[0.98rem] leading-relaxed text-bp-text/88 md:text-[1.05rem]`;

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

function PoemLine({ line }: { line: RobPoemLine }) {
  const className = line.pull
    ? `${homeHandClass} my-3 text-[1.35rem] font-bold leading-snug text-bp-canvas md:text-[1.5rem]`
    : line.emphasis
      ? `${homeHandClass} text-[1.15rem] font-bold leading-snug text-bp-canvas/95 md:text-[1.25rem]`
      : `${bpBodyClass} text-[0.95rem] italic leading-relaxed text-bp-canvas/80 md:text-[1.02rem]`;

  return <p className={className}>{renderHighlight(line.text, line.highlight)}</p>;
}

/** Flatten stanzas into two balanced columns for the dark poem band */
function splitPoemColumns(
  stanzas: readonly { readonly lines: readonly RobPoemLine[] }[],
): [RobPoemLine[], RobPoemLine[]] {
  const lines: RobPoemLine[] = stanzas.flatMap((s) => [...s.lines]);
  const mid = Math.ceil(lines.length / 2);
  return [lines.slice(0, mid), lines.slice(mid)];
}

export async function RobPage() {
  const [story, products] = await Promise.all([
    getPublicStoryBySlug(COPY.slug),
    getStoryProductsBySlug(COPY.slug),
  ]);

  const heroImage = displayImageUrl(story?.image_url) ?? COPY.heroImage;
  const storyParagraphs = COPY.storyColumns.flatMap((c) => c.paragraphs);
  const [poemLeft, poemRight] = splitPoemColumns([...COPY.poemStanzas]);

  return (
    <StoryPageShell>
      {/* Upper: story + single artwork */}
      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-4 py-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.75fr)] md:items-start md:gap-12 md:px-10 md:py-12 lg:gap-16">
          <div>
            <Link
              href="/stories"
              className="text-[10px] font-semibold uppercase tracking-[0.2em] text-bp-text/55 hover:text-bp-accent hover:underline"
            >
              ← Back to stories
            </Link>

            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-bp-accent">
              {COPY.poemTitle}
            </p>
            <h1
              className={`${PAGE_HERO_H1_STORY_CLASS} mt-2 text-[clamp(3rem,8vw,5.25rem)]`}
            >
              {COPY.title}
            </h1>
            <p className="mt-2 text-[10px] font-semibold uppercase italic tracking-[0.16em] text-bp-text/50">
              {COPY.credits.words} · {COPY.credits.photography}
            </p>
            <p
              className={`${bpTitleClass} ${bpTitleUtility} mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-bp-text/70`}
            >
              {COPY.tags}
            </p>

            {/* Quote box */}
            <div className="mt-8 max-w-lg border border-bp-text/15 bg-bp-canvas/40 px-5 py-5 md:px-6 md:py-6">
              <p
                className={`${homeHandClass} text-[1.45rem] leading-snug text-bp-text md:text-[1.65rem]`}
              >
                &ldquo;I am just a{" "}
                <BrushUnderline>{COPY.heroQuoteHighlight}</BrushUnderline> in
                your perfect system.&rdquo;
              </p>
              <span
                className="mt-4 block h-1 w-12 bg-bp-accent"
                aria-hidden
              />
            </div>

            <div className="mt-10 max-w-xl">
              <h2
                className={`${bpTitleClass} ${bpTitleUtility} text-sm font-bold uppercase tracking-[0.18em] text-bp-accent`}
              >
                {COPY.storyHeading}
              </h2>
              <div className="mt-5 space-y-4">
                {storyParagraphs.map((block) => (
                  <p
                    key={block.text.slice(0, 40)}
                    className={
                      block.pull
                        ? `${homeHandClass} text-[1.25rem] leading-snug text-bp-text md:text-[1.35rem]`
                        : bodyClass
                    }
                  >
                    {renderHighlight(block.text, block.highlight)}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Single image — compact, editorial */}
          <aside className="md:sticky md:top-28 md:justify-self-end">
            <figure className="mx-auto w-full max-w-[300px] md:mx-0 md:max-w-[320px]">
              <div className="border border-bp-text/10 bg-bp-canvas p-2.5 shadow-[4px_5px_0_rgba(1,2,0,0.05)] sm:p-3">
                <div className="relative aspect-[3/4] overflow-hidden bg-bp-text/5">
                  <Image
                    src={heroImage}
                    alt="Artwork by Rob"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="320px"
                  />
                </div>
              </div>
              <figcaption
                className={`${bpBodySmClass} mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-bp-text/45`}
              >
                {COPY.artworkCaption}
              </figcaption>
            </figure>
          </aside>
        </div>
      </RevealSection>

      {/* Poem — dark two-column band */}
      <RevealSection className="bg-bp-text text-bp-canvas">
        <div className="mx-auto max-w-[1100px] px-4 py-14 md:px-10 md:py-16">
          <p className="text-center text-[10px] font-semibold uppercase italic tracking-[0.28em] text-bp-canvas/45">
            [{COPY.title}&apos;s poem]
          </p>
          <p
            className={`${homeHandClass} mt-4 text-center text-lg text-bp-canvas/70 md:text-xl`}
          >
            {COPY.poemIntro}
          </p>

          <div className="relative mt-10 grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div
              className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-bp-canvas/15 md:block"
              aria-hidden
            />
            <div className="space-y-1.5 md:pr-4">
              <span className="text-3xl text-bp-accent/80" aria-hidden>
                &ldquo;
              </span>
              {poemLeft.map((line, i) => (
                <PoemLine key={`l-${i}-${line.text.slice(0, 24)}`} line={line} />
              ))}
            </div>
            <div className="space-y-1.5 md:pl-4">
              {poemRight.map((line, i) => (
                <PoemLine key={`r-${i}-${line.text.slice(0, 24)}`} line={line} />
              ))}
              <span
                className="mt-2 block text-right text-3xl text-bp-accent/80"
                aria-hidden
              >
                &rdquo;
              </span>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Closing */}
      <RevealSection>
        <div className="mx-auto flex max-w-[1100px] flex-col gap-5 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <p
            className={`${bpTitleClass} ${bpTitleUtility} text-xs font-bold uppercase tracking-[0.18em] text-bp-text/60`}
          >
            Real stories. Real change.
          </p>
          <HomeCta href="/stories" variant="primary" className="shrink-0">
            Explore more stories →
          </HomeCta>
        </div>
      </RevealSection>

      {products.length > 0 ? (
        <RevealSection className="border-t border-bp-text/10 px-4 py-14 md:px-10 md:py-16">
          <div className="mx-auto max-w-[1100px]">
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
