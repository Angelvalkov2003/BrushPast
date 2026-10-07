"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import clsx from "clsx";
import BrandLogo from "components/brand-logo";
import {
  HomeCta,
  IndexCard,
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
import {
  SPONSOR_CUSTOM_CARD,
  SPONSOR_TIERS,
  formatSponsorAmount,
  parseSponsorAmount,
  validateSponsorAmount,
  type SponsorTier,
} from "lib/sponsor-config";
import {
  DONATIONS_CHECKOUT_ENABLED,
  SPONSOR_PAGE,
} from "lib/sponsor-page-config";
import { CHARITY_LEGAL_NAME } from "lib/site-config";

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
  const checkoutEnabled = DONATIONS_CHECKOUT_ENABLED;

  const openPledge = (next: Pledge) => {
    if (!checkoutEnabled) return;
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
    if (!pledge || !checkoutEnabled) return;
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
      {!checkoutEnabled ? (
        <IndexCard panelTexture="primary" className="mb-6">
          <p
            className={`${bpTitleClass} ${bpTitleUtility} text-lg font-bold uppercase tracking-wide text-bp-text`}
          >
            Donations go to {CHARITY_LEGAL_NAME}
          </p>
          <p className={`${bpBodyClass} mt-3 text-bp-text/80`}>
            {SPONSOR_PAGE.chooseImpact.disabledNote}
          </p>
          <HomeCta href="/contact#contact-form" variant="primary" className="mt-6">
            Get in touch to donate →
          </HomeCta>
        </IndexCard>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {SPONSOR_TIERS.map((tier) => {
          const selected = selectedTierId === tier.id && !thanked && checkoutEnabled;
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => pickTier(tier)}
              disabled={!checkoutEnabled}
              aria-pressed={selected}
              className={clsx(
                "h-full border bg-bp-canvas/80 p-4 text-left transition-colors md:p-5",
                !checkoutEnabled && "cursor-not-allowed opacity-50",
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
        <div className="flex flex-wrap gap-3">
          <input
            ref={customInputRef}
            id="sponsor-custom-amount"
            type="text"
            inputMode="decimal"
            value={customRaw}
            disabled={!checkoutEnabled}
            onChange={(e) => {
              setCustomRaw(e.target.value);
              setCustomHint(null);
            }}
            className={clsx(inputClass, "max-w-[12rem]", !checkoutEnabled && "opacity-50")}
            placeholder="e.g. 75"
          />
          <button
            type="button"
            onClick={pickCustom}
            disabled={!checkoutEnabled}
            className={`${bpTitleClass} ${bpTitleUtility} border border-bp-text/20 bg-bp-canvas px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-bp-text transition-colors hover:border-bp-accent disabled:cursor-not-allowed disabled:opacity-50`}
          >
            Use this amount
          </button>
        </div>
        {customHint ? (
          <p className={`${bpBodySmClass} mt-2 text-bp-accent`}>{customHint}</p>
        ) : null}
      </div>

      <Modal
        open={Boolean(pledge)}
        onClose={closeModal}
        title={thanked ? "Thank you." : "Donate to the charity"}
      >
        {pledge && !thanked ? (
          <form onSubmit={submit} className="space-y-4">
            <p className={`${bpBodyClass} text-bp-text/80`}>
              {formatSponsorAmount(pledge.amountGbp)} — {pledge.title}
            </p>
            <p className={`${bpBodySmClass} text-bp-text/60`}>
              Payment goes to {CHARITY_LEGAL_NAME}.
            </p>
            <div>
              <label
                htmlFor="sponsor-full-name"
                className={`${bpBodySmClass} font-medium text-bp-text/80`}
              >
                Full name
              </label>
              <input
                id="sponsor-full-name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={inputClass}
                autoComplete="name"
              />
            </div>
            <div>
              <label
                htmlFor="sponsor-email"
                className={`${bpBodySmClass} font-medium text-bp-text/80`}
              >
                Email address
              </label>
              <input
                id="sponsor-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                autoComplete="email"
              />
            </div>
            <PrivacyPolicyCheckbox
              checked={privacy}
              onChange={setPrivacy}
              id="sponsor-privacy"
            />
            {error ? (
              <p className={`${bpBodySmClass} text-bp-accent`}>{error}</p>
            ) : null}
            <button
              type="submit"
              disabled={submitting}
              className={`${bpTitleClass} ${bpTitleUtility} w-full bg-bp-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-bp-canvas hover:opacity-90 disabled:opacity-60`}
            >
              {submitting ? "Starting…" : SPONSOR_PAGE.chooseImpact.cta}
            </button>
          </form>
        ) : null}
        {thanked && checkoutUrl ? (
          <div className="space-y-4">
            <p className={`${bpBodyClass} text-bp-text/80`}>
              Continue to secure payment for{" "}
              {pledge ? formatSponsorAmount(pledge.amountGbp) : "your gift"}.
            </p>
            <a
              href={checkoutUrl}
              className={`${bpTitleClass} ${bpTitleUtility} inline-flex bg-bp-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-bp-canvas hover:opacity-90`}
            >
              Continue to payment →
            </a>
          </div>
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
          <div className="flex min-h-[280px] items-center justify-center md:min-h-[360px]">
            <div className="relative flex w-full max-w-sm flex-col items-center justify-center border border-bp-text/10 bg-bp-canvas/70 px-8 py-14 shadow-[4px_5px_0_rgba(1,2,0,0.06)] md:py-16">
              <Image
                src="/background2.webp"
                alt=""
                fill
                className="object-cover opacity-40"
                sizes="400px"
                aria-hidden
              />
              <div className="relative z-10">
                <BrandLogo size="hero" priority />
              </div>
              <p
                className={`${homeHandClass} ${bpWhisperUtility} relative z-10 mt-6 text-center text-xl text-bp-text/70`}
              >
                Art of empowerment
              </p>
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

          <article className="relative mt-10 max-w-3xl border border-bp-text/12 bg-bp-canvas/80 p-6 shadow-[4px_5px_0_rgba(1,2,0,0.06)] md:mt-12 md:p-8">
            <p
              className={`${bpBodySmClass} font-bold uppercase tracking-[0.18em] text-bp-accent`}
            >
              Charity &amp; CIC
            </p>
            <h3
              className={`${bpTitleClass} ${bpTitleUtility} mt-2 text-xl font-bold uppercase tracking-wide text-bp-text md:text-2xl`}
            >
              {page.organisations.title}
            </h3>
            <p className={`${bpBodyClass} mt-4 leading-relaxed text-bp-text/80`}>
              {page.organisations.body}
            </p>
          </article>
        </div>
      </TextureSection>

      <TextureSection
        texture="secondary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div
          id="choose-your-impact"
          className="mx-auto max-w-[1400px] scroll-mt-28"
        >
          <div className="min-w-0 max-w-2xl">
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
        </div>
      </TextureSection>

      <TextureSection
        texture="primary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <SectionEyebrow>{page.partnership.eyebrow}</SectionEyebrow>
          <h2
            className={`${bpTitleClass} ${bpTitleUtility} mt-2 text-[clamp(2rem,5vw,3.25rem)] font-bold uppercase leading-[1.05] tracking-wide text-bp-text`}
          >
            {page.partnership.title}
          </h2>
          <span
            className="mt-4 block h-1 w-20 bg-bp-accent/90 [clip-path:polygon(0_0,100%_20%,98%_100%,2%_80%)]"
            aria-hidden
          />
          <p
            className={`${bpBodyClass} mt-6 leading-relaxed text-bp-text/80 md:text-lg`}
          >
            {page.partnership.body}
          </p>
          <p
            className={`${homeHandClass} ${bpWhisperUtility} mt-6 text-2xl leading-snug text-bp-text/70 md:text-3xl`}
          >
            Workshops. Wear. Gift boxes.{" "}
            <span className="text-bp-accent">Built with the CIC.</span>
          </p>
          <HomeCta
            href={page.partnership.ctaHref}
            variant="primary"
            className="mt-8"
          >
            {page.partnership.cta} →
          </HomeCta>
        </div>
      </TextureSection>
    </>
  );
}
