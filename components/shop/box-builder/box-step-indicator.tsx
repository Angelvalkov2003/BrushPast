"use client";

import clsx from "clsx";
import {
  BOX_BUILDER_STEPS,
  type BoxBuilderStep,
} from "lib/shop-box-config";
import {
  bpBodySmClass,
  bpTitleClass,
  bpTitleUtility,
} from "components/home/home-typography";

const STEPS: { id: BoxBuilderStep | "checkout"; label: string }[] = [
  ...BOX_BUILDER_STEPS,
  { id: "checkout", label: "Checkout" },
];

export function BoxStepIndicator({
  current,
  complete,
  messageOk,
  onStepSelect,
}: {
  current: BoxBuilderStep;
  complete: boolean;
  messageOk: boolean;
  onStepSelect: (step: BoxBuilderStep) => void;
}) {
  const currentIndex = STEPS.findIndex((step) => step.id === current);

  return (
    <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
      {STEPS.map((step, index) => {
        const active = step.id === current;
        const done = index < currentIndex;
        const reachable =
          step.id === "choose" ||
          (step.id === "review" && complete) ||
          (step.id === "message" && complete) ||
          (step.id === "checkout" && complete && messageOk);
        const clickable =
          step.id !== "checkout" && reachable && !active;

        return (
          <li key={step.id}>
            <button
              type="button"
              disabled={!clickable}
              onClick={() => {
                if (step.id !== "checkout") onStepSelect(step.id);
              }}
              className={clsx(
                "flex w-full min-w-0 items-center gap-2 border px-2 py-2.5 text-left transition-colors sm:gap-3 sm:px-3 sm:py-3",
                active
                  ? "border-bp-accent bg-bp-accent/10"
                  : done
                    ? "border-bp-text/20 bg-bp-canvas/70"
                    : "border-bp-text/10 bg-bp-canvas/40",
                clickable && "hover:border-bp-accent/50",
                !clickable && "cursor-default",
              )}
            >
              <span
                className={clsx(
                  `${bpTitleClass} ${bpTitleUtility} flex h-8 w-8 shrink-0 items-center justify-center text-sm font-bold`,
                  active
                    ? "bg-bp-accent text-bp-canvas"
                    : done
                      ? "bg-bp-text text-bp-canvas"
                      : "border border-bp-text/20 text-bp-text/40",
                )}
              >
                {index + 1}
              </span>
              <span
                className={clsx(
                  "min-w-0 leading-tight break-words",
                  active
                    ? `${bpTitleClass} ${bpTitleUtility} text-[11px] font-bold uppercase tracking-[0.08em] text-bp-text sm:text-sm sm:tracking-[0.1em]`
                    : `${bpBodySmClass} text-[11px] uppercase tracking-[0.08em] sm:text-sm sm:tracking-[0.1em] ${done ? "text-bp-text/70" : "text-bp-text/40"}`,
                )}
              >
                {step.label}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
