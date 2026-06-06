import Footer from "components/layout/footer";
import { AboutPageContent } from "components/about/about-page-content";

export const metadata = {
  title: "About",
  description:
    "About Brush Past — our mission, values, mentoring, and the social enterprise creating real change.",
};

export default function AboutPage() {
  return (
    <div className="bg-bp-canvas text-bp-text">
      <AboutPageContent />
      <Footer />
    </div>
  );
}
