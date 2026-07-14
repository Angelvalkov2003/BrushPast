import Image from "next/image";
import {
  brushPastIcons,
  BrushPastIconBadge,
} from "components/icons/brush-past-icons";
import {
  ABOUT_HERO_IMAGE,
  ABOUT_MENTORING_POINTS,
  ABOUT_PROCESS,
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
} from "components/home/home-decor";
import {
  bpBodyClass,
  bpBodySmClass,
  bpWhisperUtility,
  homeHandClass,
} from "components/home/home-typography";
import { Reveal, REVEAL_STAGGER_MS } from "components/shared/reveal";
import { TextureSection } from "components/shared/texture-section";
import { AboutLaunchBanner } from "./about-launch-banner";
import { AboutNewsletter } from "./about-newsletter";

const aboutBodyClass = bpBodyClass;
const aboutBodySmClass = `${bpBodySmClass} text-bp-text/85`;

export function AboutPageContent() {
  return (
    <>
      <TextureSection
        texture="primary"
        className="px-4 py-14 md:px-10 md:py-24"
      >
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div>
              <p
                className={`${homeHandClass} ${bpWhisperUtility} text-2xl text-bp-accent md:text-3xl`}
              >
                About Brush Past
              </p>
              <h1 className="mt-2 text-[clamp(2.75rem,7vw,4.75rem)] font-bold leading-[0.92] text-bp-text">
                Our mission.
                <br />
                Our purpose.
              </h1>
              <IndexCard className="mt-6 max-w-xl" panelTexture="secondary">
                <p className={aboutBodyClass}>
                  BrushPast exists to{" "}
                  <span className="text-bp-accent">
                    unlock overlooked creativity
                  </span>{" "}
                  in people rebuilding from homelessness, addiction,
                  incarceration and life&apos;s hardest chapters. Through art,
                  writing, photography and design, we help people{" "}
                  <span className="text-bp-accent">rebuild identity</span>, gain
                  confidence and connect with community - while a social
                  enterprise model funds the next opportunity.
                </p>
              </IndexCard>
              <p
                className={`${homeHandClass} ${bpWhisperUtility} mt-8 text-[clamp(1.75rem,4vw,2.25rem)] text-bp-text`}
              >
                Not spoken about.{" "}
                <span className="text-bp-accent">But speaking.</span>
              </p>
            </div>
          </Reveal>

          <Reveal variant="fade-scale" delay={REVEAL_STAGGER_MS}>
            <PolaroidFrame
              index={0}
              className="mx-auto w-full max-w-md lg:max-w-none"
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
        </div>
      </TextureSection>

      <TextureSection
        texture="secondary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <Reveal>
            <IndexCard panelTexture="primary">
              <p
                className={`${homeHandClass} ${bpWhisperUtility} text-xl text-bp-accent md:text-2xl`}
              >
                Where it began
              </p>
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
              <p
                className={`${homeHandClass} ${bpWhisperUtility} text-xl text-bp-accent md:text-2xl`}
              >
                Two paths. One belief.
              </p>
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
                title="Intervention & mentoring"
                align="left"
                className="!text-left"
              />
              <ul className="mt-8 space-y-5">
                {ABOUT_MENTORING_POINTS.map((point) => (
                  <li key={point} className={`${aboutBodyClass} flex gap-3`}>
                    <span className="shrink-0 text-bp-accent">✦</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal variant="fade-scale" delay={REVEAL_STAGGER_MS}>
            <PolaroidFrame index={2} className="h-fit">
              <div className="relative min-h-[240px] overflow-hidden bg-bp-text/5 lg:min-h-[300px]">
                <Image
                  src="/home-hero.png"
                  alt="Creative workshop at Brush Past"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
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
              <p
                className={`${homeHandClass} ${bpWhisperUtility} text-2xl text-bp-accent md:text-3xl`}
              >
                Lived experience
              </p>
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

      <TextureSection
        texture="secondary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <HomeSectionTitle
              eyebrow="The model"
              title="How we create change"
            />
          </Reveal>

          <ol className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-stretch lg:grid-cols-3">
            {ABOUT_PROCESS.map((step, index) => {
              const Icon = brushPastIcons.howWeCreateChange[step.icon];

              return (
                <li key={step.title} className="h-full min-h-0">
                  <Reveal delay={index * REVEAL_STAGGER_MS} className="h-full">
                    <IndexCard className="flex h-full min-h-[14rem] flex-col sm:min-h-[15.5rem]">
                      <BrushPastIconBadge icon={Icon} size="md" />
                      <h3 className="mt-4 text-2xl font-bold text-bp-text md:text-3xl">
                        {step.title}
                      </h3>
                      <p className={`${aboutBodySmClass} mt-3 flex-1`}>
                        {step.description}
                      </p>
                    </IndexCard>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          <Reveal delay={REVEAL_STAGGER_MS}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <HomeCta href="/shop" variant="primary">
                Visit the shop →
              </HomeCta>
              <HomeCta href="/stories" variant="outline">
                Read the stories →
              </HomeCta>
            </div>
          </Reveal>
        </div>
      </TextureSection>

      <AboutLaunchBanner />

      <AboutNewsletter />
    </>
  );
}
