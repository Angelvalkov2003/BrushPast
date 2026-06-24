import { HeartIcon } from "@heroicons/react/24/outline";
import { Reveal, REVEAL_STAGGER_MS } from "components/shared/reveal";
import { HOME_IMPACT_PILLARS } from "lib/home-config";
import { IndexCard } from "./home-decor";
import { homeHandClass, homeSerifClass } from "./home-typography";

export function HomeImpact() {
  return (
    <section className="border-b border-bp-text/10 bg-bp-canvas px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <Reveal>
          <IndexCard>
            <div className="flex items-start gap-4">
              <HeartIcon className="mt-2 h-8 w-8 shrink-0 text-bp-accent" strokeWidth={1.5} />
              <div className="min-w-0">
                <p
                  className={`${homeHandClass} text-[clamp(4.5rem,14vw,6.5rem)] font-bold leading-none text-bp-accent`}
                >
                  65%
                </p>
                <p
                  className={`${homeHandClass} mt-3 text-[clamp(1.5rem,3.5vw,2.15rem)] leading-snug text-bp-text`}
                >
                  of profits go straight back to{" "}
                  <span className="text-bp-accent">creators</span> and{" "}
                  <span className="text-bp-accent">partner organisations</span>.
                </p>
                <p
                  className={`${homeSerifClass} mt-5 max-w-xl text-base italic leading-relaxed text-bp-text/80 md:text-lg`}
                >
                  Every purchase helps fund{" "}
                  <span className="font-medium text-bp-text not-italic">workshops</span>,{" "}
                  <span className="font-medium text-bp-text not-italic">mentorship</span> and{" "}
                  <span className="font-medium text-bp-text not-italic">recovery programmes</span>{" "}
                  across the UK.
                </p>
              </div>
            </div>

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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
