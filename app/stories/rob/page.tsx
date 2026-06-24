import { RobPage } from "components/stories/rob/rob-page";
import { ROB_STORY } from "lib/stories/rob-content";

export const metadata = {
  title: `${ROB_STORY.title} - ${ROB_STORY.poemTitle}`,
  description: ROB_STORY.heroQuote,
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <RobPage />;
}
