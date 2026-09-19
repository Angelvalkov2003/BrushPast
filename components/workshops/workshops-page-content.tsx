import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { AboutNewsletter } from "components/about/about-newsletter";
import {
  brushPastIcons,
  BrushPastIconBadge,
} from "components/icons/brush-past-icons";
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
  PAGE_HERO_MEDIA_FRAMELESS_CLASS,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
  homeHandClass,
} from "components/home/home-typography";
import { LaunchTransparencyBanner } from "components/shared/launch-transparency-banner";
import { PageHero } from "components/shared/page-hero";
import { TextureSection } from "components/shared/texture-section";
import { BoxImagePlaceholder } from "components/shop/box-image-placeholder";
import {
  PAST_WORKSHOPS,
  WORKSHOP_CATEGORIES,
  WORKSHOPS_CORE_VALUES,
  WORKSHOPS_MISSION_COLUMNS,
  WORKSHOPS_PROCESS,
} from "lib/workshops-config";

const workshopBodyClass = `${bpBodyClass} text-bp-text/90`;
const workshopBodySmClass = `${bpBodySmClass} text-bp-text/85`;

function HeroButtons({ className }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-4 ${className ?? ""}`}>
      <HomeCta href="/contact" variant="primary">
        Join a workshop →
      </HomeCta>
      <HomeCta href="/sponsor" variant="outline">
        Host or sponsor →
      </HomeCta>
    </div>
  );
}

export function WorkshopsPageContent() {
  return (
    <>
      <PageHero
        eyebrow="Brush Past workshops"
        title={
          <>
            <span className="text-bp-accent">Safe</span> space.{" "}
            <span className="text-bp-accent">Create</span> freely.
            <br />
            <span className="text-bp-accent">Find</span> your people.
          </>
        }
        titleClassName="leading-[0.92]"
        actions={<HeroButtons />}
        media={
          <PolaroidFrame index={0} className={PAGE_HERO_POLAROID_WRAP_CLASS}>
            <div
              className={`relative overflow-hidden bg-bp-surface ${PAGE_HERO_MEDIA_FRAMELESS_CLASS}`}
            >
              <Image
                src="/workshops.png"
                alt="Brush Past creative workshop"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <p
              className={`${homeHandClass} ${bpWhisperUtility} mt-3 text-center text-xl text-bp-text/75`}
            >
              Art of empowerment ★
            </p>
          </PolaroidFrame>
        }
      >
        <IndexCard
          className="mt-6 max-w-xl"
          panelTexture="secondary"
          panelTone="cream"
        >
          <p className={workshopBodyClass}>
            A space to{" "}
            <span className="text-bp-accent">breathe, make something</span>,
            and be yourself - without pressure to perform or explain.
            Creative workshops for anyone with a story, at any skill level.
          </p>
        </IndexCard>
        <p
          className={`${PAGE_HERO_WHISPER_INLINE_CLASS} ${homeHandClass} !mt-8 max-w-xl text-[clamp(1.35rem,2.8vw,1.75rem)] leading-snug text-bp-text`}
        >
          Everyone is welcome exactly as you are.
        </p>
      </PageHero>

      <TextureSection
        texture="secondary"
        className="px-4 py-12 md:px-10 md:py-16"
      >
        <div className="mx-auto max-w-[1400px]">
          <SectionEyebrow>What we run</SectionEyebrow>
          <h2
            className={`${bpTitleClass} ${bpTitleUtility} mt-1 text-3xl font-bold text-bp-text md:text-4xl`}
          >
            Workshop types
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {WORKSHOP_CATEGORIES.map((category) => {
              const chipClass = clsx(
                bpBodyClass,
                "border px-5 py-2.5 shadow-[2px_2px_0_rgba(1,2,0,0.06)] transition-colors",
                category.active
                  ? "border-bp-text/15 bg-bp-canvas/80 text-bp-text hover:border-bp-accent/50 hover:text-bp-accent"
                  : "cursor-not-allowed border-bp-text/8 bg-bp-text/[0.04] text-bp-text/35",
              );

              return (
                <li key={category.id}>
                  {category.active ? (
                    <a
                      href={`#past-${category.id}`}
                      className={chipClass}
                    >
                      {category.name}
                    </a>
                  ) : (
                    <span className={chipClass} aria-disabled="true">
                      {category.name}
                      <span className="ml-2 text-[0.7em] uppercase tracking-wider">
                        Soon
                      </span>
                    </span>
                  )}
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
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-3">
          <IndexCard>
            <p className={workshopBodyClass}>
              BrushPast began working with people in recovery, homelessness and
              incarceration - using creativity to{" "}
              <span className="text-bp-accent">
                rebuild identity and confidence
              </span>
              .{" "}
              <span className="font-bold">
                {WORKSHOPS_MISSION_COLUMNS.originHighlight}
              </span>
            </p>
          </IndexCard>
          <IndexCard className="flex flex-col justify-center">
            <p
              className={`${homeHandClass} ${bpWhisperUtility} text-[1.45rem] leading-snug text-bp-text md:text-[1.75rem]`}
            >
              <BrushUnderline>If</BrushUnderline> you have a story.{" "}
              <BrushUnderline>If</BrushUnderline> you can make something.{" "}
              <span className="text-bp-accent">You belong here.</span>
            </p>
          </IndexCard>
          <IndexCard className="flex flex-col justify-center border-bp-accent/25">
            <BrushPastIconBadge
              icon={brushPastIcons.workshopsPage.ownership}
              size="lg"
              className="mb-1"
            />
            <p
              className={`${bpTitleClass} ${bpTitleUtility} mt-4 text-2xl font-bold text-bp-text md:text-3xl`}
            >
              {WORKSHOPS_MISSION_COLUMNS.choiceLead}
            </p>
            <p className={`${workshopBodyClass} mt-3`}>
              Share your work, sell your work, or keep it private.{" "}
              <span className="text-bp-accent">
                It&apos;s your choice. Always.
              </span>
            </p>
          </IndexCard>
        </div>
      </TextureSection>

      <TextureSection
        texture="secondary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-[1400px]">
          <HomeSectionTitle
            eyebrow="Inside the room"
            title="What happens in our workshops"
            eyebrowVariant="workshop"
          />

          <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {WORKSHOPS_PROCESS.map((step, index) => {
              const StepIcon = brushPastIcons.workshopProcess[step.icon];
              return (
                <li key={step.title}>
                  <div className="flex flex-col items-center lg:items-start">
                    <BrushPastIconBadge
                      icon={StepIcon}
                      size="sm"
                      className="mb-3"
                    />
                    <p
                      className={`${bpTitleClass} ${bpTitleUtility} text-center text-2xl font-bold text-bp-text md:text-3xl lg:text-left`}
                    >
                      {step.title}
                    </p>
                  </div>
                  <PolaroidFrame
                    index={index + 1}
                    tilt={index % 2 === 0}
                    className="mt-3"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-bp-surface">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                        sizes="25vw"
                      />
                    </div>
                  </PolaroidFrame>
                  <p
                    className={`${workshopBodySmClass} mt-3 text-center lg:text-left`}
                  >
                    {step.caption}
                  </p>
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
        <div className="mx-auto max-w-[1400px]">
          <HomeSectionTitle
            eyebrow="Why it matters"
            title="What you get"
            eyebrowVariant="workshop"
          />

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {WORKSHOPS_CORE_VALUES.map((item) => {
              const Icon = brushPastIcons.workshopsPage[item.icon];
              return (
                <li key={item.title}>
                  <IndexCard
                    className="flex h-full flex-col text-center lg:text-left"
                    panelTexture="secondary"
                  >
                    <BrushPastIconBadge
                      icon={Icon}
                      size="md"
                      className="mx-auto lg:mx-0"
                    />
                    <h3
                      className={`${bpTitleClass} ${bpTitleUtility} mt-4 text-2xl font-bold text-bp-text`}
                    >
                      {item.title}
                    </h3>
                    <p className={`${workshopBodySmClass} mt-3 flex-1`}>
                      {item.description}
                    </p>
                  </IndexCard>
                </li>
              );
            })}
          </ul>
        </div>
      </TextureSection>

      <TextureSection
        texture="secondary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-[1400px]">
          <HomeSectionTitle
            eyebrow="From the archive"
            title="Past workshops"
            align="left"
            eyebrowVariant="workshop"
          />
          <ul className="mt-12 flex flex-col gap-12">
            {PAST_WORKSHOPS.map((workshop, index) => (
              <li
                key={workshop.categoryId}
                id={`past-${workshop.categoryId}`}
                className="scroll-mt-28"
              >
                <IndexCard
                  panelTexture={index % 2 === 0 ? "primary" : "secondary"}
                  className="!overflow-visible"
                >
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
                    <PolaroidFrame index={index} tilt={index % 2 === 0}>
                      {workshop.photoNumber != null ? (
                        <BoxImagePlaceholder
                          alt={
                            workshop.imageAlt ?? workshop.title
                          }
                          note={workshop.imageNote}
                          labelNumber={workshop.photoNumber}
                          className="aspect-[4/3] min-h-[220px]"
                        />
                      ) : (
                        <div className="relative aspect-[4/3] overflow-hidden bg-bp-surface">
                          <Image
                            src={workshop.image ?? "/workshops.png"}
                            alt={workshop.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                          />
                        </div>
                      )}
                    </PolaroidFrame>
                    <div>
                      <p
                        className={`${homeHandClass} ${bpWhisperUtility} text-lg text-bp-accent md:text-xl`}
                      >
                        {workshop.categoryLabel}
                      </p>
                      <h3
                        className={`${bpTitleClass} ${bpTitleUtility} mt-2 text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight text-bp-text`}
                      >
                        {workshop.title}
                      </h3>
                      <dl className={`${workshopBodySmClass} mt-4 space-y-1`}>
                        <div>
                          <dt className="inline font-semibold text-bp-text">
                            Location:{" "}
                          </dt>
                          <dd className="inline">{workshop.location}</dd>
                        </div>
                        <div>
                          <dt className="inline font-semibold text-bp-text">
                            Partner:{" "}
                          </dt>
                          <dd className="inline">{workshop.partner}</dd>
                        </div>
                        {workshop.facilitator ? (
                          <div>
                            <dt className="inline font-semibold text-bp-text">
                              Facilitator:{" "}
                            </dt>
                            <dd className="inline">{workshop.facilitator}</dd>
                          </div>
                        ) : null}
                      </dl>
                      <div className={`${workshopBodyClass} mt-5 space-y-4`}>
                        {workshop.body.map((paragraph) => (
                          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                        ))}
                      </div>
                      {workshop.quote ? (
                        <blockquote
                          className={`${homeHandClass} mt-6 border-l-[3px] border-bp-accent pl-4 text-[1.35rem] leading-snug text-bp-text md:text-[1.5rem]`}
                        >
                          &ldquo;{workshop.quote.text}&rdquo;
                          <footer
                            className={`${bpBodySmClass} mt-3 not-italic text-bp-text/65`}
                          >
                            — {workshop.quote.attribution}
                          </footer>
                        </blockquote>
                      ) : null}
                      {workshop.href ? (
                        <Link
                          href={workshop.href}
                          className={`${bpBodyClass} mt-6 inline-block font-bold text-bp-accent hover:underline`}
                        >
                          View workshop →
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </IndexCard>
              </li>
            ))}
          </ul>
        </div>
      </TextureSection>

      <LaunchTransparencyBanner />

      <TextureSection
        texture="primary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-3 lg:items-center">
          <p className={`${workshopBodyClass} max-w-md`}>
            Everyone has a story worth telling - and a place to make something
            real.{" "}
            <span className="text-bp-accent">
              There&apos;s a place for you here.
            </span>
          </p>
          <HeroButtons className="justify-center" />
          <p
            className={`${homeHandClass} ${bpWhisperUtility} relative text-center text-3xl leading-snug text-bp-text lg:text-right lg:text-4xl`}
          >
            Come as you are.
            <br />
            <span className="text-bp-accent">Leave differently.</span>
          </p>
        </div>
      </TextureSection>

      <AboutNewsletter />
    </>
  );
}
