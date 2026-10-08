import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { HomeCta, IndexCard, PolaroidFrame } from "components/home/home-decor";
import {
  bpBodyClass,
  PAGE_HERO_H1_MINIMAL_CLASS,
  bpStoryVoiceUtility,
  bpWhisperUtility,
} from "components/home/home-typography";
import { Reveal, REVEAL_STAGGER_MS } from "components/shared/reveal";
import { displayImageUrl } from "lib/image-url";
import {
  formatJournalDate,
  journalBodyParagraphs,
  journalGalleryUrls,
  type PublicJournalPost,
} from "lib/supabase/journal";
import { TextureSection } from "components/shared/texture-section";
import {
  JournalLightboxProvider,
  JournalLightboxTrigger,
} from "components/journal/journal-lightbox";
import { buildJournalImageList } from "lib/journal-images";

export function JournalPostDetail({ post }: { post: PublicJournalPost }) {
  const hero = displayImageUrl(post.main_image_url);
  const gallery = journalGalleryUrls(post);
  const images = buildJournalImageList(hero, gallery);
  const paragraphs = journalBodyParagraphs(post.body);

  return (
    <JournalLightboxProvider images={images} title={post.title ?? "Journal"}>
      <article>
        <TextureSection
          texture="primary"
          className="px-4 py-10 md:px-10 md:py-14"
        >
          <div className="mx-auto max-w-[1400px]">
            <Link
              href="/journal"
              className={`${bpWhisperUtility} inline-flex items-center text-lg text-bp-text/65 transition-colors hover:text-bp-accent`}
            >
              <ArrowLeftIcon className="mr-2 h-5 w-5" strokeWidth={2} />
              Back to Journal
            </Link>

            <Reveal>
              <p className={`${bpWhisperUtility} mt-8 text-xl text-bp-accent`}>
                {formatJournalDate(post.created_at)}
              </p>
              <h1 className={`${PAGE_HERO_H1_MINIMAL_CLASS} mt-2 max-w-4xl`}>
                {post.title}
              </h1>
              {post.description ? (
                <p className={`${bpBodyClass} mt-6 max-w-3xl text-bp-text/85`}>
                  {post.description}
                </p>
              ) : null}
            </Reveal>
          </div>
        </TextureSection>

        {hero ? (
          <TextureSection
            texture="secondary"
            className="px-4 py-10 md:px-10 md:py-14"
          >
            <Reveal
              variant="fade-scale"
              className="mx-auto flex w-full max-w-3xl justify-center"
            >
              <JournalLightboxTrigger
                index={images.indexOf(hero)}
                className="inline-block max-w-full cursor-zoom-in transition-opacity hover:opacity-95 focus-visible:outline-offset-4"
              >
                <PolaroidFrame index={0} className="inline-block max-w-full">
                  <div className="flex max-h-[min(70vh,640px)] max-w-full items-center justify-center overflow-hidden bg-bp-surface">
                    <Image
                      src={hero}
                      alt=""
                      width={1600}
                      height={1200}
                      className="h-auto max-h-[min(70vh,640px)] w-auto max-w-full object-contain"
                      priority
                      sizes="(max-width: 768px) 100vw, 768px"
                    />
                  </div>
                </PolaroidFrame>
              </JournalLightboxTrigger>
            </Reveal>
          </TextureSection>
        ) : null}

        <TextureSection
          texture="secondary"
          className="px-4 py-12 md:px-10 md:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <IndexCard panelTexture="secondary" panelTone="cream">
                <div
                  className={`${bpStoryVoiceUtility} space-y-7 text-lg italic leading-[1.85] text-bp-text/88 md:text-xl md:leading-[1.9] lg:text-[1.35rem]`}
                >
                  {paragraphs.length > 0 ? (
                    paragraphs.map((p, index) => (
                      <p
                        key={p.slice(0, 48)}
                        className={
                          index === 0
                            ? "text-bp-text/95 first-letter:float-left first-letter:mr-2 first-letter:font-semibold first-letter:text-[2.4em] first-letter:leading-none first-letter:text-bp-accent"
                            : undefined
                        }
                      >
                        {p}
                      </p>
                    ))
                  ) : (
                    <p className="text-xl not-italic text-bp-text/50">
                      No content yet.
                    </p>
                  )}
                </div>
              </IndexCard>
            </Reveal>

            {gallery.length > 0 ? (
              <div className="mt-14">
                <Reveal>
                  <p
                    className={`${bpWhisperUtility} text-center text-2xl text-bp-accent`}
                  >
                    Gallery
                  </p>
                </Reveal>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  {gallery.map((url, index) => (
                    <Reveal
                      key={url}
                      variant="fade-scale"
                      delay={index * REVEAL_STAGGER_MS}
                      className="flex justify-center"
                    >
                      <JournalLightboxTrigger
                        index={images.indexOf(url)}
                        className="inline-block max-w-full"
                      >
                        <PolaroidFrame
                          index={index + 1}
                          className="inline-block max-w-full"
                        >
                          <div className="flex max-h-[min(50vh,420px)] max-w-full items-center justify-center overflow-hidden bg-bp-surface">
                            <Image
                              src={url}
                              alt=""
                              width={1200}
                              height={900}
                              className="h-auto max-h-[min(50vh,420px)] w-auto max-w-full object-contain"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        </PolaroidFrame>
                      </JournalLightboxTrigger>
                    </Reveal>
                  ))}
                </div>
              </div>
            ) : null}

            <Reveal delay={REVEAL_STAGGER_MS}>
              <div className="mt-14 flex flex-wrap justify-center gap-4 border-t border-bp-text/10 pt-12">
                <HomeCta href="/journal" variant="outline">
                  ← All journal entries
                </HomeCta>
                <HomeCta href="/shop" variant="primary">
                  Visit the shop →
                </HomeCta>
              </div>
            </Reveal>
          </div>
        </TextureSection>
      </article>
    </JournalLightboxProvider>
  );
}
