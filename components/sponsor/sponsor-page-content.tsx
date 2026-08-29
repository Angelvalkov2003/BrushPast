"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  ArchiveBoxIcon,
  ArrowPathIcon,
  HeartIcon,
  LightBulbIcon,
  LockClosedIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { BrushPastIconBadge } from "components/icons/brush-past-icons";
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
import { SPONSOR_PAGE } from "lib/sponsor-page-config";

function SprayCanIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
      aria-hidden
    >
      <path d="M10 3h4v2h-4z" />
      <path d="M11 5h2v2h-2z" />
      <rect x="8" y="7" width="8" height="13" rx="1.5" />
      <path d="M16.5 4.5c1.2-.4 2.4.1 3 1.2" />
      <path d="M18.2 3.2c.15-.6.7-1 1.3-.9" />
    </svg>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
      aria-hidden
    >
      <path d="M5 19c8-1 12-7 13-14-7 1-13 5-14 13z" />
      <path d="M8 16c2-3 5-5 9-7" />
    </svg>
  );
}

function HandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
      aria-hidden
    >
      <path d="M8 13V7a1.5 1.5 0 013 0v4" />
      <path d="M11 11V5.5a1.5 1.5 0 013 0V11" />
      <path d="M14 10.5V6.5a1.5 1.5 0 013 0V14" />
      <path d="M8 13v2a5 5 0 0010 0v-3.5" />
      <path d="M8 13l-1.5-1.2a1.8 1.8 0 00-2.5.2 1.8 1.8 0 00.2 2.5L8 17" />
    </svg>
  );
}

const VALUE_ICONS = {
  heart: HeartIcon,
  leaf: LeafIcon,
  people: UserGroupIcon,
  sparkle: SparklesIcon,
  gift: ArchiveBoxIcon,
} as const;

const TIER_ICONS = {
  heart: HeartIcon,
  spray: SprayCanIcon,
  people: UserGroupIcon,
  star: SparklesIcon,
} as const;

const CYCLE_ICONS = {
  create: LightBulbIcon,
  produce: HandIcon,
  share: ArchiveBoxIcon,
  reinvest: ArrowPathIcon,
} as const;

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
      <div className="grid gap-4 sm:grid-cols-2">
        {SPONSOR_TIERS.map((tier) => {
          const Icon = TIER_ICONS[tier.icon];
          const selected = selectedTierId === tier.id && !thanked;
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => pickTier(tier)}
              aria-pressed={selected}
              className="h-full text-left focus-visible:outline-offset-4"
            >
              <IndexCard
                className={clsx(
                  "flex h-full flex-col !p-5 transition-shadow md:!p-6",
                  selected
                    ? "!border-bp-accent ring-2 ring-inset ring-bp-accent"
                    : "hover:border-bp-accent/40",
                )}
              >
                <p
                  className={clsx(
                    `${bpTitleClass} ${bpTitleUtility} text-3xl font-bold`,
                    selected ? "text-bp-accent" : "text-bp-text",
                  )}
                >
                  {formatSponsorAmount(tier.amountGbp, tier.plus)}
                </p>
                <p
                  className={`${bpTitleClass} ${bpTitleUtility} mt-3 text-lg font-bold uppercase tracking-[0.06em] text-bp-text`}
                >
                  {tier.name}
                </p>
                <p
                  className={`${bpBodyClass} mt-3 flex-1 text-sm leading-relaxed text-bp-text/75`}
                >
                  {tier.description}
                </p>
                <BrushPastIconBadge icon={Icon} size="sm" className="mt-6" />
              </IndexCard>
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        <label htmlFor="sponsor-custom-amount" className="sr-only">
          Or enter your own amount
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
            placeholder="Or enter your own amount"
            className={`${bpBodyClass} w-full border border-bp-text/20 bg-bp-canvas/70 py-3.5 pl-10 pr-4 text-bp-text placeholder:text-bp-text/40 focus:border-bp-accent focus:outline-none focus:ring-1 focus:ring-bp-accent/30`}
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
        className={`${bpTitleClass} ${bpTitleUtility} mt-5 w-full bg-bp-accent px-7 py-3.5 text-lg font-bold uppercase tracking-[0.08em] text-bp-canvas shadow-[3px_3px_0_rgba(1,2,0,0.2)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none`}
      >
        Become a sponsor
      </button>
      <p
        className={`${bpBodySmClass} mt-3 flex items-center gap-2 text-bp-text/50`}
      >
        <LockClosedIcon className="h-4 w-4 shrink-0" aria-hidden />
        Secure payments. Your details are safe with us.
      </p>

      <Modal
        open={pledge != null}
        onClose={closeModal}
        title={thanked ? "Thank you." : "Become a sponsor"}
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
                suffix="for processing this sponsorship"
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
              {submitting ? "Please wait…" : "Confirm sponsorship"}
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
      <TextureSection
        as="header"
        texture="secondary"
        className="px-4 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <div className="min-w-0">
            <h1
              className={`${bpTitleClass} ${bpTitleUtility} text-[clamp(2.75rem,7vw,5rem)] font-bold uppercase leading-[0.92] text-bp-text`}
            >
              {page.hero.title}
            </h1>
            <p
              className={`${homeHandClass} ${bpWhisperUtility} mt-4 text-2xl text-bp-accent md:text-3xl`}
            >
              {page.hero.whisper}
            </p>
            <p className={`${bpBodyClass} mt-6 max-w-lg text-bp-text/80`}>
              {page.hero.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <HomeCta href={page.hero.primaryHref} variant="primary">
                {page.hero.primaryCta}
              </HomeCta>
              <HomeCta href={page.hero.secondaryHref} variant="outline">
                {page.hero.secondaryCta}
              </HomeCta>
            </div>
          </div>
          <div className="grid min-w-0 grid-cols-2 gap-4">
            <PolaroidFrame index={0} tilt={false}>
              <BoxImagePlaceholder
                alt="Sponsor collage — workshop"
                note="IMAGE NEEDED: Workshop / collage photo for sponsor hero."
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
                  alt="Sponsor collage — sketchbook"
                  note="IMAGE NEEDED: Sketchbook / dried flower still life."
                  className="aspect-square min-h-[140px]"
                />
              </PolaroidFrame>
            </div>
          </div>
        </div>
      </TextureSection>

      <TextureSection texture="primary" className="px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-[1400px] gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {page.values.map((item) => {
            const Icon = VALUE_ICONS[item.icon];
            return (
              <div key={item.title} className="min-w-0 text-center lg:text-left">
                <BrushPastIconBadge icon={Icon} size="md" className="mx-auto lg:mx-0" />
                <p
                  className={`${bpTitleClass} ${bpTitleUtility} mt-4 text-sm font-bold uppercase tracking-[0.12em] text-bp-text`}
                >
                  {item.title}
                </p>
                <p className={`${bpBodySmClass} mt-2 text-bp-text/65`}>
                  {item.note}
                </p>
              </div>
            );
          })}
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
            <p
              className={`${homeHandClass} ${bpWhisperUtility} mt-3 text-xl text-bp-text/75`}
            >
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
        <div className="mx-auto max-w-[1400px]">
          <HomeSectionTitle title={page.cycle.title} />
          <p
            className={`${bpBodyClass} mx-auto mt-4 max-w-2xl text-center text-bp-text/75`}
          >
            {page.cycle.intro}
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {page.cycle.steps.map((step) => {
              const Icon = CYCLE_ICONS[step.icon];
              return (
                <div key={step.title} className="text-center">
                  <div className="flex justify-center">
                    <BrushPastIconBadge icon={Icon} size="lg" />
                  </div>
                  <p
                    className={`${bpTitleClass} ${bpTitleUtility} mt-4 text-xl font-bold uppercase tracking-wide text-bp-text`}
                  >
                    {step.title}
                  </p>
                  <p className={`${bpBodySmClass} mt-2 text-bp-text/65`}>
                    {step.note}
                  </p>
                </div>
              );
            })}
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

      <TextureSection texture="primary" className="px-4 py-10 md:px-10">
        <div className="mx-auto max-w-[1400px] text-center">
          <p className={`${bpBodyClass} text-bp-text/70`}>
            Looking for a partnership or organisational sponsorship?{" "}
            <Link
              href="/contact#contact-form"
              className="font-bold text-bp-accent underline-offset-2 hover:underline"
            >
              Send an enquiry
            </Link>
            .
          </p>
        </div>
      </TextureSection>
    </>
  );
}
