"use client";

import { homeHandClass, homeSerifClass } from "components/home/home-typography";
import { Reveal, REVEAL_STAGGER_MS } from "components/shared/reveal";
import { TextureSection } from "components/shared/texture-section";

const STORIES_TAGLINE = "Art. Writing. Photography. Real people. Real voices.";

export function StoriesHero() {
  return (
    <TextureSection as="header" texture="primary" className="px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <div>
            <p className={`${homeHandClass} text-2xl text-bp-accent md:text-3xl`}>Brush Past</p>
            <h1
              className={`${homeHandClass} mt-1 text-[clamp(3.5rem,12vw,8rem)] font-bold leading-[0.88] text-bp-text`}
            >
              Stories
            </h1>
            <p className={`${homeSerifClass} mt-5 max-w-xl text-lg italic text-bp-text/85 md:text-xl`}>
              {STORIES_TAGLINE}
            </p>
          </div>
        </Reveal>
        <Reveal delay={REVEAL_STAGGER_MS}>
          <div className="lg:text-right">
            <p
              className={`${homeHandClass} max-w-xs text-3xl leading-snug text-bp-text md:text-4xl lg:ml-auto`}
            >
              Not spoken about.
              <br />
              <span className="text-bp-accent">But speaking.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </TextureSection>
  );
}
