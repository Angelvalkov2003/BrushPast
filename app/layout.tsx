import { CartProvider } from "components/cart/cart-context";
import { ConditionalNavbar } from "components/layout/conditional-navbar";
import { PublicBodyTheme } from "components/layout/public-body-theme";
import { AdminThemeScript } from "components/layout/admin-theme-script";
import { NavigationLoading } from "components/layout/navigation-loading";
import { CookieConsent } from "components/cookie-consent";
import {
  bpFontVariables,
  bpSubtitle,
  bpSubtitleUtility,
} from "components/home/home-typography";
import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";

import { SITE_NAME } from "lib/site-config";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "UK creative platform and social enterprise - art, stories, and The Archive Shop.",
  robots: {
    follow: true,
    index: true,
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
        <link rel="icon" href="/logo.avif" type="image/avif" />
        <link rel="apple-touch-icon" href="/logo.avif" />
      </head>
      <body
        className={`bp-site ${bpSubtitle.className} ${bpSubtitleUtility} antialiased selection:bg-bp-accent-bg selection:text-bp-text`}
        suppressHydrationWarning
      >
        <PublicBodyTheme />
        <NavigationLoading>
          <CartProvider>
            <div id="bp-site-shell">
              <ConditionalNavbar />
              <main suppressHydrationWarning>
                {children}
                <Toaster closeButton theme="light" />
              </main>
            </div>
            <CookieConsent />
          </CartProvider>
        </NavigationLoading>
      </body>
    </html>
  );
}
