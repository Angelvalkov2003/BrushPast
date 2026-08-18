"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import {
  HeartIcon,
  LockClosedIcon,
  PencilSquareIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { BrushPastIconBadge } from "components/icons/brush-past-icons";
import { HomeSectionTitle, IndexCard } from "components/home/home-decor";
import {
  bpBodyClass,
  bpBodySmClass,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
  homeHandClass,
} from "components/home/home-typography";
import { PrivacyPolicyCheckbox } from "components/legal/privacy-policy-checkbox";
import { Modal } from "components/ui/modal";
import {
  SPONSOR_CUSTOM_CARD,
  SPONSOR_TIERS,
  formatSponsorAmount,
  parseSponsorAmount,
  resolveSponsorTier,
  sponsorTierLabel,
  validateSponsorAmount,
  type SponsorTier,
} from "lib/sponsor-config";

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

const ICONS = {
  heart: HeartIcon,
  spray: SprayCanIcon,
  people: UserGroupIcon,
  star: SparklesIcon,
} as const;

const inputClass = `mt-1.5 w-full border border-bp-text/20 bg-bp-canvas/50 px-3 py-2.5 ${bpBodySmClass} focus:border-bp-accent focus:outline-none focus:ring-1 focus:ring-bp-accent/30`;

type Pledge = {
  amountGbp: number;
  title: string;
  description: string;
};

export function SponsorImpact() {
  const customInputRef = useRef<HTMLInputElement>(null);
  const [customRaw, setCustomRaw] = useState("");
  const [customHint, setCustomHint] = useState<string | null>(null);
  const [pledge, setPledge] = useState<Pledge | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const customAmount = parseSponsorAmount(customRaw);
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
    openPledge({
      amountGbp: tier.amountGbp,
      title: tier.name,
      description: tier.description,
    });
  };

  const pickCustom = () => {
    if (customAmount == null) {
      setCustomHint("Write your amount in the card first.");
      customInputRef.current?.focus();
      return;
    }
    const valid = validateSponsorAmount(customAmount);
    if (!valid.ok) {
      setCustomHint(valid.error);
      customInputRef.current?.focus();
      return;
    }
    openPledge({
      amountGbp: customAmount,
      title: sponsorTierLabel(resolveSponsorTier(customAmount)),
      description: SPONSOR_CUSTOM_CARD.description,
    });
  };

  const closeModal = () => {
    if (submitting) return;
    setPledge(null);
    setError(null);
    setCheckoutUrl(null);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!pledge) return;
    setError(null);

    const valid = validateSponsorAmount(pledge.amountGbp);
    if (!valid.ok) {
      setError(valid.error);
      return;
    }
    if (!fullName.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    if (!privacy) {
      setError("Please accept the Privacy Policy to continue.");
      return;
    }

    setSubmitting(true);
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
      const data = await response.json();
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout.");
      }
      setCheckoutUrl(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not start checkout.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="become-a-sponsor" className="scroll-mt-24">
      <HomeSectionTitle
        eyebrow="Become a sponsor"
        title="Choose your impact"
      />
      <p
        className={`${homeHandClass} ${bpWhisperUtility} mx-auto mt-4 max-w-xl text-center text-xl text-bp-text/75`}
      >
        Every amount funds workshops, artists and the next story. Pick a card
        to begin.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {SPONSOR_TIERS.map((tier) => {
          const Icon = ICONS[tier.icon];
          const selected =
            pledge?.amountGbp === tier.amountGbp &&
            pledge.title === tier.name &&
            !thanked;
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

        <IndexCard
          className={clsx(
            "flex h-full flex-col !p-5 md:!p-6",
            customRaw.trim()
              ? "!border-bp-accent/50"
              : "",
          )}
        >
          <div className="relative">
            <span
              className={`${bpTitleClass} ${bpTitleUtility} absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-bp-text/45`}
              aria-hidden
            >
              £
            </span>
            <label htmlFor="sponsor-custom-amount" className="sr-only">
              Enter your own amount
            </label>
            <input
              ref={customInputRef}
              id="sponsor-custom-amount"
              inputMode="decimal"
              value={customRaw}
              onChange={(event) => {
                setCustomRaw(event.target.value);
                setCustomHint(null);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  pickCustom();
                }
              }}
              placeholder="0"
              className={`${bpTitleClass} ${bpTitleUtility} w-full border border-bp-text/20 bg-bp-canvas/70 py-3 pl-9 pr-3 text-3xl font-bold text-bp-text placeholder:text-bp-text/25 focus:border-bp-accent focus:outline-none focus:ring-1 focus:ring-bp-accent/30`}
            />
          </div>
          <p
            className={`${bpTitleClass} ${bpTitleUtility} mt-4 text-lg font-bold uppercase tracking-[0.06em] text-bp-text`}
          >
            {SPONSOR_CUSTOM_CARD.name}
          </p>
          <p
            className={`${bpBodyClass} mt-3 flex-1 text-sm leading-relaxed text-bp-text/75`}
          >
            {SPONSOR_CUSTOM_CARD.description}
          </p>
          {customHint ? (
            <p className={`${bpBodySmClass} mt-3 text-red-700`} role="alert">
              {customHint}
            </p>
          ) : null}
          <div className="mt-5 flex items-center justify-between gap-3">
            <BrushPastIconBadge icon={PencilSquareIcon} size="sm" />
            <button
              type="button"
              onClick={pickCustom}
              className={`${bpBodyClass} font-bold text-bp-accent underline-offset-4 hover:underline`}
            >
              Continue →
            </button>
          </div>
        </IndexCard>
      </div>

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
            <p className={`${bpBodySmClass} mt-1 uppercase tracking-[0.14em] text-bp-text/50`}>
              {pledge.title}
            </p>
            <a
              href={checkoutUrl ?? "#"}
              className={`${bpTitleClass} ${bpTitleUtility} mt-8 inline-flex bg-bp-accent px-7 py-3 text-lg font-bold uppercase tracking-[0.08em] text-bp-canvas shadow-[3px_3px_0_rgba(1,2,0,0.2)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none`}
            >
              Continue to secure payment →
            </a>
            <p
              className={`${bpBodySmClass} mt-4 flex items-center justify-center gap-2 text-bp-text/50`}
            >
              <LockClosedIcon className="h-4 w-4 shrink-0" aria-hidden />
              Stripe checkout. Your details stay safe.
            </p>
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
            <p
              className={`${bpBodySmClass} mt-3 flex items-center gap-2 text-bp-text/50`}
            >
              <LockClosedIcon className="h-4 w-4 shrink-0" aria-hidden />
              Next you&apos;ll complete a secure payment. Then we&apos;ll be in
              touch.
            </p>
          </form>
        ) : null}
      </Modal>
    </section>
  );
}
