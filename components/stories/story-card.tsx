import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Reveal, REVEAL_STAGGER_MS } from "components/shared/reveal";
import { IndexCard, PolaroidFrame } from "components/home/home-decor";
import { homeHandClass, homeSerifClass } from "components/home/home-typography";
import type { PublicStory } from "lib/supabase/stories";
import type { StoryCardLayout } from "lib/stories-config";
import { storyCardImageUrl, storyDisplayName, storyHref, storyQuote, storyTagsLabel } from "lib/story-display";

const layoutClass: Record<StoryCardLayout, string> = {
  wide: "col-span-1 md:col-span-6",
  tall: "col-span-1 md:col-span-3",
  standard: "col-span-1 md:col-span-3",
  "text-accent": "col-span-1 md:col-span-3",
  "text-dark": "col-span-1 md:col-span-3",
};

const imageAspect: Record<StoryCardLayout, string> = {
  wide: "aspect-[16/9] md:aspect-[21/9]",
  tall: "aspect-[3/4]",
  standard: "aspect-[4/3]",
  "text-accent": "",
  "text-dark": "",
};

type Props = {
  story: PublicStory;
  layout: StoryCardLayout;
  compact?: boolean;
  index?: number;
};

function CompactCardContent({
  story,
  name,
  index = 0,
}: {
  story: PublicStory;
  name: string;
  index?: number;
}) {
  const imageSrc = storyCardImageUrl(story);

  return (
    <PolaroidFrame index={index} tilt={false} className="!pb-6">
      {imageSrc ? (
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-bp-text/5">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="50vw"
          />
        </div>
      ) : (
        <div className="aspect-[3/4] w-full bg-bp-accent-bg" aria-hidden />
      )}
      <p className={`${homeHandClass} mt-2 text-center text-base font-bold leading-snug text-bp-text`}>
        {name}
      </p>
    </PolaroidFrame>
  );
}

function CardTextBlock({
  name,
  quote,
  tags,
  variant = "default",
}: {
  name: string;
  quote: string;
  tags: string;
  variant?: "default" | "on-accent" | "on-dark";
}) {
  const titleClass =
    variant === "on-accent" || variant === "on-dark"
      ? "text-bp-canvas"
      : "text-bp-text";
  const quoteClass =
    variant === "on-accent" || variant === "on-dark"
      ? "text-bp-canvas/90"
      : "text-bp-text/85";
  const tagsClass =
    variant === "on-accent" || variant === "on-dark"
      ? "text-bp-canvas/75"
      : "text-bp-accent";

  return (
    <div className="flex flex-1 flex-col gap-2 p-1 md:gap-3">
      <h2 className={`${homeHandClass} text-2xl font-bold leading-snug md:text-3xl ${titleClass}`}>
        {name}
      </h2>
      {quote ? (
        <p className={`${homeSerifClass} text-lg italic leading-snug md:text-xl ${quoteClass}`}>
          {quote}
        </p>
      ) : null}
      {tags ? (
        <p className={`${homeHandClass} mt-auto pt-2 text-base ${tagsClass}`}>{tags}</p>
      ) : null}
    </div>
  );
}

function CardContent({
  story,
  layout,
  name,
  quote,
  tags,
  index = 0,
}: {
  story: PublicStory;
  layout: StoryCardLayout;
  name: string;
  quote: string;
  tags: string;
  index?: number;
}) {
  const isTextCard = layout === "text-accent" || layout === "text-dark";
  const imageSrc = storyCardImageUrl(story);
  const useImage = Boolean(imageSrc) && !isTextCard;

  if (isTextCard) {
    const bg = layout === "text-accent" ? "bg-bp-accent-bg" : "bg-bp-dark";
    const variant = layout === "text-accent" ? "default" : "on-dark";
    return (
      <IndexCard className={clsx("group flex h-full min-h-[220px] w-full flex-col border-bp-text/10", bg)}>
        <CardTextBlock name={name} quote={quote} tags={tags} variant={variant} />
      </IndexCard>
    );
  }

  return (
    <PolaroidFrame index={index} tilt={false} className="group flex h-full w-full flex-col !pb-7">
      {useImage && imageSrc ? (
        <div className={clsx("relative w-full shrink-0 overflow-hidden bg-bp-text/5", imageAspect[layout])}>
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div
          className={clsx("w-full shrink-0 bg-bp-accent-bg", imageAspect[layout] || "aspect-[4/3]")}
          aria-hidden
        />
      )}
      <div className="mt-2 px-1">
        <CardTextBlock name={name} quote={quote} tags={tags} />
      </div>
    </PolaroidFrame>
  );
}

export function StoryCard({ story, layout, compact = false, index = 0 }: Props) {
  const href = storyHref(story);
  const name = storyDisplayName(story);
  const quote = storyQuote(story);
  const tags = storyTagsLabel(story.tags);
  const wrapClass = clsx(
    "block h-full",
    compact ? "col-span-1 md:col-span-3" : layoutClass[layout],
  );

  const inner = compact ? (
    <>
      <div className="md:hidden">
        <CompactCardContent story={story} name={name} index={index} />
      </div>
      <div className="hidden md:block">
        <CardContent
          story={story}
          layout={layout}
          name={name}
          quote={quote}
          tags={tags}
          index={index}
        />
      </div>
    </>
  ) : (
    <CardContent
      story={story}
      layout={layout}
      name={name}
      quote={quote}
      tags={tags}
      index={index}
    />
  );

  const variant =
    layout === "text-accent" || layout === "text-dark" ? "fade-up" : "fade-scale";
  const revealDelay = (index % 6) * REVEAL_STAGGER_MS;

  if (!href) {
    return (
      <Reveal variant={variant} delay={revealDelay} className={wrapClass}>
        {inner}
      </Reveal>
    );
  }

  return (
    <Reveal variant={variant} delay={revealDelay} className={wrapClass}>
      <Link href={href} className="block h-full focus-visible:outline-offset-4">
        {inner}
      </Link>
    </Reveal>
  );
}
