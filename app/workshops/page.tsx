import Footer from "components/layout/footer";
import { WorkshopsPageContent } from "components/workshops/workshops-page-content";
import { homeHand, homeSerif } from "components/home/home-typography";
import { getPublicWorkshops } from "lib/supabase/workshops";

export const metadata = {
  title: "Workshops",
  description:
    "Brush Past workshops - safe creative space to make something, connect, and choose your own path.",
};

export const dynamic = "force-dynamic";

export default async function WorkshopsPage() {
  const workshops = await getPublicWorkshops();

  return (
    <div
      className={`${homeHand.variable} ${homeSerif.variable} bg-bp-canvas text-bp-text selection:bg-bp-accent/20`}
    >
      <WorkshopsPageContent workshops={workshops} />
      <Footer />
    </div>
  );
}
