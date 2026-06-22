import Image from "next/image";
import Link from "next/link";
import { PolaroidFrame } from "components/home/home-decor";
import { homeHandClass, homeSerifClass } from "components/home/home-typography";
import { KETTLE_GALLERY } from "lib/kettle-gallery-config";

export function KettleGalleryAnnounce() {
  return (
    <section
      aria-labelledby="kettle-gallery-heading"
      className="border-b border-bp-text/10 bg-[#faf7f2] px-4 py-14 md:px-10 md:py-20"
    >
      <Link
        href={KETTLE_GALLERY.journalHref}
        className="group mx-auto grid max-w-[1400px] gap-10 md:grid-cols-2 md:items-center md:gap-14"
      >
        <PolaroidFrame index={3} className="group-hover:rotate-0">
          <div className="relative min-h-[280px] overflow-hidden md:min-h-[400px]">
            <Image
              src={KETTLE_GALLERY.image}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <p className={`${homeHandClass} mt-3 text-center text-lg text-bp-accent`}>
            {KETTLE_GALLERY.eyebrow}
          </p>
        </PolaroidFrame>

        <div>
          <p className={`${homeHandClass} text-xl text-bp-accent md:text-2xl`}>Announcement</p>
          <h2
            id="kettle-gallery-heading"
            className={`${homeHandClass} mt-2 text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[0.92] text-bp-text`}
          >
            {KETTLE_GALLERY.title}
          </h2>
          <p className={`${homeHandClass} mt-5 text-2xl leading-snug text-bp-text/90 md:text-3xl`}>
            Build your own frame. Hang the story where life happens.
          </p>
          <p className={`${homeSerifClass} mt-5 max-w-md text-base leading-relaxed text-bp-text/75`}>
            {KETTLE_GALLERY.teaser}
          </p>
          <p
            className={`${homeHandClass} mt-8 text-xl text-bp-accent transition-colors group-hover:text-bp-text`}
          >
            {KETTLE_GALLERY.cta} →
          </p>
        </div>
      </Link>
    </section>
  );
}
