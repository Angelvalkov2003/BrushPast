import Image from "next/image";
import Link from "next/link";
import { displayImageUrl } from "lib/image-url";
import type { PublicStory } from "lib/supabase/stories";
import { storyCardImageUrl, storyDisplayName, storyHref } from "lib/story-display";

export function HomeStoryTeaser({ story }: { story: PublicStory }) {
  const href = storyHref(story);
  const name = storyDisplayName(story);
  const image = storyCardImageUrl(story);

  const inner = (
    <article className="group flex flex-col bg-bp-canvas">
      <div className="relative aspect-[4/5] overflow-hidden bg-bp-text/5">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-bp-accent/15 text-xs uppercase tracking-widest text-bp-text/40">
            {name}
          </div>
        )}
      </div>
      <h3 className="p-6 text-xl font-bold uppercase tracking-wide text-bp-text">{name}</h3>
    </article>
  );

  if (!href) return inner;
  return (
    <Link href={href} className="block focus-visible:outline-offset-4">
      {inner}
    </Link>
  );
}
