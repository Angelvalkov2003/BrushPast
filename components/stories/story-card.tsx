import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Caveat } from "next/font/google";
import type { PublicStory } from "lib/supabase/stories";
import type { StoryCardLayout } from "lib/stories-config";
import { storyCardImageUrl, storyDisplayName, storyHref, storyQuote, storyTagsLabel } from "lib/story-display";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

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
};

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
      ? "text-bp-canvas/95"
      : "text-bp-text/90";
  const tagsClass =
    variant === "on-accent" || variant === "on-dark"
      ? "text-bp-canvas/70"
      : "text-bp-text/55";

  return (
    <div className="flex flex-1 flex-col gap-2 p-5 md:gap-3 md:p-6">
      <h2
        className={clsx(
          "text-xl font-bold uppercase tracking-[0.12em] md:text-2xl",
          titleClass,
        )}
      >
        {name}
      </h2>
      {quote ? (
        <p
          className={clsx(
            caveat.className,
            "text-xl leading-snug md:text-2xl md:leading-snug",
            quoteClass,
          )}
        >
          {quote}
        </p>
      ) : null}
      {tags ? (
        <p
          className={clsx(
            "mt-auto pt-2 text-[10px] font-semibold uppercase tracking-[0.22em] md:text-xs",
            tagsClass,
          )}
        >
          {tags}
        </p>
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
}: {
  story: PublicStory;
  layout: StoryCardLayout;
  name: string;
  quote: string;
  tags: string;
}) {
  const isTextCard = layout === "text-accent" || layout === "text-dark";
  const imageSrc = storyCardImageUrl(story);
  const useImage = Boolean(imageSrc) && !isTextCard;

  if (isTextCard) {
    const bg = layout === "text-accent" ? "bg-bp-accent" : "bg-bp-dark";
    const variant = layout === "text-accent" ? "on-accent" : "on-dark";
    return (
      <article
        className={clsx(
          "group flex h-full min-h-[220px] w-full flex-col overflow-hidden rounded-sm border border-bp-text/10",
          bg,
        )}
      >
        <CardTextBlock name={name} quote={quote} tags={tags} variant={variant} />
      </article>
    );
  }

  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-sm border border-bp-text/10 bg-bp-surface/80 shadow-sm transition-shadow hover:shadow-md">
      {useImage && imageSrc ? (
        <div className={clsx("relative w-full shrink-0 overflow-hidden bg-bp-text/5", imageAspect[layout])}>
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div
          className={clsx(
            "w-full shrink-0 bg-bp-accent/15",
            imageAspect[layout] || "aspect-[4/3]",
          )}
          aria-hidden
        />
      )}
      <CardTextBlock name={name} quote={quote} tags={tags} />
    </article>
  );
}

export function StoryCard({ story, layout }: Props) {
  const href = storyHref(story);
  const name = storyDisplayName(story);
  const quote = storyQuote(story);
  const tags = storyTagsLabel(story.tags);
  const wrapClass = clsx("block h-full", layoutClass[layout]);

  if (!href) {
    return (
      <div className={wrapClass}>
        <CardContent story={story} layout={layout} name={name} quote={quote} tags={tags} />
      </div>
    );
  }

  return (
    <Link href={href} className={clsx(wrapClass, "focus-visible:outline-offset-4")}>
      <CardContent story={story} layout={layout} name={name} quote={quote} tags={tags} />
    </Link>
  );
}
