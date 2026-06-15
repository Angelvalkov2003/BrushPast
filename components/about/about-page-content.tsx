import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lora } from "next/font/google";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  CurrencyPoundIcon,
  HandRaisedIcon,
  HeartIcon,
  PencilSquareIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import {
  ABOUT_HERO_IMAGE,
  ABOUT_IMPACT_STATS,
  ABOUT_MENTORING_POINTS,
  ABOUT_PROCESS,
  ABOUT_QUOTE,
  ABOUT_QUOTE_ASIDE,
  ABOUT_VALUES,
} from "lib/about-config";
import { MISSION_SUMMARY } from "lib/site-config";
import { AboutNewsletter } from "./about-newsletter";

const lora = Lora({ subsets: ["latin"], style: ["italic"], weight: ["400", "500"] });

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

const STAT_ICONS = {
  people: UserGroupIcon,
  pound: CurrencyPoundIcon,
  calendar: CalendarDaysIcon,
  stories: BookOpenIcon,
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
      {/* Hero */}
      <section className="border-b border-bp-text/10 px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">
              About BrushPast
            </p>
            <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-tight tracking-tight text-bp-text">
              Our mission.
              <br />
              Our purpose.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-bp-text/80 md:text-lg">
              BrushPast exists to unlock overlooked creativity in people rebuilding from
              homelessness, addiction, incarceration and life&apos;s hardest chapters. Through
              art, writing, photography and design, we help people rebuild identity, gain
              confidence and connect with community — while a social enterprise model funds the
              next opportunity.
            </p>
            <p className="mt-6 text-lg font-bold text-bp-text">
              Not spoken about. <span className="text-bp-accent">But speaking.</span>
            </p>
          </div>
          <div className="relative h-[clamp(22rem,58vw,36rem)] w-full overflow-hidden rounded-sm bg-bp-surface lg:h-[clamp(24rem,42vw,38rem)]">
            <Image
              src={ABOUT_HERO_IMAGE.src}
              alt={ABOUT_HERO_IMAGE.alt}
              fill
              className="object-cover [mask-image:linear-gradient(to_right,transparent_0%,black_18%)]"
              style={{ objectPosition: "50% 44%" }}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="border-b border-bp-text/10 bg-bp-canvas px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <blockquote className={`${lora.className} text-[clamp(1.75rem,4vw,2.75rem)] leading-snug text-bp-text`}>
            &ldquo;{ABOUT_QUOTE.slice(0, ABOUT_QUOTE.indexOf("same"))}
            <BrushUnderline>same</BrushUnderline>
            {ABOUT_QUOTE.slice(ABOUT_QUOTE.indexOf("same") + 4)}&rdquo;
          </blockquote>
          <p className="text-base leading-relaxed text-bp-text/75">{ABOUT_QUOTE_ASIDE}</p>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-bp-text/10 px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">
            What we believe
          </p>
          <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-bp-text/15">
            {ABOUT_VALUES.map((item) => {
              const Icon = VALUE_ICONS[item.icon];
              return (
                <li
                  key={item.title}
                  className="flex flex-col px-0 lg:px-8 first:lg:pl-0 last:lg:pr-0"
                >
                  <Icon className="h-10 w-10 text-bp-text/80" strokeWidth={1.25} />
                  <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.12em] text-bp-text">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-bp-text/70">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Intervention & mentoring */}
      <section className="border-b border-bp-text/10 bg-bp-surface px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_1.2fr_0.9fr] lg:items-stretch">
          <div>
            <h2 className="text-2xl font-bold uppercase leading-snug tracking-tight text-bp-text md:text-3xl">
              Intervention
              <br />
              &amp; mentoring
            </h2>
            <ul className="mt-8 space-y-4">
              {ABOUT_MENTORING_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-relaxed text-bp-text/80 md:text-base"
                >
                  <span
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-bp-accent"
                    aria-hidden
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[240px] overflow-hidden rounded-sm bg-bp-text/5 lg:min-h-[320px]">
            <Image
              src="/home-hero.png"
              alt="Creative workshop at Brush Past"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div className="flex flex-col justify-center border border-bp-text/10 bg-bp-canvas p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-bp-accent">
              Lived experience
            </p>
            <p className="mt-4 text-base leading-relaxed text-bp-text/80">
              Our mentors and facilitators bring real understanding — recovery, creativity,
              prison, homelessness and second chances. That trust is what makes the work honest
              and safe enough for people to show up fully.
            </p>
            <p className="mt-6 text-sm text-bp-text/60">{MISSION_SUMMARY}</p>
          </div>
        </div>
      </section>

      {/* How we create change */}
      <section className="border-b border-bp-text/10 px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-bp-text md:text-3xl">
            How we create change
          </h2>
          <ol className="mt-12 flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-6">
            {ABOUT_PROCESS.map((step, i) => {
              const Icon = PROCESS_ICONS[step.icon];
              return (
                <li
                  key={step.title}
                  className="relative flex flex-1 flex-col items-center text-center md:max-w-[280px]"
                >
                  {i > 0 ? (
                    <ArrowRightIcon
                      className="absolute -left-4 top-8 hidden h-6 w-6 text-bp-accent/50 md:-left-8 md:block lg:-left-10"
                      aria-hidden
                    />
                  ) : null}
                  <span className="text-xs font-bold text-bp-accent">{step.step}</span>
                  <Icon className="mt-3 h-10 w-10 text-bp-text/70" strokeWidth={1.25} />
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-bp-text">
                    {step.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-bp-text/70">
                    {step.description}
                  </p>
                  {i < ABOUT_PROCESS.length - 1 ? (
                    <ArrowRightIcon className="mt-6 h-5 w-5 text-bp-accent md:hidden" />
                  ) : null}
                </li>
              );
            })}
          </ol>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact#contact-form"
              className="inline-flex border-2 border-bp-accent px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-bp-accent transition-colors hover:bg-bp-accent hover:text-bp-canvas"
            >
              Share your story
            </Link>
            <Link
              href="/shop"
              className="inline-flex bg-bp-accent px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-bp-canvas hover:opacity-90"
            >
              Visit the shop
            </Link>
          </div>
        </div>
      </section>

      {/* Impact stats — full bleed */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-bp-dark text-bp-canvas">
        <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-10 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-center">
            <div>
              <p className="text-2xl font-bold uppercase leading-snug tracking-wide md:text-3xl">
                Real impact.
                <br />
                Real people.
                <br />
                <span className="text-bp-accent">Real change.</span>
              </p>
            </div>
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {ABOUT_IMPACT_STATS.map((stat) => {
                const Icon = STAT_ICONS[stat.icon];
                return (
                  <li key={stat.label} className="text-center lg:text-left">
                    <Icon className="mx-auto h-8 w-8 text-bp-accent lg:mx-0" strokeWidth={1.25} />
                    <p className="mt-3 text-3xl font-bold text-bp-accent md:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-bp-canvas/70">
                      {stat.label}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <AboutNewsletter />
    </>
  );
}
