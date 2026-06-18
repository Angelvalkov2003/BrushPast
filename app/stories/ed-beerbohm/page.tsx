import { EdBeerbohmPage } from "components/stories/ed-beerbohm/ed-beerbohm-page";
import { ED_BEERBOHM_STORY } from "lib/stories/ed-beerbohm-content";

export const metadata = {
  title: ED_BEERBOHM_STORY.title,
  description: ED_BEERBOHM_STORY.heroQuote,
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <EdBeerbohmPage />;
}
