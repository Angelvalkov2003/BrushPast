import Image from "next/image";
import Link from "next/link";
import { PolaroidFrame } from "./home-decor";
import { homeHandClass } from "./home-typography";
import { storyCardImageUrl, storyDisplayName, storyHref } from "lib/story-display";
import type { PublicStory } from "lib/supabase/stories";

export function HomeStoryTeaser({
  story,
  index = 0,
}: {
  story: PublicStory;
  index?: number;
}) {
  const href = storyHref(story);
  const name = storyDisplayName(story);
  const image = storyCardImageUrl(story);

  const inner = (
    <PolaroidFrame index={index + 2} className="group-hover:rotate-0">
      <div className="relative aspect-[4/5] overflow-hidden bg-bp-text/5">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div
            className={`${homeHandClass} flex h-full items-center justify-center bg-bp-accent-bg text-xl text-bp-text/40`}
          >
            {name}
          </div>
        )}
      </div>
      <p className={`${homeHandClass} mt-3 text-center text-2xl font-bold text-bp-text`}>
        {name}
      </p>
    </PolaroidFrame>
  );

  if (!href) {
    return <div className="group">{inner}</div>;
  }

  return (
    <Link href={href} className="group block focus-visible:outline-offset-4">
      {inner}
    </Link>
  );
}
