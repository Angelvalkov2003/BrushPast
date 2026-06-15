import {
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
    <section className="border-b border-bp-text/10 bg-bp-canvas px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-bp-accent">
          Our model
        </p>
        <h2 className="mt-3 text-center text-2xl font-bold uppercase tracking-wide text-bp-text md:text-3xl">
          How it works
        </h2>

        <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {HOME_HOW_IT_WORKS.map((step, i) => {
            const Icon = ICONS[step.icon];
            const stepNum = String(i + 1).padStart(2, "0");

            return (
              <li
                key={step.title}
                className="flex h-full flex-col border border-bp-text/10 bg-bp-surface p-6 text-center md:p-8"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-bp-accent">
                  Step {stepNum}
                </span>

                <div className="mx-auto mt-5 flex h-14 w-14 items-center justify-center border border-bp-text/15 bg-bp-canvas">
                  <Icon className="h-6 w-6 text-bp-text" strokeWidth={1.5} />
                </div>

                <p className="mx-auto mt-6 flex min-h-[4.5rem] max-w-[14rem] flex-1 items-center justify-center text-xs font-bold uppercase leading-snug tracking-[0.12em] text-bp-text sm:text-sm">
                  {step.title}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
