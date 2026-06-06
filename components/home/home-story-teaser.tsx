import Image from "next/image";
import Link from "next/link";
import { displayImageUrl } from "lib/image-url";
import type { PublicStory } from "lib/supabase/stories";
import { storyDisplayName, storyHref, storyQuote } from "lib/story-display";

export function HomeStoryTeaser({ story }: { story: PublicStory }) {
  const href = storyHref(story);
  const name = storyDisplayName(story);
  const quote = storyQuote(story);

  const inner = (
    <article className="group relative aspect-square overflow-hidden rounded-sm bg-bp-text/10">
      {displayImageUrl(story.image_url) ? (
        <Image
          src={displayImageUrl(story.image_url)!}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      ) : (
        <div className="absolute inset-0 bg-bp-accent" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-bp-canvas">
        {quote ? <p className="text-sm leading-snug md:text-base">{quote}</p> : null}
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.15em]">— {name}</p>
      </div>
    </article>
  );

  if (!href) return inner;
  return (
    <Link href={href} className="block focus-visible:outline-offset-4">
      {inner}
    </Link>
  );
}
