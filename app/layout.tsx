import { CartProvider } from "components/cart/cart-context";
import { PublicBodyTheme } from "components/layout/public-body-theme";
import { AdminThemeScript } from "components/layout/admin-theme-script";
import { NavigationLoading } from "components/layout/navigation-loading";
import { SiteShell } from "components/layout/site-shell";
import { CookieConsent } from "components/cookie-consent";
import {
  bpFontVariables,
  bpSubtitle,
  bpSubtitleUtility,
} from "components/home/home-typography";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";

import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "Brush Past",
    "UK social enterprise",
    "creative workshops",
    "lived experience stories",
    "The Archive Shop",
    "art",
    "photography",
    "writing",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_TAGLINE,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_TAGLINE,
  },
  robots: {
    follow: true,
    index: true,
  },
  icons: {
    icon: [{ url: "/logo.avif", type: "image/avif" }],
    apple: [{ url: "/logosmall.png" }],
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Cart is now loaded from localStorage in CartProvider
  // No need to fetch from database or pass any props

  return (
    <html
      lang="en-GB"
      className={`${GeistSans.variable} ${bpFontVariables}`}
      suppressHydrationWarning
    >
      <head>
        <AdminThemeScript />
      </head>
      <body
        className={`bp-site ${bpSubtitle.className} ${bpSubtitleUtility} antialiased selection:bg-bp-accent-bg selection:text-bp-text`}
        suppressHydrationWarning
      >
        <PublicBodyTheme />
        <NavigationLoading>
          <CartProvider>
            <SiteShell>
              {children}
              <Toaster closeButton theme="light" />
            </SiteShell>
            <CookieConsent />
          </CartProvider>
        </NavigationLoading>
      </body>
    </html>
  );
}
