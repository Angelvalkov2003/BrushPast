"use client";

import { JOURNAL_HERO_TAGLINE } from "lib/journal-config";
import { PageHero } from "components/shared/page-hero";
import { Reveal, REVEAL_STAGGER_MS } from "components/shared/reveal";

export function JournalHero() {
  return (
    <Reveal>
      <PageHero
        variant="index"
        eyebrow="Brush Past"
        title="Journal"
        intro={JOURNAL_HERO_TAGLINE}
        aside={
          <>
            Updates from
            <br />
            the journey.
          </>
        }
      />
    </Reveal>
  );
}
