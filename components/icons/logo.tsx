/** @deprecated Use BrandLogo / LogoSquare - kept for imports migrating to logo.avif */
import BrandLogo from "components/brand-logo";

export default function LogoIcon({
  width,
  height,
  className,
}: {
  width?: string | number;
  height?: string | number;
  fill?: string;
  className?: string;
}) {
  return (
    <BrandLogo
      size="sm"
      className={className}
      priority={false}
    />
  );
}
