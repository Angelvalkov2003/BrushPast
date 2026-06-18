"use client";

import { NewsletterSignupForm } from "components/newsletter/newsletter-signup-form";
import { NEWSLETTER_SOURCE_ABOUT } from "lib/newsletter-config";
import { INSTAGRAM_URL, LINKEDIN_URL } from "lib/site-config";

export function AboutNewsletter() {
  return (
    <section
      id="newsletter"
      className="border-b border-bp-text/10 bg-bp-surface px-4 py-12 md:px-10 md:py-16"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-xl font-bold uppercase tracking-wide text-bp-text md:text-2xl">
            Stay in the loop
          </h2>
          <p className="mt-2 text-sm text-bp-text/70">
            Workshops, stories and shop drops — no spam, just the journey.
          </p>
          <NewsletterSignupForm
            source={NEWSLETTER_SOURCE_ABOUT}
            buttonLabel="Subscribe"
            variant="light"
            className="mt-6"
          />
        </div>
        <ul className="flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.15em]">
          <li>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bp-text transition-colors hover:text-bp-accent"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bp-text transition-colors hover:text-bp-accent"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
