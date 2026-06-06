"use client";

import { useState, useEffect } from "react";
import { XMarkIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import { SITE_NAME } from "lib/site-config";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_CONSENT_KEY = "cookie_consent";
const COOKIE_PREFERENCES_KEY = "cookie_preferences";

const btnSecondary =
  "border border-bp-text/20 bg-bp-canvas px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-bp-text transition-colors hover:border-bp-accent hover:text-bp-accent";

const btnPrimary =
  "bg-bp-accent px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-bp-canvas transition-opacity hover:opacity-90";

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label
      className={clsx(
        "relative inline-flex shrink-0 cursor-pointer items-center",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="peer sr-only"
      />
      <span
        className={clsx(
          "relative inline-block h-6 w-11 rounded-full bg-bp-text/15 transition-colors",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-bp-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bp-canvas",
          "peer-checked:bg-bp-accent",
          "after:absolute after:left-0.5 after:top-0.5 after:block after:h-5 after:w-5 after:rounded-full after:bg-bp-canvas after:shadow-sm after:transition-transform after:content-['']",
          "peer-checked:after:translate-x-5",
        )}
      />
    </label>
  );
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSettingsButton, setShowSettingsButton] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

    if (consent === "accepted") {
      if (savedPreferences) {
        try {
          const parsed = JSON.parse(savedPreferences);
          setPreferences(parsed);
          initializeAnalytics(parsed.analytics);
        } catch (e) {
          console.error("Error parsing cookie preferences:", e);
        }
      }
      setShowSettingsButton(true);
      return;
    }

    const timer = setTimeout(() => setShowBanner(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const initializeAnalytics = (enabled: boolean) => {
    if (!enabled || typeof window === "undefined") return;

    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId || gaId.trim() === "" || gaId.toLowerCase() === "none") return;

    if (window.dataLayer && typeof window.gtag === "function") return;

    window.dataLayer = window.dataLayer || [];
    const gtagFunction = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
    (gtagFunction as { l?: number; q?: unknown[] }).l = +new Date();
    (gtagFunction as { l?: number; q?: unknown[] }).q = [];
    window.gtag = gtagFunction as typeof window.gtag;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.gtag("js", new Date());
    window.gtag("config", gaId, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  };

  const acceptAll = () => {
    savePreferences({ necessary: true, analytics: true, marketing: true });
    setShowBanner(false);
    setShowSettingsButton(true);
  };

  const rejectAll = () => {
    savePreferences({ necessary: true, analytics: false, marketing: false });
    setShowBanner(false);
    setShowSettingsButton(true);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
    setShowBanner(false);
    setShowSettings(false);
    setShowSettingsButton(true);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    initializeAnalytics(prefs.analytics);
  };

  const openSettings = () => {
    setShowSettings(true);
    setShowBanner(false);
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === "necessary") return;
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  if (!showBanner && !showSettings) {
    if (showSettingsButton) {
      return (
        <button
          type="button"
          onClick={openSettings}
          className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center border border-bp-text/15 bg-bp-text text-bp-canvas shadow-lg transition-opacity hover:opacity-90"
          aria-label="Cookie settings"
          title="Cookie settings"
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </button>
      );
    }
    return null;
  }

  return (
    <>
      {showBanner && !showSettings ? (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-bp-text/10 bg-bp-canvas/98 shadow-[0_-8px_30px_rgba(1,2,0,0.08)] backdrop-blur-sm"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-bp-accent">
                  {SITE_NAME} · UK
                </p>
                <h3 className="mt-1 text-lg font-bold text-bp-text">We use cookies</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bp-text/75">
                  We use cookies to run our shop, remember your bag, and — only if you agree —
                  understand how people use our site. This helps us improve {SITE_NAME} for
                  supporters across the UK.{" "}
                  <Link href="/privacy" className="font-semibold text-bp-accent underline hover:opacity-80">
                    Privacy Policy
                  </Link>
                  {" · "}
                  <Link href="/cookies" className="font-semibold text-bp-accent underline hover:opacity-80">
                    Cookies Policy
                  </Link>
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:shrink-0 sm:flex-nowrap">
                <button type="button" onClick={openSettings} className={btnSecondary}>
                  Settings
                </button>
                <button type="button" onClick={rejectAll} className={btnSecondary}>
                  Reject non-essential
                </button>
                <button type="button" onClick={acceptAll} className={btnPrimary}>
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showSettings ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
          <button
            type="button"
            className="absolute inset-0 bg-bp-text/40"
            aria-label="Close cookie settings"
            onClick={() => {
              setShowSettings(false);
              if (!localStorage.getItem(COOKIE_CONSENT_KEY)) setShowBanner(true);
            }}
          />
          <div
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-bp-text/10 bg-bp-canvas shadow-xl sm:rounded-lg"
            role="dialog"
            aria-labelledby="cookie-settings-title"
          >
            <div className="border-b border-bp-text/10 px-6 py-5 sm:px-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-bp-accent">
                    Your choices · UK GDPR & PECR
                  </p>
                  <h2 id="cookie-settings-title" className="mt-1 text-2xl font-bold text-bp-text">
                    Cookie settings
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowSettings(false);
                    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) setShowBanner(true);
                  }}
                  className="flex h-10 w-10 items-center justify-center border border-bp-text/15 text-bp-text hover:border-bp-accent"
                  aria-label="Close"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-bp-text/70">
                Necessary cookies keep the site and checkout working. Analytics and marketing
                cookies are optional — switch them on only if you are happy for us to use them.
              </p>
            </div>

            <div className="space-y-4 px-6 py-6 sm:px-8">
              <div className="border border-bp-text/10 bg-bp-surface/50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-bp-text">Strictly necessary</h3>
                    <p className="mt-1 text-sm text-bp-text/65">
                      Required for security, your shopping bag, checkout, and remembering your
                      cookie choices. Always on.
                    </p>
                  </div>
                  <Toggle checked disabled />
                </div>
              </div>

              <div className="border border-bp-text/10 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-bp-text">Analytics</h3>
                    <p className="mt-1 text-sm text-bp-text/65">
                      Anonymous usage data (e.g. Google Analytics when enabled) to improve our
                      website. Only loaded if you allow it.
                    </p>
                  </div>
                  <Toggle
                    checked={preferences.analytics}
                    onChange={(v) => updatePreference("analytics", v)}
                  />
                </div>
              </div>

              <div className="border border-bp-text/10 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-bp-text">Marketing</h3>
                    <p className="mt-1 text-sm text-bp-text/65">
                      Used to show more relevant content or measure campaigns. We use these
                      sparingly and only with your consent.
                    </p>
                  </div>
                  <Toggle
                    checked={preferences.marketing}
                    onChange={(v) => updatePreference("marketing", v)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-bp-text/10 px-6 py-5 sm:px-8">
              <button type="button" onClick={saveCustomPreferences} className={btnPrimary}>
                Save preferences
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSettings(false);
                  if (!localStorage.getItem(COOKIE_CONSENT_KEY)) setShowBanner(true);
                }}
                className={btnSecondary}
              >
                Cancel
              </button>
              <Link href="/cookies" className={clsx(btnSecondary, "inline-flex items-center")}>
                Read Cookies Policy
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

declare global {
  interface Window {
    gtag: {
      (...args: unknown[]): void;
      l?: number;
      q?: unknown[];
    };
    dataLayer: unknown[];
  }
}
