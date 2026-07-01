import Image from "next/image";
import Link from "next/link";
import {
  HeartIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Footer from "components/layout/footer";
import { homeHandClass } from "components/home/home-typography";
import { displayImageUrl } from "lib/image-url";
import { getPublicWorkshopBySlug } from "lib/supabase/workshops";
import { WORKSHOP_NO_1 } from "lib/workshops/workshop-no-1-content";

const COPY = WORKSHOP_NO_1;
const STAT_ICONS = {
  people: UserGroupIcon,
  shirt: SparklesIcon,
  heart: HeartIcon,
};

export async function WorkshopNo1Page() {
  const workshop = await getPublicWorkshopBySlug(COPY.slug);
  const heroImage = displayImageUrl(workshop?.image_url) ?? COPY.heroImage;

  return (
    <div className="bg-bp-canvas text-bp-text">
      <div className="px-4 py-4 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Link
            href="/workshops"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-bp-text/70 hover:text-bp-accent hover:underline"
          >
            ← Back to workshops
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative border-b border-bp-text/10">
        <div className="relative min-h-[420px] md:min-h-[560px]">
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-bp-text/85 via-bp-text/35 to-bp-text/15"
            aria-hidden
          />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-[1400px] px-4 pb-12 pt-24 text-bp-canvas md:px-10 md:pb-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-bp-accent">
                {COPY.location}
              </p>
              <h1 className="mt-3 text-[clamp(2.75rem,9vw,5.5rem)] uppercase leading-[0.9] tracking-tight">
                {COPY.headline}
              </h1>
              <p
                className={`${homeHandClass} mt-5 max-w-3xl text-2xl leading-snug text-bp-canvas/95 md:text-3xl`}
              >
                {COPY.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative columns */}
      <section className="border-b border-bp-text/10 bg-bp-surface px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-3 lg:gap-12">
          {COPY.narrativeColumns.map((col) => (
            <article key={col.title}>
              <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-bp-accent">
                {col.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-bp-text/82 md:text-[1.05rem]">
                {col.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Process gallery */}
      <section className="border-b border-bp-text/10 px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="text-center text-2xl font-bold uppercase tracking-wide md:text-3xl">
            {COPY.processTitle}
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8 lg:gap-3">
            {COPY.processSteps.map((step) => (
              <li key={step.label} className="group">
                <div className="relative aspect-square overflow-hidden rounded-sm bg-bp-surface">
                  <Image
                    src={step.image}
                    alt={step.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="12vw"
                  />
                </div>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-bp-text/75">
                  {step.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Archive + stats */}
      <section className="border-b border-bp-text/10 bg-bp-text text-bp-canvas">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-14 md:px-10 md:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-bp-accent">
              {COPY.archive.title}
            </h2>
            <p className={`${homeHandClass} mt-5 text-xl leading-relaxed text-bp-canvas/90 md:text-2xl`}>
              {COPY.archive.body}
            </p>
          </div>
          <div className="border border-bp-canvas/15 bg-bp-canvas/5 p-8 md:p-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-bp-accent">
              {COPY.archive.statsTitle}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-bp-canvas/65">
              {COPY.archive.statsLocation}
            </p>
            <ul className="mt-8 grid gap-8 sm:grid-cols-3">
              {COPY.archive.stats.map((stat) => {
                const Icon = STAT_ICONS[stat.icon];
                return (
                  <li key={stat.label} className="text-center sm:text-left">
                    <Icon className="mx-auto h-7 w-7 text-bp-canvas/55 sm:mx-0" strokeWidth={1.25} />
                    <p className="mt-3 text-4xl font-black text-bp-accent">{stat.value}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-bp-canvas/70">
                      {stat.label}
                    </p>
                  </li>
                );
              })}
            </ul>
            <p
              className={`${homeHandClass} mt-8 text-2xl text-bp-canvas/90 md:text-[1.75rem]`}
            >
              {COPY.archive.footerLine}
            </p>
          </div>
        </div>
      </section>

      {/* Collection grid */}
      <section className="border-b border-bp-text/10 px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="text-center text-2xl font-bold uppercase tracking-wide md:text-3xl">
            {COPY.collectionTitle}
          </h2>
          <ul className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
            {COPY.collection.map((item) => (
              <li key={item.number} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-bp-surface">
                  <span className="absolute left-0 top-0 z-10 bg-bp-text px-2.5 py-1.5 text-[10px] font-bold text-bp-canvas">
                    {item.number}
                  </span>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="20vw"
                  />
                </div>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-bp-text">
                  {item.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing */}
      <section className="px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-12">
          <p className="text-base leading-relaxed text-bp-text/80 md:text-lg">
            {COPY.closing.left}
          </p>
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-bp-text/15 text-bp-accent"
            aria-hidden
          >
            <span className="text-2xl">✳</span>
          </div>
          <p className="text-base leading-relaxed text-bp-text/80 md:text-lg lg:text-right">
            {COPY.closing.right}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
