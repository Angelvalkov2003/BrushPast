import Footer from "components/layout/footer";
import { SponsorPageContent } from "components/sponsor/sponsor-page-content";
import { bpFontVariables } from "components/home/home-typography";
import { SITE_NAME } from "lib/site-config";

export const metadata = {
  title: "Sponsor",
  description: `Become a sponsor of ${SITE_NAME}. Support artists, workshops and the next chapter of community storytelling.`,
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
