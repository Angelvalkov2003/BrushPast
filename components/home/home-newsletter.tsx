"use client";

import { Caveat } from "next/font/google";
import { NewsletterSignupForm } from "components/newsletter/newsletter-signup-form";
import { NEWSLETTER_SOURCE_HOME } from "lib/newsletter-config";

const caveat = Caveat({ subsets: ["latin"], weight: ["400"] });

export function HomeNewsletter() {
  return (
    <section className="relative overflow-hidden bg-bp-dark text-bp-canvas">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url(/home-hero.png)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-bp-dark/75" aria-hidden />

      <div className="relative mx-auto grid max-w-[1400px] gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-10 md:py-24">
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-wide md:text-4xl">Join the story</h2>
          <NewsletterSignupForm
            source={NEWSLETTER_SOURCE_HOME}
            buttonLabel="Join us"
            variant="dark"
            className="mt-8"
          />
        </div>
        <p className={`${caveat.className} text-center text-2xl md:text-right md:text-3xl`}>
          A community that listens.
          <br />
          A movement that acts.
        </p>
      </div>
    </section>
  );
}
