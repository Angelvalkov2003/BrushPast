import Link from "next/link";
import { UserGroupIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export function StoriesCta() {
  return (
    <section className="border-t border-bp-text/10 bg-bp-surface px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-12">
        <div className="flex items-start gap-4">
          <UserGroupIcon className="h-10 w-10 shrink-0 text-bp-text/70" strokeWidth={1.2} />
          <p className="max-w-xs text-sm leading-relaxed text-bp-text/80 md:text-base">
            Every story shared creates connection and opportunity.
          </p>
        </div>

        <Link
          href="/share-your-story"
          className="inline-flex justify-center border-2 border-bp-text px-10 py-3 text-sm font-bold uppercase tracking-[0.2em] text-bp-text transition-colors hover:bg-bp-text hover:text-bp-canvas"
        >
          Share your story
        </Link>

        <Link
          href="/share-your-story"
          className="group flex items-center justify-end gap-3 text-right text-sm text-bp-text/80 hover:text-bp-accent md:text-base"
        >
          <span className="max-w-xs">
            Are you a creative with a story to share? We&apos;d love to hear from you.
          </span>
          <ArrowRightIcon className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
