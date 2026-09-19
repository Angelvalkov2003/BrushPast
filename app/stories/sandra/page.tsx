import { PortraitStoryPage } from "components/stories/portrait-story-page";
import { SANDRA_STORY } from "lib/stories/portrait-stories-content";

export const metadata = {
  title: `${SANDRA_STORY.title} — ${SANDRA_STORY.location ?? "Story"}`,
  description: SANDRA_STORY.heroQuote,
};

export default function Page() {
  return <PortraitStoryPage story={SANDRA_STORY} />;
}
