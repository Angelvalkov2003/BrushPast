import { MaimounaPage } from "components/stories/maimouna/maimouna-page";
import { MAIMOUNA_STORY } from "lib/stories/maimouna-content";

export const metadata = {
  title: `${MAIMOUNA_STORY.title} — ${MAIMOUNA_STORY.songTitle}`,
  description: `${MAIMOUNA_STORY.artist} — ${MAIMOUNA_STORY.heroQuote}`,
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <MaimounaPage />;
}
