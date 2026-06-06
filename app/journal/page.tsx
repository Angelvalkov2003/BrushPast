import { PublicSection } from "components/layout/public-section";

export const metadata = {
  title: "Journal",
};

export default function JournalPage() {
  return (
    <PublicSection variant="surface" className="min-h-[50vh] px-6 py-20 md:px-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold uppercase tracking-wide text-bp-text">
          Journal
        </h1>
        <p className="mt-6 text-lg text-bp-text/80">Page coming soon.</p>
      </div>
    </PublicSection>
  );
}
