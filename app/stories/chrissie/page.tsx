import { ChrissiePage } from "components/stories/chrissie/chrissie-page";
import { CHRISSIE_STORY } from "lib/stories/chrissie-content";

export const metadata = {
  title: CHRISSIE_STORY.title,
  description: CHRISSIE_STORY.closingQuote,
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <ChrissiePage />;
}
