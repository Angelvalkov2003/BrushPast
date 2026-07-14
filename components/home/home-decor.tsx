import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import {
  TEXTURE_IMAGES,
  type TextureVariant,
} from "components/shared/texture-section";
import { PANEL_OVERLAY_CLASS } from "components/shared/panel-overlay";
import {
  bpEmphasisUtility,
  bpSubtitleClass,
  bpSubtitleUtility,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
  homeHandClass,
} from "./home-typography";

export { PANEL_OVERLAY_CLASS };

export function BrushUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block pb-1.5">
      {children}
      <svg
        className="pointer-events-none absolute bottom-0 left-[-3%] w-[106%] text-bp-accent"
        viewBox="0 0 120 10"
        preserveAspectRatio="none"
        aria-hidden
        style={{ height: "0.42rem" }}
      >
        <path
          d="M0 6.5 C10 3, 22 8, 34 5 S56 2.5, 68 6.5 S90 9, 102 4.5 S114 2, 120 5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.92"
        />
        <path
          d="M4 8.5 C16 6, 30 9.5, 44 7 S72 5, 88 8 S104 9.5, 116 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.65"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>
    </span>
  );
}

export function HomeSectionTitle({
  eyebrow,
  title,
  align = "center",
  className,
  size = "default",
  eyebrowVariant = "default",
}: {
  eyebrow?: string;
  title: string;
  align?: "center" | "left";
  className?: string;
  size?: "default" | "lg";
  /** Workshop pages — Caveat + brush underline */
  eyebrowVariant?: "default" | "workshop";
}) {
  const titleSize =
    size === "lg"
      ? "text-[clamp(2.25rem,5.5vw,3.5rem)]"
      : "text-[clamp(2rem,5vw,3.25rem)]";

  return (
    <div
      className={clsx(
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        eyebrowVariant === "workshop" ? (
          <p
            className={`${homeHandClass} ${bpWhisperUtility} text-[clamp(1.35rem,3vw,1.85rem)] font-bold leading-snug text-bp-accent`}
          >
            <BrushUnderline>{eyebrow}</BrushUnderline>
          </p>
        ) : (
          <p
            className={`${bpSubtitleClass} ${bpSubtitleUtility} ${bpEmphasisUtility} text-bp-accent`}
          >
            {eyebrow}
          </p>
        )
      ) : null}
      <h2
        className={`${bpTitleClass} ${bpTitleUtility} mt-1 ${titleSize} font-bold leading-[1.05] text-bp-text`}
      >
        {title}
      </h2>
    </div>
  );
}

const TILTS = [-1.25, 0.85, -0.65, 1.1] as const;

export function PolaroidFrame({
  children,
  className,
  index = 0,
  tilt = true,
  cardboardBacking = false,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  tilt?: boolean;
  /** Secondary cardboard strip along the bottom edge (story cards). */
  cardboardBacking?: boolean;
}) {
  const tiltDeg = TILTS[index % TILTS.length] ?? 0;
  const tiltStyle = tilt ? { transform: `rotate(${tiltDeg}deg)` } : undefined;

  if (!cardboardBacking) {
    return (
      <div
        className={clsx(
          "relative bg-[#faf6f0] p-2.5 pb-9 shadow-[4px_5px_0_rgba(1,2,0,0.14)] border border-bp-text/10 transition-transform duration-500 hover:rotate-0",
          className,
        )}
        style={tiltStyle}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "relative flex flex-col overflow-hidden border border-bp-text/10 shadow-[4px_5px_0_rgba(1,2,0,0.14)] transition-transform duration-500 hover:rotate-0",
        className,
      )}
      style={tiltStyle}
    >
      <div className="relative flex flex-1 flex-col overflow-hidden p-2.5">
        <Image
          src={TEXTURE_IMAGES.secondary}
          alt=""
          fill
          className="object-cover"
          sizes="400px"
        />
        <div
          className={clsx("absolute inset-0", PANEL_OVERLAY_CLASS.story)}
          aria-hidden
        />
        <div className="relative z-10 flex flex-1 flex-col">{children}</div>
      </div>
      <div
        className="relative h-7 shrink-0 overflow-hidden border-t border-bp-text/8"
        aria-hidden
      >
        <Image
          src={TEXTURE_IMAGES.secondary}
          alt=""
          fill
          className="object-cover"
          sizes="400px"
        />
        <div className={clsx("absolute inset-0", PANEL_OVERLAY_CLASS.cream)} />
      </div>
    </div>
  );
}

export function IndexCard({
  children,
  className,
  id,
  panelTexture,
  panelTone = "cream",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /**
   * Cardboard behind the panel. Omit for secondary + cream wash.
   * Pass `null` for a flat panel (accent/dark cards).
   */
  panelTexture?: TextureVariant | null;
  /** Overlay on textured panels — cream keeps cardboard visible under a light wash */
  panelTone?: keyof typeof PANEL_OVERLAY_CLASS;
}) {
  const resolvedTexture =
    panelTexture === null ? null : (panelTexture ?? "secondary");

  return (
    <div
      id={id}
      className={clsx(
        "relative overflow-hidden border border-bp-text/12 p-6 shadow-[2px_3px_0_rgba(1,2,0,0.06)] md:p-8",
        resolvedTexture === null && "bg-[#faf7f2]",
        className,
      )}
    >
      {resolvedTexture ? (
        <>
          <Image
            src={TEXTURE_IMAGES[resolvedTexture]}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 480px"
          />
          <div
            className={clsx("absolute inset-0", PANEL_OVERLAY_CLASS[panelTone])}
            aria-hidden
          />
        </>
      ) : null}
      <div className={resolvedTexture ? "relative z-10" : undefined}>
        {children}
      </div>
    </div>
  );
}

export function HomeCta({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        `${bpTitleClass} ${bpTitleUtility} inline-flex items-center gap-2 px-7 py-3 text-lg font-bold transition-all`,
        variant === "primary"
          ? "bg-bp-accent text-bp-canvas shadow-[3px_3px_0_rgba(1,2,0,0.2)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
          : "border-2 border-bp-text bg-bp-canvas/80 text-bp-text shadow-[3px_3px_0_rgba(1,2,0,0.08)] hover:bg-bp-text hover:text-bp-canvas hover:shadow-none",
        className,
      )}
    >
      {children}
    </Link>
  );
}
