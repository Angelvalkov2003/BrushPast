import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  bpBodySmClass,
  bpLinkUtility,
  bpWhisperUtility,
} from "components/home/home-typography";
import { HomeLink } from "components/layout/home-link";
import {
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  INSTAGRAM_URL,
  LEGAL_ENTITY,
  PUBLIC_CONTACT_EMAIL,
  SITE_NAME,
  SITE_TAGLINE,
} from "lib/site-config";

const aboutLinks = [
  { title: "About", href: "/about" },
  { title: "Code of Conduct", href: "/code-of-conduct" },
  { title: "Modern Slavery", href: "/modern-slavery" },
  { title: "Whistleblowing", href: "/whistleblowing" },
];

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Stories", href: "/stories" },
  { title: "Shop", href: "/shop" },
  { title: "Workshops", href: "/workshops" },
  { title: "Journal", href: "/journal" },
  { title: "Contact", href: "/contact" },
];

const infoLinks = [
  { title: "Cookies", href: "/cookies" },
  { title: "Privacy", href: "/privacy" },
  { title: "Returns & Refunds", href: "/returns" },
];

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3
        className={`${bpWhisperUtility} mb-3 text-xs font-semibold uppercase tracking-wider text-bp-canvas`}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function FooterLinkList({
  links,
}: {
  links: { title: string; href: string }[];
}) {
  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          {link.href === "/" ? (
            <HomeLink
              className={`${bpBodySmClass} ${bpLinkUtility} text-bp-canvas/75 transition-colors hover:text-bp-accent`}
            >
              {link.title}
            </HomeLink>
          ) : (
            <Link
              href={link.href}
              className={`${bpBodySmClass} ${bpLinkUtility} text-bp-canvas/75 transition-colors hover:text-bp-accent`}
            >
              {link.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bp-dark border-t border-bp-canvas/10 text-bp-canvas/90">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-4 min-[1320px]:px-0">
        <div className="lg:col-span-1">
          <HomeLink className="mb-4 inline-block">
            <Image
              src="/logosmall.png"
              alt={`${SITE_NAME} logo`}
              width={160}
              height={48}
              className="h-10 w-auto max-w-[160px] object-contain object-left md:h-11"
              sizes="160px"
            />
          </HomeLink>
          <p className={`${bpBodySmClass} text-bp-canvas/70`}>{SITE_TAGLINE}</p>
          <p className={`${bpBodySmClass} mt-4 text-bp-canvas/50`}>
            {LEGAL_ENTITY}
          </p>
        </div>

        <FooterColumn title="Explore">
          <FooterLinkList links={navLinks} />
        </FooterColumn>

        <FooterColumn title="About">
          <FooterLinkList links={aboutLinks} />
        </FooterColumn>

        <FooterColumn title="Connect">
          <ul className={`${bpBodySmClass} space-y-2`}>
            <li>
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className={`${bpLinkUtility} transition-colors hover:text-bp-accent`}
              >
                {CONTACT_PHONE}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${PUBLIC_CONTACT_EMAIL}`}
                className={`${bpLinkUtility} transition-colors hover:text-bp-accent`}
              >
                {PUBLIC_CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <Link
                href="/contact"
                className={`${bpLinkUtility} hover:text-white`}
              >
                Message us
              </Link>
            </li>
            <li className="pt-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${bpLinkUtility} transition-colors hover:text-bp-accent`}
              >
                Instagram
              </a>
            </li>
          </ul>
        </FooterColumn>
      </div>

      <div className="border-t border-bp-canvas/10">
        <div
          className={`${bpBodySmClass} mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-bp-canvas/50 md:flex-row min-[1320px]:px-0`}
        >
          <p>
            &copy; {year} {SITE_NAME}. Community Interest Company (UK). All
            rights reserved. Prices in GBP.
          </p>
          <ul className="flex flex-wrap justify-center gap-4">
            {infoLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${bpLinkUtility} transition-colors hover:text-bp-accent`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
