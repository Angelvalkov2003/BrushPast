import { BobbyPage } from "components/stories/bobby/bobby-page";
import { BOBBY_STORY } from "lib/stories/bobby-content";

export const metadata = {
  title: `${BOBBY_STORY.headline} - ${BOBBY_STORY.subtitle}`,
  description: BOBBY_STORY.heroQuote,
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <BobbyPage />;
}
