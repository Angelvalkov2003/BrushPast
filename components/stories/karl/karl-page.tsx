import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowTopRightOnSquareIcon,
  MapPinIcon,
  PaintBrushIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Footer from "components/layout/footer";
import { HomeCta, IndexCard } from "components/home/home-decor";
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
import { displayImageUrl } from "lib/image-url";
import { KARL_STORY } from "lib/stories/karl-content";
import { getPublicStoryBySlug } from "lib/supabase/stories";

const COPY = KARL_STORY;
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

function ArtworkFrame({
  src,
  alt,
  aspect = "portrait",
  size = "md",
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  aspect?: "portrait" | "square" | "wide";
  size?: "md" | "lg";
  caption?: string;
  priority?: boolean;
}) {
  const widthClass =
    size === "lg"
      ? "w-full max-w-none"
      : "mx-auto w-full max-w-[360px] md:mx-0 md:max-w-[420px]";

  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "wide"
        ? "aspect-[5/4]"
        : "aspect-[3/4]";

  return (
    <figure className={widthClass}>
      <div
        className={`relative overflow-hidden border border-bp-text/12 bg-bp-canvas shadow-[5px_6px_0_rgba(1,2,0,0.06)] ${aspectClass}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover object-center"
          sizes={
            size === "lg"
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 768px) 90vw, 420px"
          }
        />
      </div>
      {caption ? (
        <figcaption
          className={`${homeHandClass} mt-3 text-center text-base text-bp-text/55 md:text-left`}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export async function KarlPage() {
  const story = await getPublicStoryBySlug(COPY.slug);
  const heroImage = displayImageUrl(story?.image_url) ?? COPY.heroImage;
  const jed = COPY.portraits[0];
  const sandra = COPY.portraits[1];

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

      {/* Hero — text + large opening portrait */}
      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-10 md:grid-cols-2 md:items-stretch md:gap-12 md:px-10 md:py-12 lg:gap-14">
          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-bp-accent">
              Story
            </p>
            <h1
              className={`${PAGE_HERO_H1_STORY_CLASS} mt-2 text-[clamp(3.25rem,8vw,5.5rem)]`}
            >
              {COPY.title}
            </h1>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-bp-text/65 md:text-sm">
              {COPY.location}
            </p>

            <ul className="mt-5 flex flex-wrap gap-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-bp-text/55">
              <li className="flex items-center gap-1.5">
                <MapPinIcon className="h-3.5 w-3.5 text-bp-accent" />
                Portsmouth
              </li>
              <li className="flex items-center gap-1.5">
                <PaintBrushIcon className="h-3.5 w-3.5 text-bp-accent" />
                Artist
              </li>
              <li className="flex items-center gap-1.5">
                <UserGroupIcon className="h-3.5 w-3.5 text-bp-accent" />
                Community
              </li>
            </ul>

            <div className="relative mt-8 max-w-lg">
              <span
                className="absolute -left-0.5 -top-1 text-4xl leading-none text-bp-accent/65"
                aria-hidden
              >
                &ldquo;
              </span>
              <p
                className={`${homeHandClass} pl-5 text-[1.6rem] leading-snug text-bp-text md:text-[1.85rem]`}
              >
                Every portrait begins with a{" "}
                <BrushUnderline>{COPY.heroQuoteHighlight}</BrushUnderline>.
              </p>
            </div>

            <div className="mt-7 max-w-xl space-y-1.5">
              {COPY.introLead.map((line, i) => (
                <p
                  key={line}
                  className={`${homeHandClass} leading-snug text-bp-text ${
                    i === 0
                      ? "text-[1.25rem] font-bold md:text-[1.35rem]"
                      : "text-[1.15rem] text-bp-text/90 md:text-[1.25rem]"
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
            <p className={`${bodyClass} mt-5 max-w-xl`}>{COPY.introBody}</p>
          </div>

          <div>
            <div className="relative min-h-[420px] md:min-h-[560px]">
              <div className="absolute inset-0 overflow-hidden border border-bp-text/12 bg-bp-canvas shadow-[6px_8px_0_rgba(1,2,0,0.06)]">
                <Image
                  src={heroImage}
                  alt="Portrait by Karl Rudziak"
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
              Karl Rudziak
            </p>
          </div>
        </div>
      </RevealSection>

      {/* Jed */}
      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-center md:gap-12 md:px-10 md:py-16">
          <ArtworkFrame
            src={jed.image}
            alt={jed.imageAlt}
            aspect="portrait"
            size="md"
            caption="Jed"
          />
          <div>
            <h2
              className={`${bpTitleClass} ${bpTitleUtility} text-[clamp(2.25rem,4.5vw,3rem)] font-bold uppercase tracking-wide text-bp-text`}
            >
              {jed.name}
            </h2>
            <span
              className="mt-2 block h-0.5 w-14 bg-bp-accent/85 [clip-path:polygon(0_0,100%_20%,98%_100%,2%_80%)]"
              aria-hidden
            />
            <div className="mt-6 space-y-4">
              {jed.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className={bodyClass}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Mid quote */}
      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto max-w-[1200px] px-4 py-14 md:px-10 md:py-16">
          <StoryPanel
            className="mx-auto max-w-3xl border border-bp-text/10 px-8 py-10 text-center md:px-14 md:py-12"
            tint="bg-[#f7f1e8]/70"
          >
            <span className="text-4xl text-bp-accent/70" aria-hidden>
              &ldquo;
            </span>
            <p
              className={`${homeHandClass} mt-2 text-[clamp(1.5rem,3.2vw,2.15rem)] leading-snug text-bp-text`}
            >
              {COPY.midQuote}
            </p>
            <span
              className="mt-1 inline-block text-4xl text-bp-accent/70"
              aria-hidden
            >
              &rdquo;
            </span>
          </StoryPanel>
        </div>
      </RevealSection>

      {/* Sandra — flipped */}
      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:gap-12 md:px-10 md:py-16">
          <div className="md:order-2">
            <ArtworkFrame
              src={sandra.image}
              alt={sandra.imageAlt}
              aspect="square"
              size="md"
              caption="Sandra"
            />
          </div>
          <div className="md:order-1">
            <h2
              className={`${bpTitleClass} ${bpTitleUtility} text-[clamp(2.25rem,4.5vw,3rem)] font-bold uppercase tracking-wide text-bp-text`}
            >
              {sandra.name}
            </h2>
            <span
              className="mt-2 block h-0.5 w-14 bg-bp-accent/85 [clip-path:polygon(0_0,100%_20%,98%_100%,2%_80%)]"
              aria-hidden
            />
            <div className="mt-6 space-y-4">
              {sandra.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className={bodyClass}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Duo + themes + explore — uses remaining KARL image */}
      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-14 md:grid-cols-2 md:items-start md:gap-12 md:px-10 md:py-16">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-bp-accent">
              More from the studio
            </p>
            <div className="mt-6">
              {COPY.galleryImages.map((src) => (
                <ArtworkFrame
                  key={src}
                  src={src}
                  alt="Studio portrait by Karl Rudziak"
                  aspect="wide"
                  size="lg"
                  caption="From the sitting room"
                />
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-bp-accent">
                The story behind the work
              </p>
              <ul className="mt-6 space-y-4">
                {COPY.themes.map((theme) => (
                  <li key={theme.title} className="flex gap-3">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bp-accent"
                      aria-hidden
                    />
                    <div>
                      <p
                        className={`${bpTitleClass} ${bpTitleUtility} text-xs font-bold uppercase tracking-[0.16em] text-bp-text`}
                      >
                        {theme.title}
                      </p>
                      <p className={`${bpBodySmClass} mt-0.5 text-bp-text/70`}>
                        {theme.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <IndexCard
              panelTexture="secondary"
              panelTone="cream"
              className="!p-6 md:!p-8"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-bp-accent">
                    {COPY.explore.eyebrow}
                  </p>
                  <p className={`${bodyClass} mt-3`}>{COPY.explore.body}</p>
                  <a
                    href={COPY.explore.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${bpTitleClass} ${bpTitleUtility} mt-5 inline-flex items-center gap-2 bg-bp-accent px-4 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-bp-canvas shadow-[2px_2px_0_rgba(1,2,0,0.12)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none`}
                  >
                    {COPY.explore.button}
                    <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                  </a>
                  <p className={`${bpBodySmClass} mt-2 text-bp-text/50`}>
                    {COPY.explore.urlLabel}
                  </p>
                </div>
                <p
                  className={`${homeHandClass} shrink-0 text-right text-2xl leading-none text-bp-accent/90 md:text-3xl`}
                >
                  {COPY.explore.signature}
                </p>
              </div>
            </IndexCard>
          </div>
        </div>
      </RevealSection>

      <RevealSection>
        <div className="mx-auto flex max-w-[1200px] flex-col gap-5 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p className={`${bodyClass} max-w-md`}>
              {COPY.cta.left}{" "}
              <BrushUnderline>{COPY.cta.highlight}</BrushUnderline>{" "}
              {COPY.cta.right}
            </p>
            <p className={`${bpBodySmClass} mt-1.5 italic text-bp-text/55`}>
              {COPY.cta.aside}
            </p>
          </div>
          <HomeCta href={COPY.cta.href} variant="primary" className="shrink-0">
            {COPY.cta.button} →
          </HomeCta>
        </div>
      </RevealSection>

      <Footer />
    </StoryPageShell>
  );
}
