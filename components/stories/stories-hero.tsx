"use client";

import { PageHero } from "components/shared/page-hero";
import { Reveal } from "components/shared/reveal";

const STORIES_TAGLINE = "Art. Writing. Photography. Real people. Real voices.";

export function StoriesHero() {
  return (
    <Reveal>
      <PageHero
        variant="index"
        eyebrow="Brush Past"
        title="Stories"
        intro={STORIES_TAGLINE}
        aside={
          <>
            Not spoken about.
            <br />
            <span className="text-bp-accent">But speaking.</span>
          </>
        }
      />
    </Reveal>
  );
}
