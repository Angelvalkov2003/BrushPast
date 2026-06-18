import Footer from "components/layout/footer";
import { WorkshopsPageContent } from "components/workshops/workshops-page-content";
import { getPublicWorkshops } from "lib/supabase/workshops";

export const metadata = {
  title: "Workshops",
  description:
    "Brush Past workshops — safe creative space to make something, connect, and choose your own path.",
};

export const dynamic = "force-dynamic";

export default async function WorkshopsPage() {
  const workshops = await getPublicWorkshops();

  return (
    <div className="bg-bp-canvas text-bp-text">
      <WorkshopsPageContent workshops={workshops} />
      <Footer />
    </div>
  );
}
