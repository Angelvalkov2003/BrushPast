import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { LegalPageContent } from "lib/legal/types";
import {
  LEGAL_ENTITY,
  PUBLIC_CONTACT_EMAIL,
  SITE_NAME,
  SITE_URL,
} from "lib/site-config";

type Props = {
  page: LegalPageContent;
  backHref?: string;
  backLabel?: string;
};

export function LegalDocument({
  page,
  backHref = "/",
  backLabel = "Back to home",
}: Props) {
  return (
    <div className="bp-surface min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href={backHref}
          className="mb-6 inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          {backLabel}
        </Link>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-bp-text md:text-4xl">
          {page.title}
        </h1>
        <p className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
          {SITE_NAME} · {LEGAL_ENTITY} ·{" "}
          <a
            href={SITE_URL}
            className="underline underline-offset-2 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            {SITE_URL.replace(/^https?:\/\//, "")}
          </a>
          <br />
          Last updated: {page.lastUpdated} · Questions:{" "}
          <a
            href={`mailto:${PUBLIC_CONTACT_EMAIL}`}
            className="underline underline-offset-2"
          >
            {PUBLIC_CONTACT_EMAIL}
          </a>
        </p>

        <div className="space-y-10 rounded-lg border border-bp-text/10 bg-bp-canvas p-8 shadow-sm">
          {page.sections.map((section) => (
            <section key={section.title} id={section.id}>
              <h2 className="mb-3 text-xl font-semibold text-neutral-900 dark:text-white">
                {section.title}
              </h2>
              {section.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="mb-3 text-neutral-700 leading-relaxed dark:text-neutral-300"
                >
                  {p}
                </p>
              ))}
              {section.list ? (
                <ul className="ml-5 list-disc space-y-2 text-neutral-700 dark:text-neutral-300">
                  {section.list.map((item) => (
                    <li key={item.slice(0, 40)}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-neutral-500 dark:text-neutral-500">
          Draft for site migration from{" "}
          <a
            href="https://www.brushpast.org/"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            brushpast.org
          </a>
          . Final legal text may be approved by trustees.
        </p>
      </div>
    </div>
  );
}
