import Image from "next/image";
import Link from "next/link";
import { displayImageUrl } from "lib/image-url";
import {
  formatJournalDate,
  journalPostHref,
  type PublicJournalPost,
} from "lib/supabase/journal";

export function JournalPostCard({ post }: { post: PublicJournalPost }) {
  const href = journalPostHref(post.slug);
  const image = displayImageUrl(post.main_image_url);

  const inner = (
    <article className="group flex h-full flex-col overflow-hidden border border-bp-text/10 bg-bp-canvas">
      <div className="relative aspect-[16/10] overflow-hidden bg-bp-surface">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-bp-text/30">
            Journal
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-bp-accent">
          {formatJournalDate(post.created_at)}
        </p>
        <h2 className="mt-3 text-xl font-bold uppercase tracking-wide text-bp-text md:text-2xl">
          {post.title || "Untitled"}
        </h2>
        {post.description ? (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-bp-text/75">{post.description}</p>
        ) : null}
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-bp-text group-hover:text-bp-accent">
          Read more →
        </p>
      </div>
    </article>
  );

  if (!href) return inner;
  return (
    <Link href={href} className="block h-full focus-visible:outline-offset-4">
      {inner}
    </Link>
  );
}
