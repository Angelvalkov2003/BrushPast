import { KarlPage } from "components/stories/karl/karl-page";
import { KARL_STORY } from "lib/stories/karl-content";

export const metadata = {
  title: `${KARL_STORY.title} — ${KARL_STORY.location}`,
  description: KARL_STORY.heroQuote,
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <KarlPage />;
}
