import { HeartIcon } from "@heroicons/react/24/outline";
import { Reveal, REVEAL_STAGGER_MS } from "components/shared/reveal";
import { PROFIT_REINVESTMENT } from "lib/site-config";
import { HOME_IMPACT_PILLARS } from "lib/home-config";
import { IndexCard } from "./home-decor";
import { homeHandClass, homeSerifClass } from "./home-typography";

export function HomeImpact() {
  return (
    <section className="border-b border-bp-text/10 bg-bp-canvas px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <Reveal>
          <IndexCard>
            <div className="flex items-start gap-3">
              <HeartIcon className="h-9 w-9 shrink-0 text-bp-accent" strokeWidth={1.5} />
              <p className={`${homeHandClass} text-3xl font-bold leading-snug text-bp-accent md:text-4xl`}>
                65% of profits are reinvested
              </p>
            </div>
            <p className={`${homeSerifClass} mt-5 text-lg leading-relaxed text-bp-text/85`}>
              {PROFIT_REINVESTMENT}
            </p>
            <p className={`${homeSerifClass} mt-3 text-base italic text-bp-text/70`}>
              Supporting workshops, mentorship and recovery organisations across the UK.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {HOME_IMPACT_PILLARS.map((item, i) => (
                <li key={item.title}>
                  <Reveal delay={i * REVEAL_STAGGER_MS}>
                    <div className="border border-dashed border-bp-text/15 bg-bp-canvas/60 px-4 py-5 text-center">
                      <span className={`${homeHandClass} text-xl text-bp-text`}>{item.title}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </IndexCard>
        </Reveal>

        <Reveal delay={REVEAL_STAGGER_MS + 40}>
          <div className="flex flex-col justify-center lg:pt-6">
            <p
              className={`${homeHandClass} text-center text-[clamp(2rem,5vw,3rem)] leading-snug text-bp-text lg:text-right`}
            >
              Real impact.
              <br />
              Real second chances.
            </p>
            <svg
              className="mx-auto mt-4 h-10 w-16 text-bp-accent/70 lg:ml-auto lg:mr-0"
              viewBox="0 0 64 40"
              fill="none"
              aria-hidden
            >
              <path
                d="M4 28C18 12 36 8 60 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
