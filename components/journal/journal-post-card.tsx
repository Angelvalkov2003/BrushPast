import Image from "next/image";
import Link from "next/link";
import { PolaroidFrame } from "components/home/home-decor";
import {
  bpBodyClass,
  bpStoryVoiceUtility,
  bpWhisperUtility,
  homeHandClass,
} from "components/home/home-typography";
import { displayImageUrl } from "lib/image-url";
import {
  formatJournalDate,
  journalPostHref,
  type PublicJournalPost,
} from "lib/supabase/journal";

export function JournalPostCard({
  post,
  index = 0,
}: {
  post: PublicJournalPost;
  index?: number;
}) {
  const href = journalPostHref(post.slug);
  const image = displayImageUrl(post.main_image_url);

  const inner = (
    <>
      <PolaroidFrame
        index={index + 1}
        cardboardBacking
        className="group-hover:rotate-0"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-bp-text/5">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div
              className={`${bpWhisperUtility} flex h-full items-center justify-center text-xl text-bp-text/35`}
            >
              Journal
            </div>
          )}
        </div>
        <div className="relative mt-3 min-h-[4.75rem] px-1 pb-7">
          <p className="text-center text-2xl font-bold leading-snug text-bp-text md:text-[1.65rem]">
            {post.title || "Untitled"}
          </p>
          <p
            className={`${homeHandClass} ${bpWhisperUtility} absolute bottom-0 left-1 text-base font-bold text-bp-accent md:text-lg`}
          >
            {formatJournalDate(post.created_at)}
          </p>
        </div>
      </PolaroidFrame>
      {post.description ? (
        <p
          className={`${bpStoryVoiceUtility} mt-5 text-center text-xl leading-relaxed text-bp-text/80 md:text-2xl`}
        >
          {post.description}
        </p>
      ) : null}
      <p
        className={`${bpBodyClass} mt-3 text-center font-semibold text-bp-accent opacity-0 transition-opacity group-hover:opacity-100`}
      >
        Read more →
      </p>
    </>
  );

  if (!href) {
    return <article className="group">{inner}</article>;
  }

  return (
    <Link
      href={href}
      className="group block h-full focus-visible:outline-offset-4"
    >
      {inner}
    </Link>
  );
}
