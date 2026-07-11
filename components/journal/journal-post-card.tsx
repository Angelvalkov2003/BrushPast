import Image from "next/image";
import Link from "next/link";
import { PolaroidFrame } from "components/home/home-decor";
import { bpStoryVoiceUtility, bpWhisperUtility } from "components/home/home-typography";
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
      <PolaroidFrame index={index + 1} className="group-hover:rotate-0">
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
        <p className="mt-3 text-center text-2xl font-bold text-bp-text">
          {post.title || "Untitled"}
        </p>
      </PolaroidFrame>
      <p className={`${bpWhisperUtility} mt-4 text-center text-xl text-bp-accent md:text-2xl`}>
        {formatJournalDate(post.created_at)}
      </p>
      {post.description ? (
        <p
          className={`${bpStoryVoiceUtility} mt-3 text-center text-lg leading-relaxed text-bp-text/75 md:text-xl`}
        >
          {post.description}
        </p>
      ) : null}
      <p
        className={`${bpWhisperUtility} mt-3 text-center text-xl text-bp-accent opacity-0 transition-opacity group-hover:opacity-100 md:text-2xl`}
      >
        Read more →
      </p>
    </>
  );

  if (!href) {
    return <article className="group">{inner}</article>;
  }

  return (
    <Link href={href} className="group block h-full focus-visible:outline-offset-4">
      {inner}
    </Link>
  );
}
