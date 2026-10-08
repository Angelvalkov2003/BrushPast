import type { TextureVariant } from "components/shared/texture-section";
import { PageLoadingScreen } from "./page-loading-screen";

/**
 * Route `loading.tsx` fallback — same cardboard + beige + pulsing logo as nav overlay.
 */
export function PageLoadingGate({
  texture = "primary",
}: {
  texture?: TextureVariant;
}) {
  return <PageLoadingScreen texture={texture} fixed={false} />;
}
