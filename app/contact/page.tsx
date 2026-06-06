import Footer from "components/layout/footer";
import { ContactPageContent } from "components/contact/contact-page-content";

export const metadata = {
  title: "Get in Touch",
  description:
    "Contact Brush Past — share a story, collaborate, join a workshop, or start a conversation.",
};

export default function ContactPage() {
  return (
    <div className="bg-bp-canvas text-bp-text">
      <ContactPageContent />
      <Footer />
    </div>
  );
}
