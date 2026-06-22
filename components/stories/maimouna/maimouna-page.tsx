import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Caveat, Lora } from "next/font/google";
import { RevealSection } from "components/shared/reveal-section";
import Footer from "components/layout/footer";
import { ShopProductCard } from "components/shop/shop-product-card";
import { displayImageUrl } from "lib/image-url";
import type { MaimounaLyricLine, MaimounaSection } from "lib/stories/maimouna-content";
import { MAIMOUNA_STORY } from "lib/stories/maimouna-content";
import { getStoryProductsBySlug } from "lib/supabase/story-products";
import { getPublicStoryBySlug } from "lib/supabase/stories";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const lora = Lora({ subsets: ["latin"], style: ["italic"], weight: ["400", "500"] });
const COPY = MAIMOUNA_STORY;

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

function renderLine(line: MaimounaLyricLine) {
  if (!line.highlight) {
    return line.text;
  }
  const idx = line.text.toLowerCase().indexOf(line.highlight.toLowerCase());
  if (idx < 0) return line.text;
  return (
    <>
      {line.text.slice(0, idx)}
      <BrushUnderline>{line.text.slice(idx, idx + line.highlight.length)}</BrushUnderline>
      {line.text.slice(idx + line.highlight.length)}
    </>
  );
}

function LyricSection({
  section,
  isChorus,
  showImage,
  imageSrc,
}: {
  section: MaimounaSection;
  isChorus: boolean;
  showImage?: boolean;
  imageSrc?: string;
}) {
  return (
    <div
      className={
        isChorus
          ? "bg-bp-dark text-bp-canvas"
          : "border border-bp-text/12 bg-bp-canvas"
      }
    >
      <div className="grid lg:grid-cols-[1fr_auto] lg:items-stretch">
        <div className="px-6 py-10 md:px-10 md:py-12">
          <p
            className={`text-[10px] font-bold uppercase tracking-[0.28em] ${
              isChorus ? "text-bp-canvas/55" : "text-bp-accent"
            }`}
          >
            [{section.label}]
          </p>
          <div className="mt-6 space-y-3 md:space-y-4">
            {section.lines.map((line) => (
              <p
                key={`${section.label}-${line.text}`}
                className={`${caveat.className} ${
                  line.emphasis
                    ? "text-[1.75rem] font-bold leading-snug md:text-[2rem]"
                    : "text-[1.35rem] leading-relaxed md:text-[1.5rem]"
                } ${isChorus ? "text-bp-canvas/95" : "text-bp-text/90"}`}
              >
                {renderLine(line)}
              </p>
            ))}
          </div>
        </div>
        {showImage && imageSrc ? (
          <div className="relative min-h-[280px] border-t border-bp-text/10 lg:min-h-0 lg:w-[min(42vw,420px)] lg:border-l lg:border-t-0">
            <Image
              src={imageSrc}
              alt="Maimouna Camara"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 420px"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export async function MaimounaPage() {
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

      {/* Hero */}
      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-center px-4 py-10 md:px-10 md:py-14 lg:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">
              {COPY.artist}
            </p>
            <h1 className="mt-3 text-[clamp(3rem,11vw,6rem)] font-black uppercase leading-[0.88] tracking-tighter">
              {COPY.title}
            </h1>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-bp-text/70">
              {COPY.artistName}
            </p>
            <p
              className={`${lora.className} mt-6 text-lg text-bp-text/75 md:text-xl`}
            >
              Song title:{" "}
              <span className="font-medium text-bp-text">{COPY.songTitle}*</span>
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-bp-text/60">
              {COPY.tags}
            </p>
            <div className="relative mt-8 max-w-lg rotate-[-0.35deg] border border-bp-text/20 bg-[#f3ebe3] p-6 shadow-[5px_5px_0_rgba(191,50,1,0.1)] md:p-8">
              <p
                className={`${caveat.className} text-[1.65rem] leading-snug text-bp-text md:text-[1.85rem]`}
              >
                {quoteBefore}
                {highlightIdx >= 0 ? (
                  <BrushUnderline>{COPY.heroQuoteHighlight}</BrushUnderline>
                ) : null}
                {quoteAfter}
              </p>
            </div>
          </div>

          <div className="relative flex min-h-[380px] items-center justify-center bg-[#e8e0d6] px-4 py-8 md:min-h-[480px] md:px-10">
            <div
              className="relative aspect-[4/5] w-full max-w-md overflow-hidden shadow-[10px_10px_0_rgba(1,2,0,0.07)]"
              style={{
                clipPath:
                  "polygon(4% 2%, 98% 0%, 100% 96%, 2% 100%, 0% 72%, 3% 38%)",
              }}
            >
              <Image
                src={heroImage}
                alt="Maimouna Camara — Mighty Culture"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Lyrics */}
      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-10 md:py-14">
          <p
            className={`${lora.className} mx-auto max-w-2xl text-center text-xl text-bp-text/75 md:text-2xl`}
          >
            {COPY.intro}
          </p>
        </div>

        <div className="mx-auto max-w-[1400px] space-y-0 px-4 pb-14 md:px-10 md:pb-20">
          {COPY.sections.map((section, i) => (
            <LyricSection
              key={`${section.label}-${i}`}
              section={section}
              isChorus={section.label === "Chorus"}
              showImage={i === 0}
              imageSrc={i === 0 ? COPY.secondaryImage : undefined}
            />
          ))}
        </div>
      </RevealSection>

      {/* Footnote + closing */}
      <RevealSection className="border-b border-bp-text/10 bg-bp-surface/50 px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-[1400px] gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="border border-bp-text/12 bg-bp-canvas p-8 md:p-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-bp-accent">
              Note
            </p>
            <p className={`${lora.className} mt-4 text-base leading-relaxed text-bp-text/75 md:text-lg`}>
              {COPY.inspirationNote}
            </p>
          </div>
          <div className="flex items-center justify-center bg-bp-text p-8 md:p-10">
            <p
              className={`${caveat.className} max-w-md text-center text-[1.65rem] leading-snug text-bp-canvas md:text-[1.95rem]`}
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
