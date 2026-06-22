import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { HomeCta, IndexCard, PolaroidFrame } from "components/home/home-decor";
import { homeHandClass, homeSerifClass } from "components/home/home-typography";
import { displayImageUrl } from "lib/image-url";
import {
  formatJournalDate,
  journalBodyParagraphs,
  journalGalleryUrls,
  type PublicJournalPost,
} from "lib/supabase/journal";
import { TextureSection } from "components/shared/texture-section";

export function JournalPostDetail({ post }: { post: PublicJournalPost }) {
  const hero = displayImageUrl(post.main_image_url);
  const gallery = journalGalleryUrls(post);
  const paragraphs = journalBodyParagraphs(post.body);

  return (
    <article>
      <TextureSection texture="primary" className="px-4 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-[1400px]">
          <Link
            href="/journal"
            className={`${homeHandClass} inline-flex items-center text-lg text-bp-text/65 transition-colors hover:text-bp-accent`}
          >
            <ArrowLeftIcon className="mr-2 h-5 w-5" strokeWidth={2} />
            Back to Journal
          </Link>

          <p className={`${homeHandClass} mt-8 text-xl text-bp-accent`}>
            {formatJournalDate(post.created_at)}
          </p>
          <h1
            className={`${homeHandClass} mt-2 max-w-4xl text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[0.95] text-bp-text`}
          >
            {post.title}
          </h1>
          {post.description ? (
            <p
              className={`${homeSerifClass} mt-6 max-w-3xl text-lg italic leading-relaxed text-bp-text/85 md:text-xl`}
            >
              {post.description}
            </p>
          ) : null}
        </div>
      </TextureSection>

      {hero ? (
        <section className="border-b border-bp-text/10 bg-[#faf7f2] px-4 py-10 md:px-10 md:py-14">
          <PolaroidFrame index={0} className="mx-auto max-w-3xl">
            <div className="relative aspect-[16/10] overflow-hidden bg-bp-surface">
              <Image
                src={hero}
                alt=""
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
          </PolaroidFrame>
        </section>
      ) : null}

      <section className="border-b border-bp-text/10 bg-bp-canvas px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-3xl">
          <IndexCard>
            <div className={`${homeSerifClass} space-y-6 text-base leading-relaxed text-bp-text/85 md:text-lg`}>
              {paragraphs.length > 0 ? (
                paragraphs.map((p) => <p key={p.slice(0, 48)}>{p}</p>)
              ) : (
                <p className={`${homeHandClass} text-xl text-bp-text/50`}>No content yet.</p>
              )}
            </div>
          </IndexCard>

          {gallery.length > 0 ? (
            <div className="mt-14">
              <p className={`${homeHandClass} text-center text-2xl text-bp-accent`}>Gallery</p>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {gallery.map((url, index) => (
                  <PolaroidFrame key={url} index={index + 1}>
                    <div className="relative aspect-[4/3] overflow-hidden bg-bp-surface">
                      <Image
                        src={url}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </PolaroidFrame>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-14 flex flex-wrap justify-center gap-4 border-t border-bp-text/10 pt-12">
            <HomeCta href="/journal" variant="outline">
              ← All journal entries
            </HomeCta>
            <HomeCta href="/shop" variant="primary">
              Visit the shop →
            </HomeCta>
          </div>
        </div>
      </section>
    </article>
  );
}
