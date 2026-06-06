import {
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  GiftIcon,
  HeartIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { HOME_HOW_IT_WORKS } from "lib/home-config";

const ICONS = {
  chat: ChatBubbleLeftRightIcon,
  pencil: PencilSquareIcon,
  heart: HeartIcon,
  gift: GiftIcon,
};

export function HomeHowItWorks() {
  return (
    <section className="border-b border-bp-text/10 bg-bp-surface px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-bp-text md:text-3xl">
          How it works
        </h2>
        <ol className="mt-12 flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-4">
          {HOME_HOW_IT_WORKS.map((step, i) => {
            const Icon = ICONS[step.icon];
            return (
              <li key={step.title} className="flex flex-1 flex-col items-center text-center md:max-w-[200px]">
                <div className="flex w-full items-center justify-center gap-2 md:flex-col">
                  {i > 0 ? (
                    <ArrowRightIcon className="mb-4 hidden h-5 w-5 shrink-0 text-bp-text/30 md:block md:rotate-0" />
                  ) : null}
                  <Icon className="h-10 w-10 text-bp-text/70" strokeWidth={1.25} />
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] leading-snug text-bp-text">
                  {step.title}
                </p>
                {i < HOME_HOW_IT_WORKS.length - 1 ? (
                  <ArrowRightIcon className="mt-4 h-5 w-5 text-bp-text/30 md:hidden" />
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
