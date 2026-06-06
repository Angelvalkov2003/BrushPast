import Footer from "components/layout/footer";
import { WorkshopsPageContent } from "components/workshops/workshops-page-content";

export const metadata = {
  title: "Workshops",
  description:
    "Brush Past workshops — safe creative space to make something, connect, and choose your own path.",
};

export default function WorkshopsPage() {
  return (
    <div className="bg-bp-canvas text-bp-text">
      <WorkshopsPageContent />
      <Footer />
    </div>
  );
}
