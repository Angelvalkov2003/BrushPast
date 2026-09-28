import Link from "next/link";
import Footer from "components/layout/footer";
import {
  HomeCta,
  IndexCard,
  PolaroidFrame,
  SectionEyebrow,
} from "components/home/home-decor";
import {
  bpBodyClass,
  bpFontVariables,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
  homeHandClass,
  PAGE_HERO_H1_CLASS,
} from "components/home/home-typography";
import { RevealSection } from "components/shared/reveal-section";
import { TextureSection } from "components/shared/texture-section";
import { BoxImagePlaceholder } from "components/shop/box-image-placeholder";
import { PHOTOGRAPHY_WORKSHOP } from "lib/workshops/photography-workshop-content";

const COPY = PHOTOGRAPHY_WORKSHOP;
const bodyClass = `${bpBodyClass} text-bp-text/90`;

export function PhotographyWorkshopPage() {
  return (
    <div
      className={`${bpFontVariables} bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
    >
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

      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-10 md:grid-cols-2 md:items-center md:gap-12 md:px-10 md:py-14">
          <div>
            <SectionEyebrow>Photography · Past workshop</SectionEyebrow>
            <h1
              className={`${PAGE_HERO_H1_CLASS} mt-3 text-[clamp(2.4rem,6vw,4.25rem)]`}
            >
              {COPY.headline}
            </h1>
            <p className={`${homeHandClass} ${bpWhisperUtility} mt-4 text-xl text-bp-accent`}>
              {COPY.title}
            </p>
            <p className={`${bodyClass} mt-5 max-w-xl`}>{COPY.tagline}</p>
            <dl className={`${bpBodyClass} mt-6 space-y-1 text-sm text-bp-text/75`}>
              <div>
                <dt className="inline font-semibold text-bp-text">Location: </dt>
                <dd className="inline">{COPY.location}</dd>
              </div>
              <div>
                <dt className="inline font-semibold text-bp-text">Partner: </dt>
                <dd className="inline">{COPY.partner}</dd>
              </div>
              <div>
                <dt className="inline font-semibold text-bp-text">
                  Facilitator:{" "}
                </dt>
                <dd className="inline">{COPY.facilitator}</dd>
              </div>
            </dl>
          </div>
          <PolaroidFrame index={0}>
            <BoxImagePlaceholder
              alt={COPY.imageAlt}
              note={COPY.imageNote}
              labelNumber={COPY.photoNumber}
              className="aspect-[4/3] min-h-[260px]"
            />
          </PolaroidFrame>
        </div>
      </RevealSection>

      <TextureSection
        texture="secondary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-3">
          {COPY.narrativeColumns.map((column) => (
            <IndexCard key={column.title}>
              <h2
                className={`${bpTitleClass} ${bpTitleUtility} text-xl font-bold uppercase tracking-wide text-bp-accent`}
              >
                {column.title}
              </h2>
              <p className={`${bodyClass} mt-4`}>{column.body}</p>
            </IndexCard>
          ))}
        </div>
      </TextureSection>

      <TextureSection texture="primary" className="px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl">
          <blockquote
            className={`${homeHandClass} text-center text-2xl leading-snug text-bp-text md:text-3xl`}
          >
            &ldquo;{COPY.quote.text}&rdquo;
            <footer className={`${bpBodyClass} mt-4 text-base text-bp-text/60`}>
              {COPY.quote.attribution}
            </footer>
          </blockquote>
        </div>
      </TextureSection>

      <TextureSection
        texture="secondary"
        className="px-4 py-14 md:px-10 md:py-16"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-3">
            <p className={bodyClass}>{COPY.closing.left}</p>
            <p className={`${bodyClass} text-bp-text/70`}>{COPY.closing.right}</p>
          </div>
          <HomeCta href={COPY.closing.href} variant="primary">
            {COPY.closing.cta} →
          </HomeCta>
        </div>
      </TextureSection>

      <Footer />
    </div>
  );
}
