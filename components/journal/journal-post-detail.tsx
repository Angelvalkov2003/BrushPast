import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { displayImageUrl } from "lib/image-url";
import {
  formatJournalDate,
  journalBodyParagraphs,
  journalGalleryUrls,
  type PublicJournalPost,
} from "lib/supabase/journal";

export function JournalPostDetail({ post }: { post: PublicJournalPost }) {
  const hero = displayImageUrl(post.main_image_url);
  const gallery = journalGalleryUrls(post);
  const paragraphs = journalBodyParagraphs(post.body);

  return (
    <article className="border-b border-bp-text/10 bg-bp-canvas">
      <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-10 md:py-12">
        <Link
          href="/journal"
          className="inline-flex items-center text-xs font-bold uppercase tracking-[0.14em] text-bp-text/60 transition-colors hover:text-bp-accent"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Journal
        </Link>

        <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.22em] text-bp-accent">
          {formatJournalDate(post.created_at)}
        </p>
        <h1 className="mt-3 max-w-4xl text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-tight tracking-tight text-bp-text">
          {post.title}
        </h1>
        {post.description ? (
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-bp-text/80">{post.description}</p>
        ) : null}
      </div>

      {hero ? (
        <div className="relative mx-auto aspect-[21/9] max-w-[1400px] overflow-hidden px-4 md:px-10">
          <div className="relative h-full w-full overflow-hidden rounded-sm bg-bp-surface">
            <Image
              src={hero}
              alt=""
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1400px) 100vw, 1400px"
            />
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-10 md:py-16">
        <div className="space-y-6 text-base leading-relaxed text-bp-text/85 md:text-lg">
          {paragraphs.length > 0 ? (
            paragraphs.map((p) => <p key={p.slice(0, 48)}>{p}</p>)
          ) : (
            <p className="text-bp-text/50">No content yet.</p>
          )}
        </div>

        {gallery.length > 0 ? (
          <div className="mt-14 border-t border-bp-text/10 pt-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bp-text/55">Gallery</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {gallery.map((url) => (
                <div key={url} className="relative aspect-[4/3] overflow-hidden bg-bp-surface">
                  <Image src={url} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
