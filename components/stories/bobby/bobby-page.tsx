import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Caveat, Lora } from "next/font/google";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { RevealSection } from "components/shared/reveal-section";
import Footer from "components/layout/footer";
import { ShopProductCard } from "components/shop/shop-product-card";
import { displayImageUrl } from "lib/image-url";
import { BOBBY_STORY } from "lib/stories/bobby-content";
import { getStoryProductsBySlug } from "lib/supabase/story-products";
import { getPublicStoryBySlug } from "lib/supabase/stories";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const lora = Lora({ subsets: ["latin"], style: ["italic"], weight: ["400", "500"] });
const COPY = BOBBY_STORY;

const CANVAS_BG = {
  backgroundColor: "#f7f4ef",
  backgroundImage:
    "radial-gradient(ellipse at 12% 18%, rgba(191,50,1,0.04) 0%, transparent 50%), radial-gradient(ellipse at 88% 82%, rgba(30,80,120,0.05) 0%, transparent 45%)",
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

function FragmentCard({ title, quote, rotate }: { title: string; quote: string; rotate: string }) {
  return (
    <article
      className={`border border-bp-text/12 bg-[#faf7f2] p-5 shadow-[2px_3px_0_rgba(0,0,0,0.05)] ${rotate}`}
    >
      <h3 className={`${caveat.className} text-xl font-bold text-bp-accent`}>{title}</h3>
      <p className={`${caveat.className} mt-3 text-lg leading-snug text-bp-text/88`}>{quote}</p>
    </article>
  );
}

export async function BobbyPage() {
  const [story, products] = await Promise.all([
    getPublicStoryBySlug(COPY.slug),
    getStoryProductsBySlug(COPY.slug),
  ]);

  const heroImage = displayImageUrl(story?.image_url) ?? COPY.heroImage;
  const shopHref = products.length > 0 ? `/shop` : "/shop";

  return (
    <div className="text-bp-text" style={CANVAS_BG}>
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
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-4 py-10 md:px-10 md:py-14 lg:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">Story</p>
            <h1 className="mt-3 text-[clamp(3.5rem,12vw,6.5rem)] font-black uppercase leading-[0.85] tracking-tighter">
              {COPY.headline}
            </h1>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-bp-text/70 md:text-base">
              {COPY.subtitle}
            </p>
            <p className={`${lora.className} mt-8 max-w-xl text-2xl leading-snug md:text-[1.75rem]`}>
              &ldquo;{COPY.heroQuote}&rdquo;
            </p>
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-bp-text/60 md:text-xs">
              {COPY.tags.join(" • ")}
            </p>
          </div>
          <div className="relative min-h-[420px] lg:min-h-[560px]">
            <Image
              src={heroImage}
              alt="Bobby — portrait"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </RevealSection>

      {/* Intro */}
      <RevealSection id="story-body" className="scroll-mt-24 border-b border-bp-text/10 px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-3 lg:items-start">
          <div>
            <p className={`${caveat.className} text-[1.65rem] leading-snug text-bp-text md:text-[1.9rem]`}>
              &ldquo;<BrushUnderline>{COPY.introPullQuote}</BrushUnderline>&rdquo;
            </p>
          </div>
          <div className="space-y-4 font-serif text-base leading-relaxed text-bp-text/85 md:text-lg">
            {COPY.introBody.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-bp-text/5 shadow-sm">
            <Image
              src={COPY.introArtwork}
              alt="Bobby artwork — storefront scene"
              fill
              className="object-cover object-center"
              sizes="33vw"
            />
          </div>
        </div>
      </RevealSection>

      {/* In his words */}
      <RevealSection className="border-b border-bp-text/10 px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bp-accent">In his words</p>
            <p className={`${lora.className} mt-6 text-[1.45rem] leading-snug text-bp-text md:text-[1.65rem]`}>
              <span className="text-4xl leading-none text-bp-accent/80">&ldquo;</span>
              {COPY.inHisWords.quote}
            </p>
          </div>
          <div className="space-y-4 font-serif text-base leading-relaxed text-bp-text/85 md:text-lg">
            {COPY.inHisWords.paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Fragments + support */}
      <RevealSection className="border-b border-bp-text/10 bg-bp-surface/40 px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <h2 className={`${caveat.className} text-center text-3xl font-bold uppercase tracking-[0.2em] text-bp-accent`}>
            {COPY.fragments.title}
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <div className="grid gap-5 sm:grid-cols-2">
              {COPY.fragments.items.map((item, i) => (
                <FragmentCard
                  key={item.title}
                  title={item.title}
                  quote={item.quote}
                  rotate={["rotate-[-0.5deg]", "rotate-[1deg]", "rotate-[-1deg]", "rotate-[0.5deg]"][i] ?? ""}
                />
              ))}
            </div>
            <div className="border border-bp-text/15 bg-bp-canvas p-6 md:p-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-bp-accent">Support the story</h3>
              <p className="mt-4 text-sm leading-relaxed text-bp-text/80">
                Bobby&apos;s artwork is available on selected prints and apparel. Every purchase helps support
                artists, workshops and second chances.
              </p>
              <Link
                href={shopHref}
                className="mt-6 inline-flex border-2 border-bp-text px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] hover:bg-bp-text hover:text-bp-canvas"
              >
                View artwork →
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* CTA */}
      <RevealSection className="border-b border-bp-text/10 bg-bp-canvas/80">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-10 md:py-12">
          <div className="flex items-start gap-4">
            <UserGroupIcon className="h-9 w-9 shrink-0 text-bp-accent/80" strokeWidth={1.2} />
            <div>
              <p className="max-w-lg text-sm leading-relaxed text-bp-text/85 md:text-base">
                {COPY.cta.left} <BrushUnderline>{COPY.cta.highlight}</BrushUnderline> {COPY.cta.right}
              </p>
              <p className="mt-2 text-xs text-bp-text/60 md:text-sm">{COPY.cta.aside}</p>
            </div>
          </div>
          <Link
            href={COPY.cta.href}
            className="shrink-0 border-2 border-bp-accent px-8 py-3 text-center text-xs font-bold uppercase tracking-[0.15em] text-bp-accent hover:bg-bp-accent hover:text-bp-canvas"
          >
            {COPY.cta.button}
          </Link>
        </div>
      </RevealSection>

      {products.length > 0 ? (
        <RevealSection className="px-4 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1400px]">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">From this story</p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-wide md:text-3xl">Take a piece home</h2>
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
