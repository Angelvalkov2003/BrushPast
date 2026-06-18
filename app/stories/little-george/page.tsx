import { LittleGeorgePage } from "components/stories/little-george/little-george-page";
import { LITTLE_GEORGE_STORY } from "lib/stories/little-george-content";

export const metadata = {
  title: LITTLE_GEORGE_STORY.subtitle,
  description: LITTLE_GEORGE_STORY.closingQuote,
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <LittleGeorgePage />;
}
