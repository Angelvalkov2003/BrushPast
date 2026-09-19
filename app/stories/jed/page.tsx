import { PortraitStoryPage } from "components/stories/portrait-story-page";
import { JED_STORY } from "lib/stories/portrait-stories-content";

export const metadata = {
  title: JED_STORY.title,
  description: JED_STORY.heroQuote,
};

export default function Page() {
  return <PortraitStoryPage story={JED_STORY} />;
}
