"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import {
  HomeCta,
  HomeSectionTitle,
  IndexCard,
  PolaroidFrame,
  SectionEyebrow,
} from "components/home/home-decor";
import {
  bpBodyClass,
  bpBodySmClass,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
  homeHandClass,
} from "components/home/home-typography";
import { PageHero } from "components/shared/page-hero";
import { TextureSection } from "components/shared/texture-section";
import { PrivacyPolicyCheckbox } from "components/legal/privacy-policy-checkbox";
import { Modal } from "components/ui/modal";
import { BoxImagePlaceholder } from "components/shop/box-image-placeholder";
import {
  SPONSOR_CUSTOM_CARD,
  SPONSOR_TIERS,
  formatSponsorAmount,
  parseSponsorAmount,
  validateSponsorAmount,
  type SponsorTier,
} from "lib/sponsor-config";
import { SPONSOR_HERO_PHOTOS, SPONSOR_PAGE } from "lib/sponsor-page-config";

const inputClass = `mt-1.5 w-full border border-bp-text/20 bg-bp-canvas/50 px-3 py-2.5 ${bpBodySmClass} focus:border-bp-accent focus:outline-none focus:ring-1 focus:ring-bp-accent/30`;

type Pledge = {
  amountGbp: number;
  title: string;
  description: string;
};

function SponsorPledgePanel() {
  const customInputRef = useRef<HTMLInputElement>(null);
  const [customRaw, setCustomRaw] = useState("");
  const [customHint, setCustomHint] = useState<string | null>(null);
  const [selectedTierId, setSelectedTierId] = useState<string | null>(
    SPONSOR_TIERS[0]?.id ?? null,
  );
  const [pledge, setPledge] = useState<Pledge | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const thanked = Boolean(checkoutUrl);

  const openPledge = (next: Pledge) => {
    const valid = validateSponsorAmount(next.amountGbp);
    if (!valid.ok) {
      setCustomHint(valid.error);
      customInputRef.current?.focus();
      return;
    }
    setPledge(next);
    setFullName("");
    setEmail("");
    setPrivacy(false);
    setError(null);
    setCheckoutUrl(null);
    setCustomHint(null);
  };

  const pickTier = (tier: SponsorTier) => {
    setSelectedTierId(tier.id);
    setCustomRaw("");
    openPledge({
      amountGbp: tier.amountGbp,
      title: tier.name,
      description: tier.description,
    });
  };

  const pickCustom = () => {
    const amount = parseSponsorAmount(customRaw);
    if (amount == null) {
      setCustomHint("Write your amount first.");
      customInputRef.current?.focus();
      return;
    }
    const valid = validateSponsorAmount(amount);
    if (!valid.ok) {
      setCustomHint(valid.error);
      customInputRef.current?.focus();
      return;
    }
    setSelectedTierId("custom");
    openPledge({
      amountGbp: amount,
      title: SPONSOR_CUSTOM_CARD.name,
      description: SPONSOR_CUSTOM_CARD.description,
    });
  };

  const closeModal = () => {
    if (submitting) return;
    setPledge(null);
    setCheckoutUrl(null);
    setError(null);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!pledge) return;
    if (!privacy) {
      setError("Please accept the privacy policy to continue.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/sponsor/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim(),
          amount_gbp: pledge.amountGbp,
          privacy_policy_accepted: true,
        }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout.");
      }
      setCheckoutUrl(data.url);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Could not start checkout.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {SPONSOR_TIERS.map((tier) => {
          const selected = selectedTierId === tier.id && !thanked;
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => pickTier(tier)}
              aria-pressed={selected}
              className={clsx(
                "h-full border bg-bp-canvas/80 p-4 text-left transition-colors md:p-5",
                selected
                  ? "border-bp-text shadow-[3px_3px_0_rgba(1,2,0,0.12)]"
                  : "border-bp-text/15 hover:border-bp-accent/50",
              )}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p
                  className={clsx(
                    `${bpTitleClass} ${bpTitleUtility} text-[1.75rem] font-bold leading-none md:text-3xl`,
                    selected ? "text-bp-accent" : "text-bp-text",
                  )}
                >
                  {formatSponsorAmount(tier.amountGbp, tier.plus)}
                </p>
                <p
                  className={`${bpTitleClass} ${bpTitleUtility} text-sm font-bold uppercase tracking-[0.06em] text-bp-text md:text-base`}
                >
                  {tier.name}
                </p>
              </div>
              <p
                className={`${bpBodyClass} mt-2 text-sm leading-relaxed text-bp-text/70`}
              >
                {tier.description}
              </p>
            </button>
          );
        })}
      </div>

      <p className={`${bpBodySmClass} mt-5 text-bp-text/60`}>
        {SPONSOR_PAGE.chooseImpact.disclaimer}
      </p>

      <div className="mt-4">
        <label
          htmlFor="sponsor-custom-amount"
          className={`${bpBodySmClass} mb-1.5 block font-medium text-bp-text/75`}
        >
          Or enter your own amount £
        </label>
        <div className="relative">
          <span
            className={`${bpTitleClass} ${bpTitleUtility} absolute left-4 top-1/2 -translate-y-1/2 text-xl text-bp-text/45`}
            aria-hidden
          >
            £
          </span>
          <input
            ref={customInputRef}
            id="sponsor-custom-amount"
            inputMode="decimal"
            value={customRaw}
            onChange={(event) => {
              setCustomRaw(event.target.value);
              setCustomHint(null);
              setSelectedTierId("custom");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                pickCustom();
              }
            }}
            placeholder="0"
            className={`${bpBodyClass} w-full border border-bp-text/20 bg-bp-canvas py-3.5 pl-10 pr-4 text-bp-text placeholder:text-bp-text/35 focus:border-bp-accent focus:outline-none focus:ring-1 focus:ring-bp-accent/30`}
          />
        </div>
        {customHint ? (
          <p className={`${bpBodySmClass} mt-2 text-red-700`} role="alert">
            {customHint}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => {
          if (selectedTierId === "custom" || customRaw.trim()) {
            pickCustom();
            return;
          }
          const tier = SPONSOR_TIERS.find((item) => item.id === selectedTierId);
          if (tier) pickTier(tier);
          else pickCustom();
        }}
        className={`${bpTitleClass} ${bpTitleUtility} mt-5 w-full bg-bp-text px-7 py-3.5 text-base font-bold uppercase tracking-[0.1em] text-bp-canvas shadow-[3px_3px_0_rgba(191,50,1,0.25)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-bp-accent hover:shadow-none`}
      >
        {SPONSOR_PAGE.chooseImpact.cta}
      </button>
      <p className={`${bpBodySmClass} mt-3 text-bp-text/50`}>
        {SPONSOR_PAGE.chooseImpact.note}
      </p>

      <Modal
        open={pledge != null}
        onClose={closeModal}
        title={thanked ? "Thank you." : "Donate to the charity"}
        panelClassName="max-w-lg bg-[#faf6f0]"
      >
        {pledge && thanked ? (
          <div className="text-center">
            <p
              className={`${homeHandClass} ${bpWhisperUtility} text-2xl text-bp-accent`}
            >
              You&apos;re special to this cause.
            </p>
            <p className={`${bpBodyClass} mt-4 text-bp-text/80`}>
              Thank you for standing with the work. We&apos;ll be in touch
              personally — this gift deserves a conversation, not just a
              receipt.
            </p>
            <p
              className={`${bpTitleClass} ${bpTitleUtility} mt-6 text-3xl font-bold text-bp-text`}
            >
              {formatSponsorAmount(pledge.amountGbp)}
            </p>
            <p
              className={`${bpBodySmClass} mt-1 uppercase tracking-[0.14em] text-bp-text/50`}
            >
              {pledge.title}
            </p>
            <a
              href={checkoutUrl ?? "#"}
              className={`${bpTitleClass} ${bpTitleUtility} mt-8 inline-flex bg-bp-accent px-7 py-3 text-lg font-bold uppercase tracking-[0.08em] text-bp-canvas shadow-[3px_3px_0_rgba(1,2,0,0.2)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none`}
            >
              Continue to secure payment →
            </a>
          </div>
        ) : pledge ? (
          <form onSubmit={submit}>
            <p
              className={`${homeHandClass} ${bpWhisperUtility} text-xl text-bp-accent`}
            >
              {pledge.title}
            </p>
            <p
              className={`${bpTitleClass} ${bpTitleUtility} mt-1 text-4xl font-bold text-bp-text`}
            >
              {formatSponsorAmount(pledge.amountGbp)}
            </p>
            <p className={`${bpBodyClass} mt-3 text-sm text-bp-text/75`}>
              {pledge.description}
            </p>
            <div className="mt-6 space-y-4">
              <label className={`block ${bpBodyClass}`}>
                Name *
                <input
                  required
                  name="full_name"
                  autoComplete="name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={`block ${bpBodyClass}`}>
                Email *
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <div className="mt-5">
              <PrivacyPolicyCheckbox
                id="sponsor-privacy"
                checked={privacy}
                onChange={setPrivacy}
                suffix="for processing this donation"
              />
            </div>
            {error ? (
              <p className="mt-4 text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={submitting}
              className={`${bpTitleClass} ${bpTitleUtility} mt-6 w-full bg-bp-accent px-7 py-3 text-lg font-bold uppercase tracking-[0.08em] text-bp-canvas shadow-[3px_3px_0_rgba(1,2,0,0.2)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none`}
            >
              {submitting ? "Please wait…" : "Confirm donation"}
            </button>
          </form>
        ) : null}
      </Modal>
    </>
  );
}

export function SponsorPageContent() {
  const page = SPONSOR_PAGE;

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        handLine={page.hero.whisper}
        intro={page.hero.body}
        titleUppercase
        actions={
          <>
            <HomeCta href={page.hero.primaryHref} variant="primary">
              {page.hero.primaryCta}
            </HomeCta>
            <HomeCta href={page.hero.secondaryHref} variant="outline">
              {page.hero.secondaryCta}
            </HomeCta>
          </>
        }
        media={
          <div className="grid min-w-0 grid-cols-2 gap-4">
            <PolaroidFrame index={0} tilt={false}>
              <BoxImagePlaceholder
                alt={SPONSOR_HERO_PHOTOS.workshop.alt}
                note={SPONSOR_HERO_PHOTOS.workshop.note}
                labelNumber={SPONSOR_HERO_PHOTOS.workshop.photoNumber}
                className="aspect-[4/5] min-h-[160px]"
              />
            </PolaroidFrame>
            <div className="flex flex-col gap-4 pt-6">
              <IndexCard
                panelTexture={null}
                className="!bg-bp-dark !p-5 text-bp-canvas"
              >
                <p
                  className={`${homeHandClass} ${bpWhisperUtility} text-2xl text-bp-canvas`}
                >
                  Art of empowerment
                </p>
              </IndexCard>
              <PolaroidFrame index={1} tilt={false}>
                <BoxImagePlaceholder
                  alt={SPONSOR_HERO_PHOTOS.sketchbook.alt}
                  note={SPONSOR_HERO_PHOTOS.sketchbook.note}
                  labelNumber={SPONSOR_HERO_PHOTOS.sketchbook.photoNumber}
                  className="aspect-square min-h-[140px]"
                />
              </PolaroidFrame>
            </div>
          </div>
        }
      />

      <TextureSection texture="primary" className="px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-3xl">
            <p
              className={`${homeHandClass} ${bpWhisperUtility} text-2xl text-bp-accent md:text-3xl`}
            >
              One mission.
            </p>
            <h2
              className={`${bpTitleClass} ${bpTitleUtility} mt-1 text-[clamp(1.85rem,4.5vw,3rem)] font-bold uppercase leading-[1.05] tracking-wide text-bp-text`}
            >
              Two organisations.
            </h2>
            <span
              className="mt-4 block h-1 w-24 bg-bp-accent/90 [clip-path:polygon(0_0,100%_20%,98%_100%,2%_80%)]"
              aria-hidden
            />
          </div>

          <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
            <article className="relative border border-bp-text/12 bg-bp-canvas/80 p-6 shadow-[4px_5px_0_rgba(1,2,0,0.06)] md:p-8">
              <p
                className={`${bpTitleClass} ${bpTitleUtility} text-4xl font-bold text-bp-accent/35`}
              >
                01
              </p>
              <p
                className={`${bpBodySmClass} mt-3 font-bold uppercase tracking-[0.18em] text-bp-accent`}
              >
                Charity
              </p>
              <h3
                className={`${bpTitleClass} ${bpTitleUtility} mt-2 text-xl font-bold uppercase tracking-wide text-bp-text md:text-2xl`}
              >
                {page.organisations.foundation.name}
              </h3>
              <p className={`${bpBodyClass} mt-4 leading-relaxed text-bp-text/80`}>
                {page.organisations.foundation.body}
              </p>
            </article>

            <article className="relative border border-bp-text/12 bg-bp-canvas/80 p-6 shadow-[4px_5px_0_rgba(1,2,0,0.06)] md:p-8">
              <p
                className={`${bpTitleClass} ${bpTitleUtility} text-4xl font-bold text-bp-text/20`}
              >
                02
              </p>
              <p
                className={`${bpBodySmClass} mt-3 font-bold uppercase tracking-[0.18em] text-bp-text/50`}
              >
                Trading
              </p>
              <h3
                className={`${bpTitleClass} ${bpTitleUtility} mt-2 text-xl font-bold uppercase tracking-wide text-bp-text md:text-2xl`}
              >
                {page.organisations.cic.name}
              </h3>
              <p className={`${bpBodyClass} mt-4 leading-relaxed text-bp-text/80`}>
                {page.organisations.cic.body}
              </p>
            </article>
          </div>
        </div>
      </TextureSection>

      <TextureSection
        texture="secondary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-[1400px]">
          <HomeSectionTitle title={page.whereSupportGoes.title} align="left" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {page.whereSupportGoes.items.map((item, index) => (
              <div key={item.title} className="min-w-0">
                <PolaroidFrame index={index} tilt={false} className="pb-6">
                  <BoxImagePlaceholder
                    alt={item.title}
                    note={item.imageNote}
                    labelNumber={item.photoNumber}
                    className="aspect-[4/3] min-h-[120px]"
                  />
                </PolaroidFrame>
                <h3
                  className={`${bpTitleClass} ${bpTitleUtility} mt-4 text-lg font-bold uppercase tracking-wide text-bp-text`}
                >
                  {item.title}
                </h3>
                <p className={`${bpBodySmClass} mt-2 text-bp-text/70`}>
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </TextureSection>

      <TextureSection
        texture="primary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div
          id="choose-your-impact"
          className="mx-auto grid max-w-[1400px] scroll-mt-28 gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16"
        >
          <div className="min-w-0">
            <SectionEyebrow>{page.chooseImpact.eyebrow}</SectionEyebrow>
            <h2
              className={`${bpTitleClass} ${bpTitleUtility} mt-2 text-[clamp(2rem,5vw,3.25rem)] font-bold uppercase leading-[1.05] text-bp-text`}
            >
              {page.chooseImpact.title}
            </h2>
            <p className={`${bpBodyClass} mt-3 max-w-xl text-bp-text/75`}>
              {page.chooseImpact.whisper}
            </p>
            <div className="mt-8">
              <SponsorPledgePanel />
            </div>
          </div>

          <div className="min-w-0">
            <p
              className={`${bpTitleClass} ${bpTitleUtility} text-sm font-bold uppercase tracking-[0.18em] text-bp-text/45`}
            >
              {page.testimonial.eyebrow}
            </p>
            <PolaroidFrame index={2} className="mt-4" tilt={false}>
              <BoxImagePlaceholder
                alt="Sponsor testimonial artwork"
                note={page.testimonial.imageNote}
                labelNumber={page.testimonial.photoNumber}
                className="aspect-[4/3] min-h-[200px]"
              />
            </PolaroidFrame>
            <blockquote
              className={`${bpBodyClass} mt-6 text-xl italic leading-relaxed text-bp-text/80`}
            >
              “{page.testimonial.quote}”
            </blockquote>
            <p className={`${bpBodySmClass} mt-3 text-bp-text/55`}>
              {page.testimonial.attribution}
            </p>
          </div>
        </div>
      </TextureSection>

      <TextureSection
        texture="secondary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto grid max-w-[1400px] items-end gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] lg:gap-16">
          <div className="min-w-0">
            <SectionEyebrow>{page.partnership.eyebrow}</SectionEyebrow>
            <h2
              className={`${bpTitleClass} ${bpTitleUtility} mt-2 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[1.02] tracking-wide text-bp-text`}
            >
              {page.partnership.title}
            </h2>
            <span
              className="mt-4 block h-1 w-20 bg-bp-accent/90 [clip-path:polygon(0_0,100%_20%,98%_100%,2%_80%)]"
              aria-hidden
            />
            <p
              className={`${bpBodyClass} mt-6 max-w-2xl leading-relaxed text-bp-text/80 md:text-lg`}
            >
              {page.partnership.body}
            </p>
            <HomeCta
              href={page.partnership.ctaHref}
              variant="primary"
              className="mt-8"
            >
              {page.partnership.cta} →
            </HomeCta>
          </div>

          <div className="min-w-0 lg:pb-2">
            <p
              className={`${homeHandClass} ${bpWhisperUtility} max-w-sm text-2xl leading-snug text-bp-text/70 md:text-3xl lg:ml-auto lg:text-right`}
            >
              Workshops. Wear. Gift boxes.
              <span className="mt-2 block text-bp-accent">
                Built with the CIC.
              </span>
            </p>
          </div>
        </div>
      </TextureSection>

      <section className="relative overflow-hidden border-t border-bp-text/10 bg-bp-dark text-bp-canvas">
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-10 md:py-20">
          <div>
            <h2
              className={`${bpTitleClass} ${bpTitleUtility} text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[1.05]`}
            >
              {page.closing.title}{" "}
              <span
                className={`${homeHandClass} ${bpWhisperUtility} text-bp-accent normal-case`}
              >
                {page.closing.thankYou}
              </span>
            </h2>
            <HomeCta
              href={page.closing.ctaHref}
              variant="primary"
              className="mt-8"
            >
              {page.closing.cta}
            </HomeCta>
          </div>
          <div className="relative min-w-0">
            <PolaroidFrame index={3} tilt={false}>
              <BoxImagePlaceholder
                alt="Brush Past branded mug"
                note={page.closing.imageNote}
                labelNumber={page.closing.photoNumber}
                className="aspect-[4/3] min-h-[200px]"
              />
            </PolaroidFrame>
            <div className="absolute -bottom-3 right-4 max-w-[12rem] rotate-[-3deg] border border-bp-text/10 bg-bp-accent px-4 py-3 text-bp-canvas shadow-[3px_3px_0_rgba(0,0,0,0.2)] md:right-8">
              <p className={`${homeHandClass} ${bpWhisperUtility} text-lg`}>
                {page.closing.note}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
