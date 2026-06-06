import Image from "next/image";
import clsx from "clsx";
import { SITE_NAME } from "lib/site-config";

export const LOGO_PATH = "/logo.avif";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
};

const sizeMap = {
  sm: { width: 100, height: 36, className: "h-8 w-auto max-w-[100px]" },
  md: { width: 140, height: 48, className: "h-10 w-auto max-w-[140px]" },
  lg: { width: 220, height: 80, className: "h-[72px] w-auto max-w-[220px]" },
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
