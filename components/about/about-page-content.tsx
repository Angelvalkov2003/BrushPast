import Image from "next/image";
import {
  brushPastIcons,
  BrushPastIconBadge,
} from "components/icons/brush-past-icons";
import {
  ABOUT_FOUNDERS_PATH,
  ABOUT_HERO_IMAGE,
  ABOUT_MISSION,
  ABOUT_ON_THE_GROUND,
  ABOUT_ORGANISATIONS,
  ABOUT_QUOTE,
  ABOUT_VALUES,
} from "lib/about-config";
import { MISSION_SUMMARY } from "lib/site-config";
import {
  BrushUnderline,
  HomeCta,
  HomeSectionTitle,
  IndexCard,
  PolaroidFrame,
  SectionEyebrow,
} from "components/home/home-decor";
import {
  bpBodyClass,
  bpBodySmClass,
  PAGE_HERO_POLAROID_WRAP_CLASS,
  PAGE_HERO_WHISPER_INLINE_CLASS,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
  homeHandClass,
} from "components/home/home-typography";
import { PageHero } from "components/shared/page-hero";
import { Reveal, REVEAL_STAGGER_MS } from "components/shared/reveal";
import { TextureSection } from "components/shared/texture-section";
import { BoxImagePlaceholder } from "components/shop/box-image-placeholder";
import { PHOTO } from "lib/photo-placeholder";
import { AboutLaunchBanner } from "./about-launch-banner";
import { AboutNewsletter } from "./about-newsletter";

const aboutBodyClass = bpBodyClass;
const aboutBodySmClass = `${bpBodySmClass} text-bp-text/85`;

export function AboutPageContent() {
  return (
    <>
      <Reveal>
        <PageHero
          eyebrow="About Brush Past"
          title={
            <>
              Our mission.
              <br />
              Our purpose.
            </>
          }
          media={
            <Reveal variant="fade-scale" delay={REVEAL_STAGGER_MS}>
              <PolaroidFrame
                index={0}
                className={PAGE_HERO_POLAROID_WRAP_CLASS}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-bp-surface">
                  <Image
                    src={ABOUT_HERO_IMAGE.src}
                    alt={ABOUT_HERO_IMAGE.alt}
                    fill
                    className="object-cover"
                    style={{ objectPosition: "50% 44%" }}
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <p
                  className={`${homeHandClass} ${bpWhisperUtility} mt-3 text-center text-xl text-bp-text/75 md:text-2xl`}
                >
                  Jeremy &amp; David
                </p>
              </PolaroidFrame>
            </Reveal>
          }
        >
          <IndexCard className="mt-6 max-w-xl" panelTexture="secondary">
            <p className={aboutBodyClass}>{ABOUT_MISSION}</p>
          </IndexCard>
          <p className={PAGE_HERO_WHISPER_INLINE_CLASS}>
            Not spoken about.{" "}
            <span className="text-bp-accent">But speaking.</span>
          </p>
        </PageHero>
      </Reveal>

      <TextureSection
        texture="secondary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-3 lg:items-stretch">
          <Reveal>
            <IndexCard panelTexture="primary" className="h-full">
              <SectionEyebrow>Where it began</SectionEyebrow>
              <blockquote
                className={`${homeHandClass} ${bpWhisperUtility} mt-4 text-[clamp(1.85rem,4.5vw,2.75rem)] font-bold leading-snug text-bp-text`}
              >
                &ldquo;{ABOUT_QUOTE.slice(0, ABOUT_QUOTE.indexOf("same"))}
                <BrushUnderline>same</BrushUnderline>
                {ABOUT_QUOTE.slice(ABOUT_QUOTE.indexOf("same") + 4)}&rdquo;
              </blockquote>
            </IndexCard>
          </Reveal>
          <Reveal delay={REVEAL_STAGGER_MS}>
            <IndexCard className="h-full" panelTexture="primary">
              <SectionEyebrow>Two paths. One belief.</SectionEyebrow>
              <p className={`${aboutBodyClass} mt-4`}>
                A chance conversation between two people with very different
                backgrounds became a shared belief:{" "}
                <span className="text-bp-accent">
                  creativity can rebuild identity, confidence and connection
                </span>{" "}
                - and that belief became{" "}
                <span className="font-bold">Brush Past</span>.
              </p>
            </IndexCard>
          </Reveal>
          <Reveal delay={REVEAL_STAGGER_MS * 2}>
            <IndexCard className="h-full" panelTexture="primary">
              <SectionEyebrow>{ABOUT_FOUNDERS_PATH.title}</SectionEyebrow>
              <p className={`${aboutBodyClass} mt-4`}>
                {ABOUT_FOUNDERS_PATH.body}
              </p>
              <div className="mt-6">
                <BoxImagePlaceholder
                  alt={ABOUT_FOUNDERS_PATH.photo.alt}
                  note={ABOUT_FOUNDERS_PATH.photo.note}
                  labelNumber={ABOUT_FOUNDERS_PATH.photo.photoNumber}
                  className="aspect-[4/3] min-h-[160px]"
                  objectPosition="center 18%"
                />
              </div>
            </IndexCard>
          </Reveal>
        </div>
      </TextureSection>

      <TextureSection
        texture="primary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <IndexCard panelTexture="secondary">
              <SectionEyebrow>{ABOUT_ORGANISATIONS.eyebrow}</SectionEyebrow>
              <h2
                className={`${bpTitleClass} ${bpTitleUtility} mt-2 text-[clamp(1.85rem,4vw,2.75rem)] font-bold leading-tight text-bp-text`}
              >
                {ABOUT_ORGANISATIONS.title}
              </h2>
              <p className={`${aboutBodyClass} mt-5`}>
                {ABOUT_ORGANISATIONS.body}
              </p>
            </IndexCard>
          </Reveal>
        </div>
      </TextureSection>

      <TextureSection
        texture="secondary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <HomeSectionTitle
              eyebrow="What we believe"
              title="Our values"
              eyebrowVariant="workshop"
            />
          </Reveal>

          <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-stretch lg:grid-cols-4">
            {ABOUT_VALUES.map((item, index) => {
              const Icon = brushPastIcons.aboutPageValues[item.icon];
              return (
                <li key={item.title} className="h-full min-h-0">
                  <Reveal delay={index * REVEAL_STAGGER_MS} className="h-full">
                    <IndexCard className="flex h-full min-h-[14rem] flex-col sm:min-h-[15.5rem]">
                      <BrushPastIconBadge icon={Icon} size="md" />
                      <h3 className="mt-4 text-2xl font-bold text-bp-text md:text-3xl">
                        {item.title}
                      </h3>
                      <p className={`${aboutBodySmClass} mt-3 flex-1`}>
                        {item.description}
                      </p>
                    </IndexCard>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </TextureSection>

      <TextureSection
        texture="primary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_1.1fr_0.95fr] lg:items-stretch">
          <Reveal>
            <div>
              <HomeSectionTitle
                eyebrow="On the ground"
                title="Workshops & support"
                align="left"
                className="!text-left"
              />
              <p className={`${aboutBodyClass} mt-8`}>{ABOUT_ON_THE_GROUND}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <HomeCta href="/shop" variant="primary">
                  Visit the shop →
                </HomeCta>
                <HomeCta href="/stories" variant="outline">
                  Read the stories →
                </HomeCta>
              </div>
            </div>
          </Reveal>

          <Reveal variant="fade-scale" delay={REVEAL_STAGGER_MS}>
            <PolaroidFrame index={2} className="h-fit">
              <BoxImagePlaceholder
                alt="Creative workshop at Brush Past"
                note="Workshop moments photograph for the about page."
                labelNumber={PHOTO.aboutWorkshopMoments}
                className="min-h-[240px] lg:min-h-[300px]"
                objectPosition="center 18%"
              />
              <p
                className={`${homeHandClass} ${bpWhisperUtility} mt-3 text-center text-xl text-bp-text/70 md:text-2xl`}
              >
                Workshop moments
              </p>
            </PolaroidFrame>
          </Reveal>

          <Reveal delay={REVEAL_STAGGER_MS * 2}>
            <IndexCard
              className="flex h-full flex-col justify-center"
              panelTexture="secondary"
            >
              <SectionEyebrow>Lived experience</SectionEyebrow>
              <p className={`${aboutBodyClass} mt-4`}>
                Our mentors and facilitators bring{" "}
                <span className="text-bp-accent">real understanding</span> -
                recovery, creativity, prison, homelessness and second chances.
                That trust is what makes the work honest and safe enough for
                people to show up fully.
              </p>
              <p className={`${aboutBodyClass} mt-6 text-bp-text/80`}>
                {MISSION_SUMMARY}
              </p>
            </IndexCard>
          </Reveal>
        </div>
      </TextureSection>

      <AboutLaunchBanner />

      <AboutNewsletter />
    </>
  );
}
