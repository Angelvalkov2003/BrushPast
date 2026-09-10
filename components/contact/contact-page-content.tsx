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
  PAGE_HERO_POLAROID_WRAP_CLASS,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
  homeHandClass,
} from "components/home/home-typography";
import {
  TEXTURE_IMAGES,
  TextureSection,
} from "components/shared/texture-section";
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
          <PolaroidFrame index={0} className={PAGE_HERO_POLAROID_WRAP_CLASS}>
            <div className="relative aspect-[4/5] overflow-hidden bg-bp-surface">
              <Image
                src={CONTACT_HERO_IMAGE.src}
                alt={CONTACT_HERO_IMAGE.alt}
                fill
                className="object-cover"
                style={{ objectPosition: "50% 42%" }}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <p
              className={`${homeHandClass} ${bpWhisperUtility} mt-3 text-center text-xl text-bp-text/75`}
            >
              Real people, real spaces
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
            title="How you can connect"
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
                    {card.title}
                  </p>
                </PolaroidFrame>
                <p
                  className={`${homeHandClass} ${bpWhisperUtility} mt-4 text-center text-base italic leading-relaxed text-bp-text/75 md:text-lg`}
                >
                  {card.description}{" "}
                  <span className="font-medium text-bp-text not-italic">
                    {card.descriptionAccent}
                  </span>
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
            eyebrow="Sponsor"
            title="Help creativity reach further"
          />
          <p className={`${bpBodyClass} mt-5 text-bp-text/75`}>
            One-off contributions, custom amounts and partnership enquiries —
            all on the Sponsor page.
          </p>
          <HomeCta href="/sponsor" className="mt-8" variant="primary">
            Become a sponsor →
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

      <section className="relative overflow-hidden border-t border-bp-text/10 bg-bp-dark px-4 py-14 text-bp-canvas md:px-10 md:py-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${TEXTURE_IMAGES.secondary})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-bp-dark/80" aria-hidden />

        <div className="relative mx-auto max-w-[1400px] text-center">
          <p
            className={`${homeHandClass} ${bpWhisperUtility} text-2xl leading-snug md:text-3xl`}
          >
            You don&apos;t need to have it all figured out to{" "}
            <span className="text-bp-accent">get in touch</span>.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <HomeCta href={`mailto:${PUBLIC_CONTACT_EMAIL}`} variant="outline">
              Email us →
            </HomeCta>
            <HomeCta href="/sponsor" variant="outline">
              Become a sponsor →
            </HomeCta>
            <HomeCta href="#contact-form" variant="primary">
              Send a message →
            </HomeCta>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${bpBodyClass} ${bpLinkUtility} inline-flex items-center px-7 py-3 font-bold text-bp-canvas/85 transition-colors hover:text-bp-accent`}
            >
              Follow the journey →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
