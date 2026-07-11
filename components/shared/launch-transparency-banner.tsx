import Link from "next/link";
import {
  BookOpenIcon,
  CalendarDaysIcon,
  CurrencyPoundIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { ABOUT_IMPACT_STATS, ABOUT_LAUNCH_OVERLAY } from "lib/about-config";
import {
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
  homeHandClass,
} from "components/home/home-typography";

const STAT_ICONS = {
  people: UserGroupIcon,
  pound: CurrencyPoundIcon,
  calendar: CalendarDaysIcon,
  stories: BookOpenIcon,
};

type Props = {
  newsletterHref?: string;
};

export function LaunchTransparencyBanner({ newsletterHref = "#newsletter" }: Props) {
  return (
    <section
      aria-labelledby="launch-transparency-heading"
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-b border-bp-text/10 bg-bp-dark text-bp-canvas"
    >
      <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 py-8 md:px-10 md:py-10">
        <div
          className="pointer-events-none select-none blur-[5px] opacity-45"
          aria-hidden
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-8">
            <p
              id="launch-transparency-heading"
              className={`${bpTitleClass} ${bpTitleUtility} text-2xl font-bold leading-snug md:text-3xl`}
            >
              Real impact.
              <br />
              Real people.
              <br />
              <span className="text-bp-accent">Real change.</span>
            </p>
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
              {ABOUT_IMPACT_STATS.map((stat) => {
                const Icon = STAT_ICONS[stat.icon];
                return (
                  <li key={stat.label} className="text-center lg:text-left">
                    <Icon className="mx-auto h-5 w-5 text-bp-accent/80 lg:mx-0" strokeWidth={1.25} />
                    <p className={`${homeHandClass} ${bpWhisperUtility} mt-1.5 text-2xl font-bold text-bp-accent md:text-3xl`}>
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-sm text-bp-canvas/65">{stat.label}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-bp-dark/55 px-4 backdrop-blur-[2px]">
          <div className="flex w-full max-w-xl flex-col items-center gap-3 rounded-sm border border-bp-canvas/15 bg-bp-dark/75 px-5 py-5 text-center shadow-lg md:max-w-2xl md:flex-row md:justify-between md:gap-6 md:px-6 md:py-4 md:text-left">
            <div>
              <p className={`${homeHandClass} ${bpWhisperUtility} text-lg text-bp-accent`}>
                {ABOUT_LAUNCH_OVERLAY.eyebrow}
              </p>
              <p className={`${bpTitleClass} ${bpTitleUtility} mt-1 text-xl font-bold leading-snug text-bp-canvas md:text-2xl`}>
                {ABOUT_LAUNCH_OVERLAY.headline}
              </p>
            </div>
            <Link
              href={newsletterHref}
              className={`${bpTitleClass} ${bpTitleUtility} inline-flex shrink-0 bg-bp-accent px-6 py-3 text-lg font-bold text-bp-canvas shadow-[3px_3px_0_rgba(0,0,0,0.25)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none`}
            >
              {ABOUT_LAUNCH_OVERLAY.buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
