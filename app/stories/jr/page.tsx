import { JrPage } from "components/stories/jr/jr-page";
import { JR_STORY } from "lib/stories/jr-content";

export const metadata = {
  title: `${JR_STORY.title} - Artist story`,
  description: JR_STORY.heroQuote,
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <JrPage />;
}
