import type { ComponentType, SVGProps } from "react";
import {
  ArchiveBoxIcon,
  ArrowPathIcon,
  BanknotesIcon,
  BuildingOffice2Icon,
  CameraIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  HomeIcon,
  KeyIcon,
  PaintBrushIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  Squares2X2Icon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

export type BrushPastIcon = ComponentType<SVGProps<SVGSVGElement>>;

export const TshirtIcon = ({ className = "h-6 w-6", ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    className={className}
    aria-hidden
    {...props}
  >
    <path d="M8 4 5 6.5 3 10l3 1.5V20h12v-8.5L21 10l-2-3.5L16 4c-1 1.2-2.3 2-4 2s-3-.8-4-2Z" />
  </svg>
);

export const CoffeeCupIcon = ({ className = "h-6 w-6", ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    className={className}
    aria-hidden
    {...props}
  >
    <path d="M5 8h11v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8Z" />
    <path d="M16 10h2.5a2.5 2.5 0 0 1 0 5H16" />
    <path d="M8 4v2M12 4v2M16 4v2" />
  </svg>
);

/** Brand icon map — Brush Past Icon Direction v1 */
export const brushPastIcons = {
  homepage: {
    profitsReinvested: ArrowPathIcon,
    creatorsEarnFairly: BanknotesIcon,
    workshopsSkillsFunded: WrenchScrewdriverIcon,
    recoveryOrganisationsSupported: BuildingOffice2Icon,
    wearIt: TshirtIcon,
    drinkIt: CoffeeCupIcon,
    frameIt: PhotoIcon,
    storiesAreShared: ChatBubbleLeftRightIcon,
    storiesBecomeCollections: ArchiveBoxIcon,
    profitsCreateChange: ArrowPathIcon,
    keepAStoryClose: HeartIcon,
  },
  workshopsPage: {
    safeSpace: HomeIcon,
    beCreative: PaintBrushIcon,
    connect: UserGroupIcon,
    opportunity: SparklesIcon,
    ownership: KeyIcon,
  },
  workshopProcess: {
    create: PaintBrushIcon,
    connect: UserGroupIcon,
    capture: CameraIcon,
    share: PaperAirplaneIcon,
    opportunity: SparklesIcon,
  },
  aboutPageValues: {
    dignity: HeartIcon,
    creativity: PaintBrushIcon,
    opportunity: SparklesIcon,
    community: UserGroupIcon,
  },
  howWeCreateChange: {
    shareAStory: ChatBubbleLeftRightIcon,
    createTheWork: PaintBrushIcon,
    fundTheNextOpportunity: ArrowPathIcon,
  },
  contactPage: {
    conversations: ChatBubbleLeftRightIcon,
    workshops: PaintBrushIcon,
    exhibitions: Squares2X2Icon,
    collaboration: PuzzlePieceIcon,
    coffee: CoffeeCupIcon,
    community: UserGroupIcon,
  },
} as const satisfies Record<string, Record<string, BrushPastIcon>>;

export type HomepageIconKey = keyof typeof brushPastIcons.homepage;
export type WorkshopsPageIconKey = keyof typeof brushPastIcons.workshopsPage;
export type WorkshopProcessIconKey = keyof typeof brushPastIcons.workshopProcess;
export type AboutValuesIconKey = keyof typeof brushPastIcons.aboutPageValues;
export type HowWeCreateChangeIconKey = keyof typeof brushPastIcons.howWeCreateChange;
export type ContactSpaceIconKey = keyof typeof brushPastIcons.contactPage;

export const HOME_SHOP_ICON_BY_SLUG: Record<string, HomepageIconKey> = {
  "wear-the-story": "wearIt",
  "drink-the-story": "drinkIt",
  "frame-the-story": "frameIt",
};

type BrushPastIconBadgeProps = {
  icon: BrushPastIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
  iconClassName?: string;
};

const BADGE_SIZE = {
  sm: "h-10 w-10",
  md: "h-11 w-11",
  lg: "h-12 w-12",
} as const;

const ICON_SIZE = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const;

export function BrushPastIconBadge({
  icon: Icon,
  size = "md",
  className,
  iconClassName,
}: BrushPastIconBadgeProps) {
  return (
    <div
      className={clsx(
        "flex shrink-0 items-center justify-center rounded-full border border-dashed border-bp-accent/25 bg-bp-canvas/90 shadow-[1px_2px_0_rgba(1,2,0,0.04)]",
        BADGE_SIZE[size],
        className,
      )}
    >
      <Icon className={clsx("text-bp-accent", ICON_SIZE[size], iconClassName)} strokeWidth={1.5} />
    </div>
  );
}
