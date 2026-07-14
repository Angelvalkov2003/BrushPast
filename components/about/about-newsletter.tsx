"use client";

import { NewsletterSignupForm } from "components/newsletter/newsletter-signup-form";
import {
  bpBodyClass,
  bpEmphasisUtility,
  bpLinkUtility,
  bpSubtitleClass,
  bpSubtitleUtility,
  bpTitleClass,
  bpTitleUtility,
} from "components/home/home-typography";
import { NEWSLETTER_SOURCE_ABOUT } from "lib/newsletter-config";
import { INSTAGRAM_URL } from "lib/site-config";

export function AboutNewsletter() {
  return (
    <section
      id="newsletter"
      className="relative overflow-hidden border-b border-bp-text/10 bg-bp-dark text-bp-canvas"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url(/home-hero.png)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-bp-dark/75" aria-hidden />

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:justify-between md:px-10 md:py-20">
        <div className="max-w-xl">
          <p
            className={`${bpSubtitleClass} ${bpSubtitleUtility} ${bpEmphasisUtility} text-bp-accent`}
          >
            Stay in the loop
          </p>
          <h2
            className={`${bpTitleClass} ${bpTitleUtility} mt-2 text-4xl font-bold md:text-5xl`}
          >
            Join the story
          </h2>
          <p className={`${bpBodyClass} mt-4 text-bp-canvas/75`}>
            Workshops, stories and shop drops - no spam, just the journey.
          </p>
          <NewsletterSignupForm
            source={NEWSLETTER_SOURCE_ABOUT}
            buttonLabel="Join us"
            variant="dark"
            className="mt-8"
          />
        </div>

        <ul className={`${bpBodyClass} flex items-center gap-8`}>
          <li>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${bpLinkUtility} text-bp-canvas/80 transition-colors hover:text-bp-accent`}
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
