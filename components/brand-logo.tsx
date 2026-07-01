import Image from "next/image";
import clsx from "clsx";
import { SITE_NAME } from "lib/site-config";

export const LOGO_PATH = "/logo.avif";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
  priority?: boolean;
};

const sizeMap = {
  sm: { width: 100, height: 36, className: "h-8 w-auto max-w-[100px]" },
  md: { width: 185, height: 56, className: "h-14 w-auto max-w-[185px]" },
  lg: { width: 220, height: 80, className: "h-[72px] w-auto max-w-[220px]" },
  hero: { width: 420, height: 150, className: "h-32 w-auto max-w-[min(85vw,420px)] md:h-44" },
} as const;

export default function BrandLogo({
  size = "md",
  className,
  priority = false,
}: BrandLogoProps) {
  const dims = sizeMap[size];

  return (
    <Image
      src={LOGO_PATH}
      alt={`${SITE_NAME} logo`}
      width={dims.width}
      height={dims.height}
      className={clsx(dims.className, "object-contain object-left", className)}
      priority={priority}
    />
  );
}
