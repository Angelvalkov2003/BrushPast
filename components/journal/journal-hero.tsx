"use client";

import { JOURNAL_HERO_TAGLINE } from "lib/journal-config";
import { bpHandUtility, bpSubtitleClass, homeHandClass } from "components/home/home-typography";
import { Reveal, REVEAL_STAGGER_MS } from "components/shared/reveal";
import { TextureSection } from "components/shared/texture-section";

export function JournalHero() {
  return (
    <TextureSection as="header" texture="primary" className="px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <div>
            <p className={`${homeHandClass} text-2xl text-bp-accent md:text-3xl`}>Brush Past</p>
            <h1 className="mt-1 text-[clamp(3.5rem,11vw,7rem)] font-bold leading-[0.9] text-bp-text">
              Journal
            </h1>
            <p className={`${bpSubtitleClass} mt-5 max-w-xl text-lg leading-relaxed text-bp-text/85 md:text-xl`}>
              {JOURNAL_HERO_TAGLINE}
            </p>
          </div>
        </Reveal>
        <Reveal delay={REVEAL_STAGGER_MS}>
          <div className="lg:text-right">
            <p
              className={`${homeHandClass} ${bpHandUtility} max-w-xs text-3xl leading-snug text-bp-text md:text-4xl lg:ml-auto`}
            >
              Updates from
              <br />
              the journey.
            </p>
          </div>
        </Reveal>
      </div>
    </TextureSection>
  );
}
