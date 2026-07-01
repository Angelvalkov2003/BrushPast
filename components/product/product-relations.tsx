import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { PolaroidFrame } from "components/home/home-decor";
import { homeHandClass } from "components/home/home-typography";
import type {
  ProductDetail,
  ProductOrganisationLink,
  ProductStoryLink,
  ProductWorkshopLink,
} from "lib/types";

function RelationGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className={`${homeHandClass} text-lg text-bp-accent md:text-xl`}>{label}</p>
      <div className="mt-4 flex flex-wrap items-start gap-4 sm:gap-5 md:gap-6">{children}</div>
    </div>
  );
}

function hasRelationImage(imageUrl: string | null | undefined): imageUrl is string {
  return Boolean(imageUrl?.trim());
}

function CompactRelationCard({
  href,
  external,
  imageUrl,
  imageAlt,
  title,
  subtitle,
  index,
}: {
  href: string;
  external?: boolean;
  imageUrl: string | null;
  imageAlt: string;
  title: string;
  subtitle?: string | null;
  index: number;
}) {
  const showImage = hasRelationImage(imageUrl);

  const inner = (
    <>
      {showImage ? (
        <PolaroidFrame
          index={index}
          className="w-[7.5rem] shrink-0 p-1.5 pb-5 shadow-[2px_3px_0_rgba(1,2,0,0.1)] sm:w-[8.5rem]"
          tilt={index % 2 === 0}
        >
          <div className="relative aspect-square overflow-hidden bg-bp-surface">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="136px"
            />
          </div>
        </PolaroidFrame>
      ) : null}
      <div className={clsx(showImage ? "mt-2 max-w-[8.5rem]" : "max-w-xs")}>
        <p className={`${homeHandClass} text-base font-bold leading-tight text-bp-text`}>
          {title}
        </p>
        {subtitle ? (
          <p
            className={`${homeHandClass} mt-1 line-clamp-2 text-[0.7rem] italic leading-snug text-bp-text/70`}
          >
            {subtitle}
          </p>
        ) : null}
        <p
          className={`${homeHandClass} mt-1.5 text-sm text-bp-text/80 transition-colors group-hover:text-bp-accent`}
        >
          Read more →
        </p>
      </div>
    </>
  );

  const className = "group flex shrink-0 flex-col text-left transition-opacity hover:opacity-95";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

function StoryCard({ story, index }: { story: ProductStoryLink; index: number }) {
  return (
    <CompactRelationCard
      href={story.pageUrl}
      imageUrl={story.imageUrl}
      imageAlt={story.title}
      title={story.title}
      subtitle={story.quote}
      index={index}
    />
  );
}

function WorkshopCard({ workshop, index }: { workshop: ProductWorkshopLink; index: number }) {
  return (
    <CompactRelationCard
      href={workshop.pageUrl}
      imageUrl={workshop.imageUrl}
      imageAlt={workshop.title}
      title={workshop.title}
      subtitle={workshop.locationLabel}
      index={index}
    />
  );
}

function OrganisationCard({
  organisation,
  index,
}: {
  organisation: ProductOrganisationLink;
  index: number;
}) {
  return (
    <CompactRelationCard
      href={organisation.href}
      external={organisation.external}
      imageUrl={organisation.imageUrl}
      imageAlt={organisation.name}
      title={organisation.name}
      subtitle={organisation.shortDescription}
      index={index}
    />
  );
}

export function ProductRelations({
  product,
  className,
}: {
  product: ProductDetail;
  className?: string;
}) {
  const hasStories = product.linkedStories.length > 0;
  const hasWorkshop = !!product.linkedWorkshop;
  const hasOrganisations = product.linkedOrganisations.length > 0;

  if (!hasStories && !hasWorkshop && !hasOrganisations) return null;

  const storyLabel =
    product.linkedStories.length === 1
      ? "This product is connected to this story:"
      : "This product is connected to these stories:";

  const organisationLabel =
    product.linkedOrganisations.length === 1
      ? "This product was made with support from:"
      : "This product was made with support from these organisations:";

  return (
    <section
      className={clsx(
        "mt-10 border-t border-bp-text/10 pt-10",
        "lg:mt-6 lg:border-t-0 lg:pt-0",
        className,
      )}
    >
      <div className="space-y-8 md:space-y-10">
        {hasStories ? (
          <RelationGroup label={storyLabel}>
            {product.linkedStories.map((story, index) => (
              <StoryCard key={story.slug} story={story} index={index} />
            ))}
          </RelationGroup>
        ) : null}

        {hasWorkshop && product.linkedWorkshop ? (
          <RelationGroup label="This product was created at this workshop:">
            <WorkshopCard workshop={product.linkedWorkshop} index={0} />
          </RelationGroup>
        ) : null}

        {hasOrganisations ? (
          <RelationGroup label={organisationLabel}>
            {product.linkedOrganisations.map((org, index) => (
              <OrganisationCard key={org.slug ?? org.name} organisation={org} index={index} />
            ))}
          </RelationGroup>
        ) : null}
      </div>
    </section>
  );
}
