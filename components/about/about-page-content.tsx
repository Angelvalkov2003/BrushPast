import Image from "next/image";
import {
  HandRaisedIcon,
  HeartIcon,
  PencilSquareIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import {
  ABOUT_HERO_IMAGE,
  ABOUT_MENTORING_POINTS,
  ABOUT_PROCESS,
  ABOUT_QUOTE,
  ABOUT_QUOTE_ASIDE,
  ABOUT_VALUES,
} from "lib/about-config";
import { MISSION_SUMMARY } from "lib/site-config";
import {
  HomeCta,
  HomeSectionTitle,
  IndexCard,
  PolaroidFrame,
} from "components/home/home-decor";
import { homeHandClass, homeSerifClass } from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";
import { AboutLaunchBanner } from "./about-launch-banner";
import { AboutNewsletter } from "./about-newsletter";

const VALUE_ICONS = {
  dignity: UsersIcon,
  creativity: PencilSquareIcon,
  opportunity: HeartIcon,
  community: HandRaisedIcon,
};

const PROCESS_ICONS = {
  share: UserGroupIcon,
  create: PencilSquareIcon,
  fund: HeartIcon,
};

function BrushUnderline({ children }: { children: React.ReactNode }) {
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

export function AboutPageContent() {
  return (
    <>
      <TextureSection texture="primary" className="px-4 py-14 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className={`${homeHandClass} text-2xl text-bp-accent md:text-3xl`}>
              About Brush Past
            </p>
            <h1
              className={`${homeHandClass} mt-2 text-[clamp(2.75rem,7vw,4.5rem)] font-bold leading-[0.95] text-bp-text`}
            >
              Our mission.
              <br />
              Our purpose.
            </h1>
            <p
              className={`${homeSerifClass} mt-6 max-w-xl text-lg leading-relaxed text-bp-text/85 md:text-xl`}
            >
              BrushPast exists to unlock overlooked creativity in people rebuilding from
              homelessness, addiction, incarceration and life&apos;s hardest chapters. Through
              art, writing, photography and design, we help people rebuild identity, gain
              confidence and connect with community — while a social enterprise model funds the
              next opportunity.
            </p>
            <p className={`${homeHandClass} mt-8 text-2xl text-bp-text md:text-3xl`}>
              Not spoken about. <span className="text-bp-accent">But speaking.</span>
            </p>
          </div>

          <PolaroidFrame index={0} className="mx-auto w-full max-w-md lg:max-w-none">
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
            <p className={`${homeHandClass} mt-3 text-center text-xl text-bp-text/75`}>
              Jeremy &amp; David
            </p>
          </PolaroidFrame>
        </div>
      </TextureSection>

      <section className="border-b border-bp-text/10 bg-bp-canvas px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <IndexCard>
            <blockquote
              className={`${homeSerifClass} text-[clamp(1.75rem,4vw,2.5rem)] italic leading-snug text-bp-text`}
            >
              &ldquo;{ABOUT_QUOTE.slice(0, ABOUT_QUOTE.indexOf("same"))}
              <BrushUnderline>same</BrushUnderline>
              {ABOUT_QUOTE.slice(ABOUT_QUOTE.indexOf("same") + 4)}&rdquo;
            </blockquote>
          </IndexCard>
          <p className={`${homeSerifClass} text-base leading-relaxed text-bp-text/80 md:text-lg`}>
            {ABOUT_QUOTE_ASIDE}
          </p>
        </div>
      </section>

      <TextureSection texture="secondary" className="px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <HomeSectionTitle eyebrow="What we believe" title="Our values" />

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_VALUES.map((item) => {
              const Icon = VALUE_ICONS[item.icon];
              return (
                <li key={item.title}>
                  <IndexCard className="flex h-full flex-col">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-bp-text/20 bg-bp-canvas">
                      <Icon className="h-5 w-5 text-bp-text/70" strokeWidth={1.5} />
                    </div>
                    <h3 className={`${homeHandClass} mt-4 text-2xl font-bold text-bp-text`}>
                      {item.title}
                    </h3>
                    <p
                      className={`${homeSerifClass} mt-3 flex-1 text-sm leading-relaxed text-bp-text/75`}
                    >
                      {item.description}
                    </p>
                  </IndexCard>
                </li>
              );
            })}
          </ul>
        </div>
      </TextureSection>

      <section className="border-b border-bp-text/10 bg-[#faf7f2] px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_1.1fr_0.95fr] lg:items-stretch">
          <div>
            <p className={`${homeHandClass} text-xl text-bp-accent md:text-2xl`}>
              On the ground
            </p>
            <h2
              className={`${homeHandClass} mt-1 text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight text-bp-text`}
            >
              Intervention &amp; mentoring
            </h2>
            <ul className="mt-8 space-y-4">
              {ABOUT_MENTORING_POINTS.map((point) => (
                <li
                  key={point}
                  className={`${homeSerifClass} flex gap-3 text-sm leading-relaxed text-bp-text/80 md:text-base`}
                >
                  <span className={`${homeHandClass} shrink-0 text-lg text-bp-accent`}>✦</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

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
            <p className={`${homeHandClass} mt-3 text-center text-lg text-bp-text/70`}>
              Workshop moments
            </p>
          </PolaroidFrame>

          <IndexCard className="flex flex-col justify-center">
            <p className={`${homeHandClass} text-xl text-bp-accent`}>Lived experience</p>
            <p className={`${homeSerifClass} mt-4 text-base leading-relaxed text-bp-text/80`}>
              Our mentors and facilitators bring real understanding — recovery, creativity,
              prison, homelessness and second chances. That trust is what makes the work honest
              and safe enough for people to show up fully.
            </p>
            <p className={`${homeSerifClass} mt-6 text-sm italic text-bp-text/60`}>
              {MISSION_SUMMARY}
            </p>
          </IndexCard>
        </div>
      </section>

      <TextureSection texture="secondary" className="px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <HomeSectionTitle eyebrow="The model" title="How we create change" />

          <ol className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {ABOUT_PROCESS.map((step) => {
              const Icon = PROCESS_ICONS[step.icon];
              const stepNum = String(step.step).padStart(2, "0");

              return (
                <li key={step.title}>
                  <IndexCard className="flex h-full flex-col items-center text-center">
                    <span className={`${homeHandClass} text-3xl font-bold text-bp-accent`}>
                      {stepNum}
                    </span>
                    <div className="mx-auto mt-4 flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-bp-text/20 bg-bp-canvas">
                      <Icon className="h-5 w-5 text-bp-text/70" strokeWidth={1.5} />
                    </div>
                    <p className={`${homeHandClass} mt-5 text-xl leading-snug text-bp-text`}>
                      {step.title}
                    </p>
                    <p
                      className={`${homeSerifClass} mt-3 text-sm leading-relaxed text-bp-text/75`}
                    >
                      {step.description}
                    </p>
                  </IndexCard>
                </li>
              );
            })}
          </ol>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <HomeCta href="/shop" variant="primary">
              Visit the shop →
            </HomeCta>
            <HomeCta href="/stories" variant="outline">
              Read the stories →
            </HomeCta>
          </div>
        </div>
      </TextureSection>

      <AboutLaunchBanner />

      <AboutNewsletter />
    </>
  );
}
