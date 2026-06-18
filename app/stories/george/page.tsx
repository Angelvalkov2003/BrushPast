import { GeorgePage } from "components/stories/george/george-page";
import { GEORGE_STORY } from "lib/stories/george-content";

export const metadata = {
  title: GEORGE_STORY.subtitle,
  description: GEORGE_STORY.closingQuote,
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <GeorgePage />;
}
