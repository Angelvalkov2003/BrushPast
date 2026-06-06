import { Caveat } from "next/font/google";
import {
  BuildingOffice2Icon,
  HeartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { PROFIT_REINVESTMENT } from "lib/site-config";
import { HOME_IMPACT_PILLARS } from "lib/home-config";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

const ICONS = {
  users: UserGroupIcon,
  building: BuildingOffice2Icon,
  "hand-heart": HeartIcon,
};

export function HomeImpact() {
  return (
    <section className="border-b border-bp-text/10 bg-bp-canvas px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="flex items-start gap-4">
            <HeartIcon className="h-12 w-12 shrink-0 text-bp-accent" strokeWidth={1.5} />
            <p className="text-2xl font-bold uppercase leading-snug tracking-wide text-bp-accent md:text-3xl">
              65% of profits are reinvested
            </p>
          </div>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-bp-text/80">{PROFIT_REINVESTMENT}</p>
          <p className="mt-2 max-w-2xl text-base text-bp-text/70">
            Supporting workshops, mentorship and recovery organisations across the UK.
          </p>

          <ul className="mt-10 grid gap-8 sm:grid-cols-3">
            {HOME_IMPACT_PILLARS.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <li key={item.title} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                  <Icon className="mb-3 h-8 w-8 text-bp-text/70" strokeWidth={1.5} />
                  <span className="text-sm font-semibold uppercase tracking-wide text-bp-text">
                    {item.title}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <p
          className={`${caveat.className} text-center text-2xl text-bp-text lg:text-right lg:text-3xl`}
        >
          Real impact.
          <br />
          Real second chances.
          <span className="mt-2 block h-0.5 w-full max-w-[220px] bg-bp-accent/60 lg:ml-auto" aria-hidden />
        </p>
      </div>
    </section>
  );
}
