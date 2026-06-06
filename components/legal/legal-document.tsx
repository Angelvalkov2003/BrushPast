import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { LegalPageContent } from "lib/legal/types";
import {
  LEGAL_ENTITY,
  PUBLIC_CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_NAME,
  SITE_URL,
} from "lib/site-config";

type Props = {
  page: LegalPageContent;
  backHref?: string;
  backLabel?: string;
};

const legalLinkClass = "font-semibold text-bp-accent underline underline-offset-2 hover:opacity-80";

export function LegalDocument({
  page,
  backHref = "/",
  backLabel = "Back to home",
}: Props) {
  const siteHost = SITE_URL.replace(/^https?:\/\//, "");

  return (
    <div className="bp-surface min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href={backHref}
          className="mb-8 inline-flex items-center text-xs font-bold uppercase tracking-[0.14em] text-bp-text/60 transition-colors hover:text-bp-accent"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          {backLabel}
        </Link>

        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-bp-accent">
          {SITE_NAME} · United Kingdom
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-bp-text md:text-4xl">
          {page.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-bp-text/65">{page.description}</p>

        <div className="mt-6 border border-bp-text/10 bg-bp-canvas px-5 py-4 text-sm text-bp-text/70">
          <p>
            <span className="font-semibold text-bp-text">{LEGAL_ENTITY}</span>
            <br />
            Website:{" "}
            <a href={SITE_URL} className={legalLinkClass}>
              {siteHost}
            </a>
            <br />
            Last updated: <span className="text-bp-text">{page.lastUpdated}</span>
            <br />
            Contact:{" "}
            <a href={`mailto:${PUBLIC_CONTACT_EMAIL}`} className={legalLinkClass}>
              {PUBLIC_CONTACT_EMAIL}
            </a>
            {" · "}
            <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className={legalLinkClass}>
              {CONTACT_PHONE}
            </a>
          </p>
        </div>

        <div className="mt-8 space-y-10 border border-bp-text/10 bg-bp-canvas p-6 shadow-sm sm:p-8">
          {page.sections.map((section) => (
            <section key={section.title} id={section.id}>
              <h2 className="mb-3 text-lg font-bold uppercase tracking-wide text-bp-text">
                {section.title}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mb-3 leading-relaxed text-bp-text/80">
                  {p}
                </p>
              ))}
              {section.list ? (
                <ul className="ml-5 list-disc space-y-2 text-bp-text/80">
                  {section.list.map((item) => (
                    <li key={item.slice(0, 40)}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <nav
          className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-bp-text/10 pt-6 text-xs font-bold uppercase tracking-[0.12em] text-bp-text/55"
          aria-label="Related policies"
        >
          <Link href="/privacy" className="hover:text-bp-accent">
            Privacy
          </Link>
          <span aria-hidden>·</span>
          <Link href="/cookies" className="hover:text-bp-accent">
            Cookies
          </Link>
          <span aria-hidden>·</span>
          <Link href="/returns" className="hover:text-bp-accent">
            Returns
          </Link>
          <span aria-hidden>·</span>
          <Link href="/contact" className="hover:text-bp-accent">
            Contact
          </Link>
        </nav>

        <p className="mt-6 text-center text-xs leading-relaxed text-bp-text/45">
          These policies apply to visitors and customers in the United Kingdom. Where UK GDPR and
          the Privacy and Electronic Communications Regulations (PECR) apply, we follow them.
        </p>
      </div>
    </div>
  );
}
