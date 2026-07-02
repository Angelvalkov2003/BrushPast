import type { ReactNode } from "react";
import { Reveal, REVEAL_STAGGER_MS } from "components/shared/reveal";
import { brushPastIcons, BrushPastIconBadge } from "components/icons/brush-past-icons";
import { HOME_IMPACT_PILLARS } from "lib/home-config";
import { TextureSection } from "components/shared/texture-section";
import { IndexCard } from "./home-decor";
import { homeHandClass } from "./home-typography";

const HeartIcon = brushPastIcons.homepage.keepAStoryClose;

function BrushUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <span
        className="pointer-events-none absolute -bottom-1 left-0 h-[0.32em] w-full -skew-x-6 bg-bp-accent/80"
        aria-hidden
      />
    </span>
  );
}

export function HomeImpact() {
  return (
    <TextureSection texture="primary" className="px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <Reveal>
          <IndexCard>
            <div className="flex items-start gap-4">
              <BrushPastIconBadge icon={HeartIcon} size="lg" className="mt-1" />
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
                  className={`${homeHandClass} mt-5 max-w-xl text-base italic leading-relaxed text-bp-text/80 md:text-lg`}
                >
                  Every purchase helps fund{" "}
                  <span className="font-medium text-bp-text not-italic">workshops</span>,{" "}
                  <span className="font-medium text-bp-text not-italic">mentorship</span> and{" "}
                  <span className="font-medium text-bp-text not-italic">recovery programmes</span>{" "}
                  across the UK.
                </p>
              </div>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-stretch">
              {HOME_IMPACT_PILLARS.map((item, i) => {
                const Icon = brushPastIcons.homepage[item.icon];
                return (
                  <li key={item.title} className="h-full min-h-0">
                    <Reveal delay={i * REVEAL_STAGGER_MS} className="h-full">
                      <div className="flex h-full min-h-[9.5rem] w-full flex-col items-center justify-center gap-3 border border-dashed border-bp-text/15 bg-bp-canvas/60 px-4 py-5 text-center sm:min-h-[10.5rem]">
                        <BrushPastIconBadge icon={Icon} size="sm" />
                        <span
                          className={`${homeHandClass} max-w-[11rem] text-lg leading-snug text-bp-text md:text-xl`}
                        >
                          {item.title}
                        </span>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </IndexCard>
        </Reveal>

        <Reveal delay={REVEAL_STAGGER_MS + 40}>
          <div className="flex flex-col items-center justify-center gap-6 lg:items-end lg:pt-6">
            <p
              className={`${homeHandClass} text-center text-[clamp(2rem,5vw,3rem)] leading-snug text-bp-text lg:text-right`}
            >
              Real impact.
              <br />
              Real second <BrushUnderline>chances</BrushUnderline>.
            </p>
            <BrushPastIconBadge
              icon={HeartIcon}
              size="lg"
              className="!h-14 !w-14 border-bp-accent/35 bg-bp-accent-bg shadow-[2px_3px_0_rgba(191,50,1,0.12)]"
              iconClassName="!h-7 !w-7"
            />
          </div>
        </Reveal>
      </div>
    </TextureSection>
  );
}
