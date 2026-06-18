import { EnehPage } from "components/stories/eneh/eneh-page";
import { ENEH_STORY } from "lib/stories/eneh-content";

export const metadata = {
  title: ENEH_STORY.headline,
  description: ENEH_STORY.intro,
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <EnehPage />;
}
