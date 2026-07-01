import { CartProvider } from "components/cart/cart-context";
import { ConditionalNavbar } from "components/layout/conditional-navbar";
import { PublicBodyTheme } from "components/layout/public-body-theme";
import { AdminThemeScript } from "components/layout/admin-theme-script";
import { CookieConsent } from "components/cookie-consent";
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
  icons: {
    icon: "/logo.avif",
    apple: "/logo.avif",
  },
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
    <html lang="en-GB" className={GeistSans.variable} suppressHydrationWarning>
      <head>
        <AdminThemeScript />
      </head>
      <body
        className={`${GeistSans.className} antialiased selection:bg-bp-accent-bg selection:text-bp-text`}
        suppressHydrationWarning
      >
        <PublicBodyTheme />
        <CartProvider>
          <ConditionalNavbar />
          <main suppressHydrationWarning>
            {children}
            <Toaster closeButton theme="light" />
          </main>
          <CookieConsent />
        </CartProvider>
      </body>
    </html>
  );
}
