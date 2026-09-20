import Image from "next/image";
import Link from "next/link";
import {
  HeartIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Footer from "components/layout/footer";
import {
  HomeCta,
  HomeSectionTitle,
  IndexCard,
  PolaroidFrame,
  SectionEyebrow,
} from "components/home/home-decor";
import {
  bpBodyClass,
  bpBodySmClass,
  bpFontVariables,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
  homeHandClass,
  PAGE_HERO_H1_CLASS,
} from "components/home/home-typography";
import { RevealSection } from "components/shared/reveal-section";
import { TextureSection } from "components/shared/texture-section";
import { displayImageUrl } from "lib/image-url";
import { getPublicWorkshopBySlug } from "lib/supabase/workshops";
import { WORKSHOP_NO_1 } from "lib/workshops/workshop-no-1-content";

const COPY = WORKSHOP_NO_1;
const STAT_ICONS = {
  people: UserGroupIcon,
  shirt: SparklesIcon,
  heart: HeartIcon,
};

const bodyClass = `${bpBodyClass} text-bp-text/90`;
const bodySmClass = `${bpBodySmClass} text-bp-text/80`;

export async function WorkshopNo1Page() {
  const workshop = await getPublicWorkshopBySlug(COPY.slug);
  const heroImage = displayImageUrl(workshop?.image_url) ?? COPY.heroImage;

  return (
    <div
      className={`${bpFontVariables} bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
    >
      <div className="px-4 py-4 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Link
            href="/workshops"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-bp-text/70 hover:text-bp-accent hover:underline"
          >
            ← Back to workshops
          </Link>
        </div>
      </div>

      {/* Full-bleed hero — keep main workshop photo */}
      <RevealSection className="relative border-b border-bp-text/10">
        <div className="relative min-h-[440px] md:min-h-[580px]">
          <Image
            src={heroImage}
            alt={COPY.headline}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-bp-text/90 via-bp-text/40 to-bp-text/10"
            aria-hidden
          />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-[1400px] px-4 pb-12 pt-28 text-bp-canvas md:px-10 md:pb-16">
              <SectionEyebrow className="!text-bp-accent">
                T-Shirt Design · Past workshop
              </SectionEyebrow>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.28em] text-bp-canvas/75">
                {COPY.location} · Partner: {COPY.partner}
              </p>
              <h1 className={`${PAGE_HERO_H1_CLASS} mt-4 !text-bp-canvas`}>
                {COPY.headline}
              </h1>
              <p
                className={`${homeHandClass} ${bpWhisperUtility} mt-5 max-w-2xl text-2xl leading-snug text-bp-canvas/95 md:text-3xl`}
              >
                {COPY.tagline}
              </p>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Narrative — one composition of IndexCards */}
      <TextureSection
        texture="secondary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-[1400px]">
          <HomeSectionTitle
            eyebrow="Why it mattered"
            title="Creativity in a real room"
            align="left"
            eyebrowVariant="workshop"
          />
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {COPY.narrativeColumns.map((col, index) => (
              <li key={col.title}>
                <IndexCard
                  className="flex h-full flex-col"
                  panelTexture={index === 1 ? "primary" : "secondary"}
                  panelTone="cream"
                >
                  <p
                    className={`${homeHandClass} text-lg font-bold text-bp-accent md:text-xl`}
                  >
                    {col.title}
                  </p>
                  <p className={`${bodyClass} mt-4 flex-1`}>{col.body}</p>
                </IndexCard>
              </li>
            ))}
          </ul>
        </div>
      </TextureSection>

      {/* Create / Connect / Capture / Share / Opportunity */}
      <TextureSection
        texture="primary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-[1400px]">
          <HomeSectionTitle
            eyebrow="Inside the room"
            title="What happened that day"
            align="left"
            eyebrowVariant="workshop"
          />
          <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {COPY.moments.map((moment, index) => (
              <li key={moment.title}>
                <p
                  className={`${bpTitleClass} ${bpTitleUtility} text-center text-2xl font-bold text-bp-text lg:text-left`}
                >
                  {moment.title}
                </p>
                <PolaroidFrame
                  index={index}
                  tilt={index % 2 === 0}
                  className="mt-3"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-bp-surface">
                    <Image
                      src={moment.image}
                      alt={moment.title}
                      fill
                      className="object-cover"
                      sizes="20vw"
                    />
                  </div>
                </PolaroidFrame>
                <p
                  className={`${bodySmClass} mt-3 text-center lg:text-left`}
                >
                  {moment.caption}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </TextureSection>

      {/* Process strip */}
      <TextureSection
        texture="secondary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-[1400px]">
          <HomeSectionTitle
            eyebrow="The making"
            title={COPY.processTitle}
            align="left"
            eyebrowVariant="workshop"
          />
          <p className={`${bodyClass} mt-4 max-w-2xl`}>{COPY.processIntro}</p>
          <ul className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-7 lg:gap-4">
            {COPY.processSteps.map((step, index) => (
              <li key={step.label}>
                <PolaroidFrame
                  index={index + 2}
                  tilt={index % 2 === 0}
                  className="group"
                >
                  <div className="relative aspect-square overflow-hidden bg-bp-surface">
                    <Image
                      src={step.image}
                      alt={step.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="14vw"
                    />
                  </div>
                </PolaroidFrame>
                <p
                  className={`${homeHandClass} mt-3 text-center text-base text-bp-text/80`}
                >
                  {step.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </TextureSection>

      {/* Archive + stats */}
      <TextureSection
        texture="primary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionEyebrow>{COPY.archive.title}</SectionEyebrow>
            <p className={`${bodyClass} mt-5 max-w-lg`}>{COPY.archive.body}</p>
            <p
              className={`${homeHandClass} ${bpWhisperUtility} mt-8 text-2xl text-bp-text md:text-3xl`}
            >
              {COPY.archive.footerLine}
            </p>
          </div>
          <IndexCard panelTexture="secondary" panelTone="cream">
            <p
              className={`${bpTitleClass} ${bpTitleUtility} text-2xl font-bold uppercase tracking-wide text-bp-text`}
            >
              {COPY.archive.statsTitle}
            </p>
            <p className={`${bodySmClass} mt-2`}>{COPY.archive.statsLocation}</p>
            <ul className="mt-8 grid gap-8 sm:grid-cols-3">
              {COPY.archive.stats.map((stat) => {
                const Icon = STAT_ICONS[stat.icon];
                return (
                  <li key={stat.label} className="text-center sm:text-left">
                    <Icon
                      className="mx-auto h-7 w-7 text-bp-accent/80 sm:mx-0"
                      strokeWidth={1.25}
                    />
                    <p
                      className={`${bpTitleClass} ${bpTitleUtility} mt-3 text-4xl font-bold text-bp-accent`}
                    >
                      {stat.value}
                    </p>
                    <p className={`${bodySmClass} mt-1 uppercase tracking-[0.14em]`}>
                      {stat.label}
                    </p>
                  </li>
                );
              })}
            </ul>
          </IndexCard>
        </div>
      </TextureSection>

      {/* Collection */}
      <TextureSection
        texture="secondary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-[1400px]">
          <HomeSectionTitle
            eyebrow="Worn stories"
            title={COPY.collectionTitle}
            align="left"
            eyebrowVariant="workshop"
          />
          <p className={`${bodyClass} mt-4 max-w-2xl`}>
            {COPY.collectionIntro}
          </p>
          <ul className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
            {COPY.collection.map((item, index) => (
              <li key={item.number}>
                <PolaroidFrame index={index} tilt={index % 2 === 0}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-bp-surface">
                    <span
                      className={`${bpTitleClass} ${bpTitleUtility} absolute left-0 top-0 z-10 bg-bp-text px-2.5 py-1.5 text-[10px] font-bold text-bp-canvas`}
                    >
                      {item.number}
                    </span>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="20vw"
                    />
                  </div>
                </PolaroidFrame>
                <p
                  className={`${homeHandClass} mt-3 text-center text-lg text-bp-text`}
                >
                  {item.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </TextureSection>

      {/* Closing */}
      <TextureSection
        texture="primary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <p className={`${bodyClass} max-w-md`}>{COPY.closing.left}</p>
          <HomeCta href={COPY.closing.href} variant="primary">
            {COPY.closing.cta} →
          </HomeCta>
          <p className={`${bodyClass} max-w-md lg:ml-auto lg:text-right`}>
            {COPY.closing.right}
          </p>
        </div>
      </TextureSection>

      <Footer />
    </div>
  );
}
