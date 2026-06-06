import BrandLogo from "components/brand-logo";

export default function LogoSquare({
  size,
  priority,
}: {
  size?: "sm" | undefined;
  priority?: boolean;
}) {
  return (
    <BrandLogo
      size={size === "sm" ? "sm" : "md"}
      priority={priority ?? size === "sm"}
    />
  );
}
