import Footer from "components/layout/footer";
import { ContactPageContent } from "components/contact/contact-page-content";
import { bpFontVariables } from "components/home/home-typography";

export const metadata = {
  title: "Get in Touch",
  description:
    "Contact Brush Past - share a story, collaborate, join a workshop, or start a conversation.",
};

export default function ContactPage() {
  return (
    <div
      className={`${bpFontVariables} bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
    >
      <ContactPageContent />
      <Footer />
    </div>
  );
}
