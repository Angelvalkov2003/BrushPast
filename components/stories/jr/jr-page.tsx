import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";
import {
  CalendarDaysIcon,
  MapPinIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Footer from "components/layout/footer";
import { ShopProductCard } from "components/shop/shop-product-card";
import { displayImageUrl } from "lib/image-url";
import type { JrStoryLine } from "lib/stories/jr-content";
import { JR_STORY } from "lib/stories/jr-content";
import { getStoryProductsBySlug } from "lib/supabase/story-products";
import { getPublicStoryBySlug } from "lib/supabase/stories";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const COPY = JR_STORY;

const PAPER_BG = {
  backgroundColor: "#f4efe6",
  backgroundImage:
    "radial-gradient(ellipse at 20% 30%, rgba(191,50,1,0.04) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(0,0,0,0.03) 0%, transparent 50%)",
};

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
    ? `${caveat.className} text-[1.35rem] font-bold leading-snug text-bp-text md:text-[1.5rem]`
    : `${caveat.className} text-[1.2rem] leading-relaxed text-bp-text/90 md:text-[1.3rem]`;

  return <p className={className}>{renderHighlight(line.text, line.highlight)}</p>;
}

function PaintbrushJarIcon() {
  return (
    <svg viewBox="0 0 80 96" className="mx-auto mt-8 h-24 w-20 text-bp-text/35" aria-hidden>
      <path
        d="M28 88h24v4H28z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M22 36c0-8 6-14 18-14s18 6 18 14v44H22V36z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M30 20l6-14M40 18V4M50 20l-6-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M26 52h28M26 62h28" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
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
    <article
      className={`relative border border-bp-text/15 bg-[#faf6ef] p-5 shadow-[3px_4px_0_rgba(0,0,0,0.06)] ${rotate}`}
    >
      <div
        className="pointer-events-none absolute -top-2 left-1/2 h-6 w-10 -translate-x-1/2 bg-bp-canvas/60 shadow-sm"
        aria-hidden
      />
      <h3 className={`${caveat.className} text-2xl font-bold text-bp-accent`}>{title}</h3>
      <p className={`${caveat.className} mt-3 text-lg leading-snug text-bp-text/85`}>&ldquo;{quote}&rdquo;</p>
      <p className={`${caveat.className} mt-4 text-base text-bp-text/60`}>— JR</p>
    </article>
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
  const highlightIdx = heroQuote.toLowerCase().indexOf(highlight);
  const quoteBefore = highlightIdx >= 0 ? heroQuote.slice(0, highlightIdx) : heroQuote;
  const quoteAfter = highlightIdx >= 0 ? heroQuote.slice(highlightIdx + highlight.length) : "";

  return (
    <div className="text-bp-text" style={PAPER_BG}>
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
          <div className="flex flex-col justify-center px-4 py-10 md:px-10 md:py-14 lg:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">
              Artist story
            </p>
            <h1 className="mt-3 text-[clamp(4rem,14vw,7.5rem)] font-black uppercase leading-[0.82] tracking-tighter">
              {COPY.artistHeadline}
            </h1>
            <span className="mt-3 block h-1 w-24 max-w-[40%] bg-bp-accent/90 [clip-path:polygon(0_0,100%_20%,98%_100%,2%_80%)]" aria-hidden />
            <div className="relative mt-8 max-w-xl">
              <span className="absolute -left-1 -top-2 text-5xl text-bp-accent/70" aria-hidden>
                &ldquo;
              </span>
              <p className={`${caveat.className} pl-6 text-[1.85rem] leading-snug text-bp-text md:text-[2.15rem]`}>
                {quoteBefore}
                {highlightIdx >= 0 ? <BrushUnderline>{highlight}</BrushUnderline> : null}
                {quoteAfter}
              </p>
              <span className="mt-1 block text-right text-5xl text-bp-accent/70" aria-hidden>
                &rdquo;
              </span>
            </div>
            <ul className="mt-8 flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.12em] text-bp-text/70">
              <li className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-bp-accent" />
                JR
              </li>
              <li className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-bp-accent" />
                {COPY.location}
              </li>
              <li className="flex items-center gap-2">
                <CalendarDaysIcon className="h-4 w-4 text-bp-accent" />
                {COPY.year}
              </li>
            </ul>
          </div>
          <div className="relative min-h-[320px] lg:min-h-[480px]">
            <Image
              src={heroImage}
              alt="JR — Love painting"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Three columns + gallery */}
      <section className="border-b border-bp-text/10 px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 xl:grid-cols-[1.6fr_1fr]">
          <div className="grid gap-0 md:grid-cols-3">
            <div className="border-b border-dashed border-bp-text/20 px-4 py-6 md:border-b-0 md:border-r md:py-0 md:pr-6">
              <h2 className={`${caveat.className} text-2xl font-bold uppercase tracking-wide text-bp-accent md:text-3xl`}>
                {COPY.myStory.title}
              </h2>
              <div className="mt-6 space-y-4">
                {COPY.myStory.lines.map((line) => (
                  <StoryLine key={line.text} line={line} />
                ))}
              </div>
            </div>
            <div className="border-b border-dashed border-bp-text/20 px-4 py-6 md:border-b-0 md:border-r md:py-0 md:px-6">
              <h2 className={`${caveat.className} text-2xl font-bold uppercase tracking-wide text-bp-accent md:text-3xl`}>
                {COPY.inMyWords.title}
              </h2>
              <div className="mt-6 space-y-5">
                {COPY.inMyWords.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className={`${caveat.className} text-[1.15rem] leading-relaxed text-bp-text/88 md:text-[1.25rem]`}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="px-4 py-6 md:py-0 md:pl-6">
              <h2 className={`${caveat.className} text-2xl font-bold uppercase tracking-wide text-bp-accent md:text-3xl`}>
                {COPY.aboutTheArtwork.title}
              </h2>
              <div className="mt-6 space-y-5">
                {COPY.aboutTheArtwork.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className={`${caveat.className} text-[1.15rem] leading-relaxed text-bp-text/88 md:text-[1.25rem]`}>
                    {p}
                  </p>
                ))}
              </div>
              <PaintbrushJarIcon />
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative aspect-[5/3] overflow-hidden rounded-sm bg-bp-text/5 shadow-sm">
              <Image
                src={COPY.gallery.main}
                alt="JR artwork — Love painting"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 40vw"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {COPY.gallery.grid.map((src, i) => (
                <div key={`${src}-${i}`} className="relative aspect-square overflow-hidden rounded-sm bg-bp-text/5">
                  <Image
                    src={src}
                    alt={`JR artwork ${i + 1}`}
                    fill
                    className="object-cover"
                    style={{ objectPosition: `${20 + (i % 3) * 25}% ${30 + (i % 2) * 20}%` }}
                    sizes="120px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fragments + portrait */}
      <section className="relative overflow-hidden border-b border-bp-text/10 px-4 py-14 md:px-10 md:py-20">
        <div
          className="pointer-events-none absolute right-[8%] top-[12%] h-24 w-24 rounded-full bg-bp-accent/10 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[18%] left-[6%] h-20 w-20 rounded-full bg-yellow-500/15 blur-xl"
          aria-hidden
        />
        <div className="mx-auto max-w-[1400px]">
          <h2 className={`${caveat.className} text-center text-3xl font-bold uppercase tracking-[0.2em] text-bp-accent md:text-4xl`}>
            {COPY.fragments.title}
          </h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <div className="grid gap-6 sm:grid-cols-2">
              {COPY.fragments.items.map((item, i) => (
                <FragmentCard
                  key={item.title}
                  title={item.title}
                  quote={item.quote}
                  rotate={["rotate-[-1deg]", "rotate-[1deg]", "rotate-[-0.5deg]", "rotate-[1.5deg]"][i] ?? ""}
                />
              ))}
            </div>
            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-[1.2fr_1fr] sm:items-end">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-bp-text/5 shadow-md">
                  <Image
                    src={COPY.gallery.portrait}
                    alt="Portrait sketch"
                    fill
                    className="object-cover object-top grayscale"
                    sizes="(max-width: 640px) 100vw, 280px"
                  />
                </div>
                <p className={`${caveat.className} text-[1.75rem] leading-tight text-bp-text md:text-[2rem]`}>
                  {COPY.gallery.portraitCaption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-bp-text/10 bg-bp-canvas/80">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-10 md:py-12">
          <div className="flex items-start gap-4">
            <UserGroupIcon className="h-9 w-9 shrink-0 text-bp-accent/80" strokeWidth={1.2} />
            <p className="max-w-lg text-sm leading-relaxed text-bp-text/85 md:text-base">
              {COPY.cta.left}{" "}
              <BrushUnderline>{COPY.cta.highlight}</BrushUnderline> {COPY.cta.right}
            </p>
          </div>
          <Link
            href="/contact#contact-form"
            className="shrink-0 border-2 border-bp-accent px-8 py-3 text-center text-xs font-bold uppercase tracking-[0.15em] text-bp-accent hover:bg-bp-accent hover:text-bp-canvas"
          >
            {COPY.cta.button}
          </Link>
        </div>
      </section>

      {/* Closing quote */}
      <section className="relative overflow-hidden border-b border-bp-text/10 px-4 py-12 md:px-10 md:py-16">
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 bg-[#e8dfd0] opacity-80 [clip-path:polygon(0_35%,3%_28%,8%_40%,14%_25%,22%_38%,30%_22%,40%_36%,50%_20%,60%_34%,70%_24%,78%_38%,86%_26%,94%_36%,100%_30%,100%_70%,0_68%)]"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <svg viewBox="0 0 48 44" className="h-10 w-10 shrink-0 text-bp-accent" aria-hidden>
            <path
              d="M24 40c-8-6-16-14-16-22 0-6 4-10 10-10 4 0 7 2 9 6 2-4 5-6 9-6 6 0 10 4 10 10 0 8-8 16-16 22z"
              fill="currentColor"
            />
          </svg>
          <p className={`${caveat.className} max-w-3xl text-[1.65rem] leading-snug text-bp-text md:text-[2rem]`}>
            &ldquo;{COPY.closingQuote}&rdquo;
            <span className="mt-2 block text-lg text-bp-text/70">— JR</span>
          </p>
          <div className="flex gap-2" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-bp-text/80" />
            <span className="h-2 w-2 rounded-full bg-bp-accent/70" />
            <span className="h-4 w-4 rounded-full bg-yellow-600/50" />
          </div>
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
