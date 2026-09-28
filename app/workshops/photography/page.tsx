import { PhotographyWorkshopPage } from "components/workshops/photography/photography-workshop-page";
import { PHOTOGRAPHY_WORKSHOP } from "lib/workshops/photography-workshop-content";

export const metadata = {
  title: `${PHOTOGRAPHY_WORKSHOP.title} - Workshops`,
  description: PHOTOGRAPHY_WORKSHOP.tagline,
};

export default function Page() {
  return <PhotographyWorkshopPage />;
}
