import { WorkshopNo1Page } from "components/workshops/workshop-no-1/workshop-no-1-page";
import { WORKSHOP_NO_1 } from "lib/workshops/workshop-no-1-content";

export const metadata = {
  title: `${WORKSHOP_NO_1.title} - ${WORKSHOP_NO_1.location}`,
  description: WORKSHOP_NO_1.tagline,
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <WorkshopNo1Page />;
}
