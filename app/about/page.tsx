import Footer from "components/layout/footer";
import { AboutPageContent } from "components/about/about-page-content";
import { homeHand, homeSerif } from "components/home/home-typography";

export const metadata = {
  title: "About",
  description:
    "About Brush Past - our mission, values, mentoring, and the social enterprise creating real change.",
};

export default function AboutPage() {
  return (
    <div
      className={`${homeHand.variable} ${homeSerif.variable} bg-bp-canvas text-bp-text selection:bg-bp-accent/20`}
    >
      <AboutPageContent />
      <Footer />
    </div>
  );
}
