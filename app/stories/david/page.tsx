import { DavidPage } from "components/stories/david/david-page";
import { DAVID_STORY } from "lib/stories/david-content";

export const metadata = {
  title: `${DAVID_STORY.title} - ${DAVID_STORY.subtitle}`,
  description: DAVID_STORY.closingQuote,
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <DavidPage />;
}
