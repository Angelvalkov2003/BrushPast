import Footer from "components/layout/footer";
import { WorkshopsPageContent } from "components/workshops/workshops-page-content";
import { bpFontVariables } from "components/home/home-typography";

export const metadata = {
  title: "Workshops",
  description:
    "Brush Past workshops - safe creative space to make something, connect, and choose your own path.",
};

export default function WorkshopsPage() {
  return (
    <div
      className={`${bpFontVariables} bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
    >
      <WorkshopsPageContent />
      <Footer />
    </div>
  );
}
