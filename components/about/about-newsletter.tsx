"use client";

import { useState } from "react";
import { toast } from "sonner";
import { INSTAGRAM_URL, LINKEDIN_URL } from "lib/site-config";

export function AboutNewsletter() {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Thanks — we'll be in touch soon.");
    setEmail("");
  };

  return (
    <section className="border-b border-bp-text/10 bg-bp-surface px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-xl font-bold uppercase tracking-wide text-bp-text md:text-2xl">
            Stay in the loop
          </h2>
          <p className="mt-2 text-sm text-bp-text/70">
            Workshops, stories and shop drops — no spam, just the journey.
          </p>
          <form onSubmit={submit} className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="min-w-0 flex-1 border border-bp-text/15 bg-bp-canvas px-4 py-3 text-sm text-bp-text placeholder:text-bp-text/40 focus:border-bp-accent focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-bp-accent px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-bp-canvas hover:opacity-90"
            >
              Subscribe
            </button>
          </form>
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
