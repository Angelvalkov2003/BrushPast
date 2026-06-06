import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function StoriesHero() {
  return (
    <header className="border-b border-bp-text/10 px-4 pb-10 pt-8 md:px-10 md:pb-14 md:pt-12">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-[clamp(3.5rem,12vw,9rem)] font-bold uppercase leading-[0.9] tracking-tight text-bp-text">
            Stories
          </h1>
          <p className="mt-4 max-w-xl text-lg text-bp-text/80 md:text-xl">
            Art. Writing. Photography. Real people. Real voices.
          </p>
        </div>
        <p
          className={`${caveat.className} max-w-xs text-2xl leading-snug text-bp-text md:text-3xl lg:max-w-sm lg:text-right`}
        >
          Not spoken about.
          <br />
          But speaking.
          <span className="mt-2 block h-0.5 w-full max-w-[200px] bg-bp-text/30 lg:ml-auto" aria-hidden />
        </p>
      </div>
    </header>
  );
}
