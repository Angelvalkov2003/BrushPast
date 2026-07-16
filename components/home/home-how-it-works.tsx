import { Reveal, REVEAL_STAGGER_MS } from "components/shared/reveal";
import { brushPastIcons, BrushPastIconBadge } from "components/icons/brush-past-icons";
import { HOME_HOW_IT_WORKS } from "lib/home-config";
import { HomeSectionTitle, IndexCard } from "./home-decor";
import { bpTitleClass, bpTitleUtility } from "./home-typography";
import { HomeTextureSection } from "./home-texture-section";

export function HomeHowItWorks() {
  return (
    <HomeTextureSection texture="secondary" className="px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <HomeSectionTitle
            eyebrow="Our model"
            title="How it works"
            eyebrowVariant="workshop"
          />
        </Reveal>

        <ol className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-stretch lg:grid-cols-4">
          {HOME_HOW_IT_WORKS.map((step, i) => {
            const Icon = brushPastIcons.homepage[step.icon];
            const stepNum = String(i + 1).padStart(2, "0");

            return (
              <li key={step.title} className="h-full min-h-0">
                <Reveal delay={i * REVEAL_STAGGER_MS} className="h-full">
                  <IndexCard className="flex h-full min-h-[14rem] flex-col sm:min-h-[15.5rem]">
                    <BrushPastIconBadge icon={Icon} size="md" />
                    <p className={`${bpTitleClass} ${bpTitleUtility} mt-4 text-3xl font-bold text-bp-accent`}>
                      {stepNum}
                    </p>
                    <h3 className={`${bpTitleClass} ${bpTitleUtility} mt-2 text-2xl font-bold leading-snug text-bp-text md:text-3xl`}>
                      {step.title}
                    </h3>
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
