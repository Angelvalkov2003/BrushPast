import { PortraitStoryPage } from "components/stories/portrait-story-page";
import { KARL_STORY } from "lib/stories/portrait-stories-content";

export const metadata = {
  title: `${KARL_STORY.title} — ${KARL_STORY.location ?? "Story"}`,
  description: KARL_STORY.heroQuote,
};

export default function Page() {
  return <PortraitStoryPage story={KARL_STORY} />;
}
