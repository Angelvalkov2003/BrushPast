import { Caveat } from "next/font/google";
import { JOURNAL_HERO_TAGLINE } from "lib/journal-config";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function JournalHero() {
  return (
    <header className="border-b border-bp-text/10 px-4 pb-10 pt-8 md:px-10 md:pb-14 md:pt-12">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">
            BrushPast
          </p>
          <h1 className="mt-2 text-[clamp(3rem,10vw,7rem)] font-bold uppercase leading-[0.92] tracking-tight text-bp-text">
            Journal
          </h1>
          <p className="mt-4 max-w-xl text-lg text-bp-text/80 md:text-xl">{JOURNAL_HERO_TAGLINE}</p>
        </div>
        <p
          className={`${caveat.className} max-w-xs text-2xl leading-snug text-bp-text md:text-3xl lg:max-w-sm lg:text-right`}
        >
          Updates from
          <br />
          the journey.
          <span className="mt-2 block h-0.5 w-full max-w-[200px] bg-bp-text/30 lg:ml-auto" aria-hidden />
        </p>
      </div>
    </header>
  );
}
