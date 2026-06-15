"use client";

import { useState } from "react";
import { toast } from "sonner";
import clsx from "clsx";
import { PrivacyPolicyCheckbox } from "components/legal/privacy-policy-checkbox";
import type { NewsletterSource } from "lib/newsletter-config";

type Variant = "dark" | "light";

type Props = {
  source: NewsletterSource;
  buttonLabel?: string;
  variant?: Variant;
  className?: string;
};

const inputClass: Record<Variant, string> = {
  dark: "w-full border border-bp-canvas/30 bg-bp-canvas/10 px-4 py-3 text-sm text-bp-canvas placeholder:text-bp-canvas/50 focus:border-bp-accent focus:outline-none",
  light:
    "w-full border border-bp-text/15 bg-bp-canvas px-4 py-3 text-sm text-bp-text placeholder:text-bp-text/40 focus:border-bp-accent focus:outline-none",
};

export function NewsletterSignupForm({
  source,
  buttonLabel = "Join us",
  variant = "dark",
  className,
}: Props) {
  const [email, setEmail] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || loading) return;

    if (!privacyAccepted) {
      toast.error("Please accept the Privacy Policy to continue.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          source,
          privacy_policy_accepted: true,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Could not subscribe");
        return;
      }

      toast.success(
        data.alreadySubscribed
          ? "You're already on the list — thank you."
          : "Thanks — you're on the list.",
      );
      setEmail("");
      setPrivacyAccepted(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className={clsx("max-w-md space-y-3", className)}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          disabled={loading}
          className={inputClass[variant]}
          autoComplete="email"
        />
        <button
          type="submit"
          disabled={loading || !privacyAccepted}
          className="shrink-0 bg-bp-accent px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-bp-canvas hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:self-start"
        >
          {loading ? "Joining…" : buttonLabel}
        </button>
      </div>
      <PrivacyPolicyCheckbox
        checked={privacyAccepted}
        onChange={setPrivacyAccepted}
        variant={variant}
        id={`newsletter-privacy-${source}`}
      />
    </form>
  );
}
