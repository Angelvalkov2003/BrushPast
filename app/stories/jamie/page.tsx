import { JamiePage } from "components/stories/jamie/jamie-page";
import { JAMIE_STORY } from "lib/stories/jamie-content";

export const metadata = {
  title: JAMIE_STORY.title,
  description: JAMIE_STORY.heroQuote,
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <JamiePage />;
}
