import { Reveal, REVEAL_STAGGER_MS } from "components/shared/reveal";
import { brushPastIcons, BrushPastIconBadge } from "components/icons/brush-past-icons";
import { HOME_HOW_IT_WORKS } from "lib/home-config";
import { HomeSectionTitle, IndexCard } from "./home-decor";
import { homeHandClass } from "./home-typography";
import { HomeTextureSection } from "./home-texture-section";

export function HomeHowItWorks() {
  return (
    <HomeTextureSection texture="secondary" className="px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <HomeSectionTitle eyebrow="Our model" title="How it works" />
        </Reveal>

        <ol className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_HOW_IT_WORKS.map((step, i) => {
            const Icon = brushPastIcons.homepage[step.icon];
            const stepNum = String(i + 1).padStart(2, "0");

            return (
              <li key={step.title}>
                <Reveal delay={i * REVEAL_STAGGER_MS}>
                  <IndexCard className="flex h-full flex-col items-center text-center">
                    <span className={`${homeHandClass} text-3xl font-bold text-bp-accent`}>
                      {stepNum}
                    </span>
                    <BrushPastIconBadge icon={Icon} size="md" className="mt-4" />
                    <p className={`${homeHandClass} mt-5 text-xl leading-snug text-bp-text`}>
                      {step.title}
                    </p>
                  </IndexCard>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </HomeTextureSection>
  );
}
