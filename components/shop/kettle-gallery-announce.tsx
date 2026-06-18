import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";
import { KETTLE_GALLERY } from "lib/kettle-gallery-config";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

export function KettleGalleryAnnounce() {
  return (
    <section
      aria-labelledby="kettle-gallery-heading"
      className="border-b border-bp-text/10 bg-bp-text text-bp-canvas"
    >
      <Link
        href={KETTLE_GALLERY.journalHref}
        className="group mx-auto grid max-w-[1400px] gap-0 md:grid-cols-2 md:items-stretch"
      >
        <div className="relative min-h-[280px] overflow-hidden md:min-h-[480px]">
          <Image
            src={KETTLE_GALLERY.image}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bp-text/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-bp-text/30"
            aria-hidden
          />
          <span className="absolute left-4 top-4 border border-bp-canvas/40 bg-bp-accent px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-bp-canvas md:left-6 md:top-6">
            {KETTLE_GALLERY.eyebrow}
          </span>
        </div>

        <div className="flex flex-col justify-center px-6 py-12 md:px-12 md:py-16 lg:px-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-bp-accent">
            Announcement
          </p>
          <h2
            id="kettle-gallery-heading"
            className="mt-3 text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.9] tracking-tight"
          >
            {KETTLE_GALLERY.title}
          </h2>
          <p
            className={`${caveat.className} mt-5 text-2xl leading-snug text-bp-canvas/95 md:text-3xl`}
          >
            Build your own frame. Hang the story where life happens.
          </p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-bp-canvas/75 md:text-base">
            {KETTLE_GALLERY.teaser}
          </p>
          <p className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-bp-canvas transition-colors group-hover:text-bp-accent">
            {KETTLE_GALLERY.cta}
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </p>
        </div>
      </Link>
    </section>
  );
}
