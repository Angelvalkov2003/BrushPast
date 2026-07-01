import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDaysIcon,
  MapPinIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { homeHandClass } from "components/home/home-typography";
import { RevealSection } from "components/shared/reveal-section";
import Footer from "components/layout/footer";
import { ShopProductCard } from "components/shop/shop-product-card";
import { displayImageUrl } from "lib/image-url";
import { ROUNDABOUT_MEETING } from "lib/stories/the-roundabout-meeting-content";
import { getStoryArtworkBySlug, getStoryProductsBySlug } from "lib/supabase/story-products";
import { getPublicStoryBySlug } from "lib/supabase/stories";
import { StoryArtworkCarousel } from "./story-artwork-carousel";

const COPY = ROUNDABOUT_MEETING;

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

function formatQuote(text: string): string {
  const t = text.trim();
  if (t.startsWith('"') || t.startsWith("\u201c")) return t;
  return `"${t}"`;
}

export async function RoundaboutMeetingPage() {
  const story = await getPublicStoryBySlug(COPY.slug);
  const [products, artwork] = await Promise.all([
    getStoryProductsBySlug(COPY.slug),
    getStoryArtworkBySlug(COPY.slug),
  ]);

  const heroImage =
    displayImageUrl(story?.image_url) ?? COPY.heroImageFallback;
  const heroQuote = formatQuote(story?.short_description ?? COPY.heroQuote);
  const artistName = story?.creator_name ?? COPY.artistName;
  const firstName = artistName.split(/\s+/)[0] ?? "Jeremy";

  return (
    <div className="bg-bp-canvas text-bp-text">
      <div className="border-b border-bp-text/10 px-4 py-4 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Link
            href="/stories"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-bp-accent hover:underline"
          >
            ← All stories
          </Link>
        </div>
      </div>

      {/* Hero */}
      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-4 py-12 md:px-10 md:py-16 lg:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">
              Artist story
            </p>
            <h1 className="mt-3 text-[clamp(3rem,10vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-tight">
              {COPY.artistHeadline}
            </h1>
            <span className="mt-2 block h-0.5 w-16 bg-bp-accent" aria-hidden />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-bp-text/60">
              {COPY.title}
            </p>
            <p className={`${homeHandClass} mt-8 text-2xl leading-snug md:text-3xl`}>{heroQuote}</p>
            <ul className="mt-8 flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.12em] text-bp-text/70">
              <li className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-bp-accent" />
                {artistName}
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
          <div className="relative min-h-[360px] lg:min-h-[520px]">
            <Image
              src={heroImage}
              alt={artistName}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </RevealSection>

      {/* Bio */}
      <RevealSection className="border-b border-bp-text/10 bg-bp-surface px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-3 lg:items-start">
          <div className="border border-bp-text/10 bg-bp-canvas p-6 shadow-sm md:p-8">
            <p className={`${homeHandClass} text-xl leading-snug md:text-2xl`}>
              &ldquo;{COPY.stickyQuote}&rdquo;
            </p>
            <p className="mt-4 text-sm font-semibold text-bp-text/70">- {firstName}</p>
          </div>
          <div className="space-y-4 font-serif text-base leading-relaxed text-bp-text/85 md:text-lg">
            {COPY.bioParagraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
          <div className="flex items-start gap-3 lg:justify-end">
            <TagIcon className="h-8 w-8 shrink-0 text-bp-accent" strokeWidth={1.25} />
            <p className="text-sm leading-relaxed text-bp-text/75">
              All work connected to this story was created with{" "}
              <strong>{firstName}</strong> at <strong>{COPY.organisation}</strong>.
            </p>
          </div>
        </div>
      </RevealSection>

      {artwork.length > 0 ? (
        <StoryArtworkCarousel images={artwork} title={COPY.artworkTitle} />
      ) : null}

      {/* In his words */}
      <RevealSection className="border-b border-bp-text/10 bg-bp-surface px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-3 lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">
              In his words
            </p>
            <p className={`${homeHandClass} mt-6 text-2xl leading-snug md:text-3xl`}>
              <span className="text-4xl text-bp-accent/80">&ldquo;</span>
              {COPY.reflectionQuote.split("hold onto")[0]}
              <BrushUnderline>hold onto</BrushUnderline>
              {COPY.reflectionQuote.split("hold onto")[1]}
            </p>
          </div>
          <div className="space-y-4 font-serif text-base leading-relaxed text-bp-text/85 md:text-lg">
            {COPY.reflectionParagraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
          <div className="relative aspect-[4/5] min-h-[280px] overflow-hidden rounded-sm bg-bp-text/5">
            <Image
              src="/story-reflection.jpg"
              alt="Sketchbook and coffee at London Coffee Factory"
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
        </div>
      </RevealSection>

      {/* Products */}
      <RevealSection className="px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">
            From this story
          </p>
          <h2 className="mt-2 text-2xl font-bold uppercase tracking-wide md:text-3xl">
            Take a piece home
          </h2>
          <p className="mt-3 max-w-xl text-sm text-bp-text/70">
            Every purchase supports creators and workshops at {COPY.organisation}.
          </p>
          {products.length > 0 ? (
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <li key={product.id}>
                  <ShopProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 text-sm text-bp-text/60">
              Link products to this story in admin (product ↔ story) to show them here.
            </p>
          )}
        </div>
      </RevealSection>

      <Footer />
    </div>
  );
}
