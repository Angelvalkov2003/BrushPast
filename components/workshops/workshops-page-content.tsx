import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Caveat, Lora } from "next/font/google";
import {
  ArrowPathIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  CurrencyPoundIcon,
  HeartIcon,
  LockClosedIcon,
  PencilSquareIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import {
  WORKSHOP_CATEGORIES,
  WORKSHOPS_CORE_VALUES,
  WORKSHOPS_HERO_INTRO,
  WORKSHOPS_IMPACT_STATS,
  WORKSHOPS_MISSION_COLUMNS,
  WORKSHOPS_PROCESS,
} from "lib/workshops-config";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const lora = Lora({ subsets: ["latin"], style: ["italic"], weight: ["400"] });

const VALUE_ICONS = {
  safe: UserGroupIcon,
  creative: PencilSquareIcon,
  connect: UsersIcon,
  opportunity: ArrowPathIcon,
  ownership: LockClosedIcon,
};

const STAT_ICONS = {
  people: UserGroupIcon,
  pound: CurrencyPoundIcon,
  calendar: CalendarDaysIcon,
  stories: BookOpenIcon,
};

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

function HeroButtons({ className }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-4 ${className ?? ""}`}>
      <Link
        href="/contact"
        className="inline-flex bg-bp-accent px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-bp-canvas transition-opacity hover:opacity-90"
      >
        Join a workshop
      </Link>
      <Link
        href="/contact"
        className="inline-flex border-2 border-bp-text px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-bp-text transition-colors hover:bg-bp-text hover:text-bp-canvas"
      >
        Host or sponsor
      </Link>
    </div>
  );
}

export function WorkshopsPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-bp-text/10 px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold uppercase leading-[1.05] tracking-tight text-bp-text">
              Make space. Make something.
              <br />
              <span className={`${caveat.className} text-[clamp(2.5rem,7vw,4.5rem)] normal-case text-bp-accent`}>
                Be yourself.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-bp-text/80 md:text-lg">
              {WORKSHOPS_HERO_INTRO}
            </p>
            <HeroButtons className="mt-8" />
            <p
              className={`${caveat.className} mt-8 flex items-center gap-2 text-xl text-bp-text md:text-2xl`}
            >
              <HeartIcon className="h-6 w-6 shrink-0 text-bp-accent" strokeWidth={1.5} />
              Everyone is welcome. Exactly as you are.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-bp-surface lg:aspect-[5/4]">
            <Image
              src="/workshops.png"
              alt="Brush Past creative workshop"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="absolute bottom-3 right-3 flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center rounded-full border border-bp-text/10 bg-bp-canvas text-center text-[0.48rem] font-bold uppercase leading-tight tracking-wider text-bp-text md:bottom-4 md:right-4 md:h-20 md:w-20 md:text-[0.5rem]"
              aria-hidden
            >
              <span className="text-bp-accent">★</span>
              Art of
              <br />
              empowerment
              <span className="text-bp-accent">★</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-bp-text/10 px-4 py-8 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bp-text/60">
            Workshop types
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {WORKSHOP_CATEGORIES.map((name) => (
              <li
                key={name}
                className="border border-bp-text/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-bp-text"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mission three columns */}
      <section className="border-b border-bp-text/10 bg-bp-surface px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-3">
          <p className="text-base leading-relaxed text-bp-text/80">
            {WORKSHOPS_MISSION_COLUMNS.origin}{" "}
            <strong className="text-bp-accent">{WORKSHOPS_MISSION_COLUMNS.originHighlight}</strong>
          </p>
          <p className={`${lora.className} text-xl leading-relaxed text-bp-text md:text-2xl`}>
            <BrushUnderline>If</BrushUnderline> you have a story.{" "}
            <BrushUnderline>If</BrushUnderline> you can make something. You belong here.
          </p>
          <div className="flex flex-col justify-center border border-bp-accent/20 bg-bp-canvas/80 p-6 md:p-8">
            <HeartIcon className="h-8 w-8 text-bp-accent" strokeWidth={1.25} />
            <p className="mt-4 text-base leading-relaxed text-bp-text">
              <strong className="font-bold">{WORKSHOPS_MISSION_COLUMNS.choiceLead}</strong>{" "}
              {WORKSHOPS_MISSION_COLUMNS.choiceBody}
            </p>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="border-b border-bp-text/10 px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {WORKSHOPS_CORE_VALUES.map((item) => {
              const Icon = VALUE_ICONS[item.icon];
              return (
                <li key={item.title} className="text-center lg:text-left">
                  <Icon className="mx-auto h-9 w-9 text-bp-text/75 lg:mx-0" strokeWidth={1.25} />
                  <h3 className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-bp-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-bp-text/70">{item.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* What happens */}
      <section className="border-b border-bp-text/10 bg-bp-canvas px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-bp-text md:text-3xl">
            What happens in our workshops?
          </h2>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {WORKSHOPS_PROCESS.map((step) => (
              <li key={step.title} className="flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-bp-surface">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.1em] text-bp-text">
                  {step.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-bp-text/70">{step.caption}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stats banner */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-bp-dark text-bp-canvas">
        <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-10 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1.9fr] lg:items-center">
            <p className="text-xl font-bold uppercase leading-snug tracking-wide md:text-2xl lg:text-3xl">
              Not spoken about.
              <br />
              But speaking.
              <br />
              <span className="text-bp-canvas/90">Real people. Real change.</span>
            </p>
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {WORKSHOPS_IMPACT_STATS.map((stat) => {
                const Icon = STAT_ICONS[stat.icon];
                return (
                  <li key={stat.label} className="text-center lg:text-left">
                    <Icon className="mx-auto h-7 w-7 text-bp-canvas/60 lg:mx-0" strokeWidth={1.25} />
                    <p className="mt-3 text-3xl font-bold text-bp-accent md:text-4xl">{stat.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-bp-canvas/65">
                      {stat.label}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-b border-bp-text/10 px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-3 lg:items-center">
          <p className="text-lg leading-relaxed text-bp-text/80">
            Everyone has a story worth telling — and a place to make something real. There&apos;s a
            place for you here.
          </p>
          <HeroButtons className="justify-center lg:justify-center" />
          <p
            className={`${caveat.className} relative text-center text-2xl text-bp-text lg:text-right lg:text-3xl`}
          >
            Come as you are.
            <br />
            Leave differently.
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
      </section>
    </>
  );
}
