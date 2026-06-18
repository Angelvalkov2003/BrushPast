import Image from "next/image";
import Link from "next/link";
import { displayImageUrl } from "lib/image-url";
import { workshopHref } from "lib/workshop-display";
import type { PublicWorkshop } from "lib/supabase/workshops";

export function WorkshopArchiveCard({ workshop }: { workshop: PublicWorkshop }) {
  const href = workshopHref(workshop);
  if (!href) return null;

  const image = displayImageUrl(workshop.image_url) ?? "/workshops.png";

  return (
    <Link
      href={href}
      className="group grid gap-6 border border-bp-text/10 bg-bp-canvas p-5 transition-colors hover:border-bp-accent/40 md:grid-cols-[1.1fr_1.4fr] md:items-center md:p-6"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-bp-surface">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
      <div>
        {workshop.location_label ? (
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-bp-accent">
            {workshop.location_label}
          </p>
        ) : null}
        <h3 className="mt-2 text-2xl font-bold uppercase tracking-wide text-bp-text md:text-3xl">
          {workshop.title}
        </h3>
        {workshop.short_description ? (
          <p className="mt-3 text-sm leading-relaxed text-bp-text/75 md:text-base">
            {workshop.short_description}
          </p>
        ) : null}
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-bp-text transition-colors group-hover:text-bp-accent">
          View workshop →
        </p>
      </div>
    </Link>
  );
}
