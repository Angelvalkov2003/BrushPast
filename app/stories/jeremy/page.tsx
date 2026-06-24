import { JeremyPage } from "components/stories/jeremy/jeremy-page";
import { JEREMY_STORY } from "lib/stories/jeremy-content";

export const metadata = {
  title: `${JEREMY_STORY.subtitle} - ${JEREMY_STORY.fullName}`,
  description: JEREMY_STORY.closingQuote,
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <JeremyPage />;
}
