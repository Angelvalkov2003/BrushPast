import Image from "next/image";
import Link from "next/link";
import {
  CONTACT_CONNECT_CARDS,
  CONTACT_HERO_IMAGE,
} from "lib/contact-config";
import {
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  INSTAGRAM_URL,
  PUBLIC_CONTACT_EMAIL,
} from "lib/site-config";
import {
  HomeCta,
  HomeSectionTitle,
  IndexCard,
  PolaroidFrame,
} from "components/home/home-decor";
import {
  bpBodyClass,
  bpEmphasisUtility,
  bpLinkUtility,
  bpStoryVoiceUtility,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
  homeHandClass,
} from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";
import { PageHero } from "components/shared/page-hero";
import { ContactForm } from "./contact-form";
import { BoxImagePlaceholder } from "components/shop/box-image-placeholder";

export function ContactPageContent() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Let&apos;s start a
            <br />
            <span className="text-bp-accent">conversation.</span>
          </>
        }
        media={
          <PolaroidFrame
            index={0}
            className="mx-auto w-full max-w-[280px] sm:max-w-sm md:max-w-[400px] lg:max-w-[440px]"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-bp-surface">
              <Image
                src={CONTACT_HERO_IMAGE.src}
                alt={CONTACT_HERO_IMAGE.alt}
                fill
                className="object-cover object-[50%_20%]"
                priority
                sizes="(max-width: 768px) 280px, 440px"
              />
            </div>
            <p
              className={`${homeHandClass} ${bpWhisperUtility} mt-2 text-center text-base text-bp-text/75 md:text-lg`}
            >
              Real people, real spaces · Social Impact Coffee
            </p>
          </PolaroidFrame>
        }
      >
        <IndexCard
          className="mt-6 max-w-xl"
          panelTexture="secondary"
          panelTone="cream"
        >
          <p className={`${bpBodyClass} text-bp-text/90`}>
            <span className={`${bpEmphasisUtility} text-bp-accent`}>
              Share a story.
            </span>{" "}
            Collaborate. Join a workshop. Or simply say hello - we&apos;d
            love to hear from you.
          </p>
          <p className={`${bpBodyClass} mt-4 text-bp-text/85`}>
            Brush Past is a{" "}
            <span className="text-bp-accent">creative movement</span> for{" "}
            <span className="text-bp-accent">second chances</span>, built in
            public with real people and real spaces.
          </p>
        </IndexCard>
        <p
          className={`${bpStoryVoiceUtility} mt-8 max-w-xl text-xl leading-relaxed text-bp-text/80 md:text-2xl`}
        >
          No perfect pitch needed.{" "}
          <span className="text-bp-accent">Just say hello.</span>
        </p>
      </PageHero>

      <TextureSection
        texture="secondary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-[1400px]">
          <HomeSectionTitle
            eyebrow="Get involved"
            title="Ways to Connect"
            eyebrowVariant="workshop"
          />

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {CONTACT_CONNECT_CARDS.map((card, index) => (
              <Link
                key={card.title}
                href={card.href}
                className="group block focus-visible:outline-offset-4"
              >
                <PolaroidFrame index={index + 2}>
                  <BoxImagePlaceholder
                    alt={card.title}
                    note={card.description}
                    labelNumber={card.photoNumber}
                    className="aspect-[4/5] min-h-[220px]"
                  />
                  <p
                    className={`${bpTitleClass} ${bpTitleUtility} mt-3 text-center font-bold text-bp-text`}
                  >
                    {card.imageCaption}
                  </p>
                </PolaroidFrame>
                <h3
                  className={`${bpTitleClass} ${bpTitleUtility} mt-4 text-center text-xl font-bold uppercase tracking-wide text-bp-text`}
                >
                  {card.title}
                </h3>
                <p
                  className={`${homeHandClass} ${bpWhisperUtility} mt-3 text-center text-base italic leading-relaxed text-bp-text/75 md:text-lg`}
                >
                  {card.description}
                </p>
                <p
                  className={`${bpWhisperUtility} mt-3 text-center text-xl text-bp-accent opacity-0 transition-opacity group-hover:opacity-100 md:text-2xl`}
                >
                  {card.cta} →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </TextureSection>

      <TextureSection
        texture="secondary"
        overlay="cream"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <HomeSectionTitle
            eyebrow="Foundation"
            title="Help creativity reach further"
          />
          <p className={`${bpBodyClass} mt-5 text-bp-text/75`}>
            One-off contributions, custom amounts and partnership enquiries —
            all on the Support the Work page.
          </p>
          <HomeCta href="/sponsor" className="mt-8" variant="primary">
            Support the work →
          </HomeCta>
        </div>
      </TextureSection>

      <TextureSection
        texture="primary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-8">
            <IndexCard>
              <h2
                className={`${bpTitleClass} ${bpTitleUtility} text-3xl font-bold text-bp-text`}
              >
                We&apos;re figuring this out{" "}
                <span className="text-bp-accent">in public</span>
              </h2>
              <p
                className={`${homeHandClass} ${bpWhisperUtility} mt-4 text-base italic leading-relaxed text-bp-text/80 md:text-lg`}
              >
                Brush Past is not a finished product - it&apos;s a{" "}
                <span className="font-medium text-bp-text not-italic">
                  living creative platform
                </span>
                .
              </p>
              <p className={`${bpBodyClass} mt-4 text-bp-text`}>
                Reach out with <span className="text-bp-accent">questions</span>
                , <span className="text-bp-accent">ideas</span>,{" "}
                <span className="text-bp-accent">partnerships</span> - or simply
                to introduce yourself.
              </p>
              <p
                className={`${homeHandClass} ${bpWhisperUtility} mt-5 text-xl text-bp-accent`}
              >
                - Jeremy &amp; David
              </p>
            </IndexCard>

            <IndexCard>
              <h3
                className={`${bpTitleClass} ${bpTitleUtility} text-2xl text-bp-accent`}
              >
                Direct contact
              </h3>
              <ul className={`${bpBodyClass} mt-5 space-y-5`}>
                <li>
                  <span className={`${bpEmphasisUtility} block text-bp-text`}>
                    Email
                  </span>
                  <a
                    href={`mailto:${PUBLIC_CONTACT_EMAIL}`}
                    className={`${bpLinkUtility} text-bp-accent`}
                  >
                    {PUBLIC_CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <span className={`${bpEmphasisUtility} block text-bp-text`}>
                    Phone
                  </span>
                  <a
                    href={`tel:${CONTACT_PHONE_TEL}`}
                    className={`${bpLinkUtility} hover:text-bp-accent`}
                  >
                    {CONTACT_PHONE}
                  </a>
                </li>
                <li>
                  <span className={`${bpEmphasisUtility} block text-bp-text`}>
                    Social
                  </span>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${bpLinkUtility} hover:text-bp-accent`}
                  >
                    Instagram
                  </a>
                </li>
              </ul>
              <p className={`${bpWhisperUtility} mt-5 text-lg text-bp-text/75`}>
                Follow the journey as it unfolds →
              </p>
            </IndexCard>
          </div>

          <ContactForm />
        </div>
      </TextureSection>
    </>
  );
}
