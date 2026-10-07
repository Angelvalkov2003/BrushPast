import Footer from "components/layout/footer";
import { SponsorPageContent } from "components/sponsor/sponsor-page-content";
import { bpFontVariables } from "components/home/home-typography";
import { SITE_NAME } from "lib/site-config";

export const metadata = {
  title: "Support Us",
  description: `Support ${SITE_NAME}. Donate to Brush Past Foundation or partner with Brush Past Community Arts CIC.`,
};

export default function SponsorPage() {
  return (
    <div
      className={`${bpFontVariables} max-w-full overflow-x-clip bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
    >
      <SponsorPageContent />
      <Footer />
    </div>
  );
}
