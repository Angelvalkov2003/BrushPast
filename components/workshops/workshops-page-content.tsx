import type { ReactNode } from "react";
import Image from "next/image";
import { AboutNewsletter } from "components/about/about-newsletter";
import { brushPastIcons, BrushPastIconBadge } from "components/icons/brush-past-icons";
import {
  HomeCta,
  HomeSectionTitle,
  IndexCard,
  PolaroidFrame,
} from "components/home/home-decor";
import { homeHandClass } from "components/home/home-typography";
import { LaunchTransparencyBanner } from "components/shared/launch-transparency-banner";
import { TextureSection } from "components/shared/texture-section";
import { WorkshopArchiveCard } from "components/workshops/workshop-archive-card";
import type { PublicWorkshop } from "lib/supabase/workshops";
import { hasWorkshopPage } from "lib/workshop-display";
import {
  WORKSHOP_CATEGORIES,
  WORKSHOPS_CORE_VALUES,
  WORKSHOPS_MISSION_COLUMNS,
  WORKSHOPS_PROCESS,
} from "lib/workshops-config";

function BrushUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <span
        className="pointer-events-none absolute -bottom-0.5 left-0 h-[0.35em] w-full -skew-x-6 bg-bp-accent/75"
        aria-hidden
      />
    </span>
  );
}

const workshopBodyHandClass = `${homeHandClass} text-[1.35rem] leading-relaxed text-bp-text/90 md:text-[1.55rem] md:leading-relaxed`;
const workshopBodyHandSmClass = `${homeHandClass} text-lg leading-snug text-bp-text/85 md:text-xl md:leading-relaxed`;

function HeroButtons({ className }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-4 ${className ?? ""}`}>
      <HomeCta href="/contact" variant="primary">
        Join a workshop →
      </HomeCta>
      <HomeCta href="/contact" variant="outline">
        Host or sponsor →
      </HomeCta>
    </div>
  );
}

export function WorkshopsPageContent({ workshops }: { workshops: PublicWorkshop[] }) {
  const archiveWorkshops = workshops.filter(hasWorkshopPage);

  return (
    <>
      <TextureSection texture="secondary" className="px-4 py-14 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className={`${homeHandClass} text-2xl text-bp-accent md:text-3xl`}>
              Brush Past workshops
            </p>
            <h1
              className={`${homeHandClass} mt-2 text-[clamp(2.75rem,7vw,4.5rem)] font-bold leading-[0.95] text-bp-text`}
            >
              Make space. Make something.
              <br />
              <span className="text-bp-accent">Be yourself.</span>
            </h1>
            <IndexCard className="mt-6 max-w-xl" panelTexture="primary">
              <p className={workshopBodyHandClass}>
                A space to <span className="text-bp-accent">breathe, make something</span>, and be
                yourself - without pressure to perform or explain. Creative workshops for anyone
                with a story, at any skill level.
              </p>
            </IndexCard>
            <HeroButtons className="mt-8" />
            <div
              className={`${homeHandClass} mt-8 flex items-center gap-3 text-2xl text-bp-text md:text-3xl`}
            >
              <BrushPastIconBadge
                icon={brushPastIcons.workshopsPage.safeSpace}
                size="sm"
                className="!h-10 !w-10"
              />
              Everyone is welcome. Exactly as you are.
            </div>
          </div>

          <PolaroidFrame index={0} className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/3] overflow-hidden bg-bp-surface lg:aspect-[5/4]">
              <Image
                src="/workshops.png"
                alt="Brush Past creative workshop"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <p className={`${homeHandClass} mt-3 text-center text-xl text-bp-text/75`}>
              Art of empowerment ★
            </p>
          </PolaroidFrame>
        </div>
      </TextureSection>

      <TextureSection texture="primary" className="px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1400px]">
          <p className={`${homeHandClass} text-xl text-bp-accent md:text-2xl`}>What we run</p>
          <h2 className={`${homeHandClass} mt-1 text-3xl font-bold text-bp-text md:text-4xl`}>
            Workshop types
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {WORKSHOP_CATEGORIES.map((name) => (
              <li
                key={name}
                className={`${homeHandClass} border border-bp-text/15 bg-bp-canvas/80 px-5 py-2.5 text-lg text-bp-text shadow-[2px_2px_0_rgba(1,2,0,0.06)]`}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </TextureSection>

      <section className="border-b border-bp-text/10 bg-[#faf7f2] px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-3">
          <IndexCard>
            <p className={workshopBodyHandClass}>
              BrushPast began working with people in recovery, homelessness and incarceration -
              using creativity to{" "}
              <span className="text-bp-accent">rebuild identity and confidence</span>.{" "}
              <span className="font-bold">{WORKSHOPS_MISSION_COLUMNS.originHighlight}</span>
            </p>
          </IndexCard>
          <IndexCard className="flex flex-col justify-center">
            <p className={`${homeHandClass} text-[1.45rem] leading-snug text-bp-text md:text-[1.75rem]`}>
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
            <p className={`${homeHandClass} mt-4 text-2xl font-bold text-bp-text md:text-3xl`}>
              {WORKSHOPS_MISSION_COLUMNS.choiceLead}
            </p>
            <p className={`${workshopBodyHandClass} mt-3`}>
              Share your work, sell your work, or keep it private.{" "}
              <span className="text-bp-accent">It&apos;s your choice. Always.</span>
            </p>
          </IndexCard>
        </div>
      </section>

      <TextureSection texture="secondary" className="px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <HomeSectionTitle eyebrow="Why it matters" title="What you get" />

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {WORKSHOPS_CORE_VALUES.map((item) => {
              const Icon = brushPastIcons.workshopsPage[item.icon];
              return (
                <li key={item.title}>
                  <IndexCard className="flex h-full flex-col text-center lg:text-left" panelTexture="primary">
                    <BrushPastIconBadge icon={Icon} size="md" className="mx-auto lg:mx-0" />
                    <h3 className={`${homeHandClass} mt-4 text-2xl font-bold text-bp-text`}>
                      {item.title}
                    </h3>
                    <p className={`${workshopBodyHandSmClass} mt-3 flex-1`}>{item.description}</p>
                  </IndexCard>
                </li>
              );
            })}
          </ul>
        </div>
      </TextureSection>

      <section className="border-b border-bp-text/10 bg-bp-canvas px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <HomeSectionTitle eyebrow="Inside the room" title="What happens in our workshops?" />

          <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {WORKSHOPS_PROCESS.map((step, index) => {
              const StepIcon = brushPastIcons.workshopProcess[step.icon];
              return (
              <li key={step.title}>
                <div className="flex flex-col items-center lg:items-start">
                  <BrushPastIconBadge icon={StepIcon} size="sm" className="mb-3" />
                  <p
                    className={`${homeHandClass} text-center text-2xl font-bold text-bp-text md:text-3xl lg:text-left`}
                  >
                    {step.title}
                  </p>
                </div>
                <PolaroidFrame index={index + 1} tilt={index % 2 === 0} className="mt-3">
                  <div className="relative aspect-[3/4] overflow-hidden bg-bp-surface">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="20vw"
                    />
                  </div>
                </PolaroidFrame>
                <p
                  className={`${workshopBodyHandSmClass} mt-3 text-center lg:text-left`}
                >
                  {step.caption}
                </p>
              </li>
              );
            })}
          </ul>
        </div>
      </section>

      {archiveWorkshops.length > 0 ? (
        <TextureSection texture="primary" className="px-4 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1400px]">
            <HomeSectionTitle eyebrow="From the archive" title="Past workshops" align="left" />
            <ul className="mt-12 flex flex-col gap-8">
              {archiveWorkshops.map((workshop, index) => (
                <li key={workshop.id}>
                  <WorkshopArchiveCard workshop={workshop} index={index} panelTexture="secondary" />
                </li>
              ))}
            </ul>
          </div>
        </TextureSection>
      ) : null}

      <LaunchTransparencyBanner />

      <TextureSection texture="secondary" className="px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-3 lg:items-center">
          <p className={`${workshopBodyHandClass} max-w-md`}>
            Everyone has a story worth telling - and a place to make something real.{" "}
            <span className="text-bp-accent">There&apos;s a place for you here.</span>
          </p>
          <HeroButtons className="justify-center" />
          <p
            className={`${homeHandClass} relative text-center text-3xl leading-snug text-bp-text lg:text-right lg:text-4xl`}
          >
            Come as you are.
            <br />
            <span className="text-bp-accent">Leave differently.</span>
            <svg
              className="absolute -left-2 top-1/2 hidden h-12 w-16 text-bp-accent lg:block lg:-translate-x-full"
              viewBox="0 0 64 48"
              fill="none"
              aria-hidden
            >
              <path
                d="M60 8C40 28 20 38 4 42"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </p>
        </div>
      </TextureSection>

      <AboutNewsletter />
    </>
  );
}
