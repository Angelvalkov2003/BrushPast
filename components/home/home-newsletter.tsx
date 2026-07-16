"use client";

import { Reveal, REVEAL_STAGGER_MS } from "components/shared/reveal";
import { NewsletterSignupForm } from "components/newsletter/newsletter-signup-form";
import { NEWSLETTER_SOURCE_HOME } from "lib/newsletter-config";
import { SectionEyebrow } from "./home-decor";
import {
  bpBodyClass,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
  homeHandClass,
} from "./home-typography";

export function HomeNewsletter() {
  return (
    <section className="relative overflow-hidden border-t border-bp-text/10 bg-bp-dark text-bp-canvas">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url(/home-hero.png)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-bp-dark/75" aria-hidden />

      <div className="relative mx-auto grid max-w-[1400px] gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-10 md:py-24">
        <Reveal>
          <div>
            <SectionEyebrow>Stay in the loop</SectionEyebrow>
            <h2
              className={`${bpTitleClass} ${bpTitleUtility} mt-2 text-4xl font-bold md:text-5xl`}
            >
              Join the story
            </h2>
            <p className={`${bpBodyClass} mt-4 max-w-md text-bp-canvas/75`}>
              Workshops, shop drops and moments from the journey - no spam, just
              the real stuff.
            </p>
            <NewsletterSignupForm
              source={NEWSLETTER_SOURCE_HOME}
              buttonLabel="Join us"
              variant="dark"
              className="mt-8"
            />
          </div>
        </Reveal>
        <Reveal delay={REVEAL_STAGGER_MS}>
          <p
            className={`${homeHandClass} ${bpWhisperUtility} text-center text-[clamp(1.75rem,4vw,2.75rem)] leading-snug text-bp-canvas md:text-right`}
          >
            A community that listens.
            <br />A movement that acts.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
