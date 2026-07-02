import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { PANEL_OVERLAY_CLASS, PolaroidFrame } from "components/home/home-decor";
import { homeHandClass } from "components/home/home-typography";
import { TEXTURE_IMAGES, type TextureVariant } from "components/shared/texture-section";
import { displayImageUrl } from "lib/image-url";
import { workshopHref, workshopListDescription } from "lib/workshop-display";
import type { PublicWorkshop } from "lib/supabase/workshops";

const archiveBodyHandClass = `${homeHandClass} text-lg leading-snug text-bp-text/85 md:text-xl md:leading-relaxed`;

export function WorkshopArchiveCard({
  workshop,
  index = 0,
  panelTexture,
}: {
  workshop: PublicWorkshop;
  index?: number;
  panelTexture?: TextureVariant;
}) {
  const href = workshopHref(workshop);
  if (!href) return null;

  const image = displayImageUrl(workshop.image_url) ?? "/workshops.png";
  const description = workshopListDescription(workshop);

  return (
    <Link
      href={href}
      className={clsx(
        "group relative grid gap-8 overflow-hidden border border-bp-text/10 p-5 transition-colors hover:border-bp-accent/40 md:grid-cols-[1fr_1.4fr] md:items-center md:p-8",
        !panelTexture && "bg-bp-canvas/60",
      )}
    >
      {panelTexture ? (
        <>
          <Image
            src={TEXTURE_IMAGES[panelTexture]}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
          />
          <div className={clsx("absolute inset-0", PANEL_OVERLAY_CLASS.cream)} aria-hidden />
        </>
      ) : null}
      <PolaroidFrame
        index={index}
        className={clsx("h-fit", panelTexture && "relative z-10")}
        tilt={index % 2 === 0}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-bp-surface">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </PolaroidFrame>
      <div className={panelTexture ? "relative z-10" : undefined}>
        {workshop.location_label ? (
          <p className={`${homeHandClass} text-lg text-bp-accent md:text-xl`}>
            {workshop.location_label}
          </p>
        ) : null}
        <h3
          className={`${homeHandClass} mt-2 text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight text-bp-text`}
        >
          {workshop.title}
        </h3>
        {description ? (
          <p className={`${archiveBodyHandClass} mt-4`}>{description}</p>
        ) : null}
        <p
          className={`${homeHandClass} mt-6 text-xl text-bp-text transition-colors group-hover:text-bp-accent`}
        >
          View workshop →
        </p>
      </div>
    </Link>
  );
}
