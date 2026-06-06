"use client";

import { Caveat } from "next/font/google";
import { useState } from "react";
import { toast } from "sonner";

const caveat = Caveat({ subsets: ["latin"], weight: ["400"] });

export function HomeNewsletter() {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Thanks — we'll be in touch soon.");
    setEmail("");
  };

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
          <form onSubmit={submit} className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="min-w-0 flex-1 border border-bp-canvas/30 bg-bp-canvas/10 px-4 py-3 text-sm text-bp-canvas placeholder:text-bp-canvas/50 focus:border-bp-accent focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-bp-accent px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-bp-canvas hover:opacity-90"
            >
              Join us
            </button>
          </form>
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
