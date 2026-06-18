import { ErrolPage } from "components/stories/errol/errol-page";
import { ERROL_STORY } from "lib/stories/errol-content";

export const metadata = {
  title: `${ERROL_STORY.fullName} — ${ERROL_STORY.title}`,
  description: ERROL_STORY.heroQuote,
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <ErrolPage />;
}
