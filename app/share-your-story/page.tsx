import { PublicSection } from "components/layout/public-section";

export const metadata = {
  title: "Share your story",
};

export default function ShareYourStoryPage() {
  return (
    <PublicSection variant="surface" className="min-h-[50vh] px-6 py-20 md:px-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold uppercase tracking-wide text-bp-text">
          Share your story
        </h1>
        <p className="mt-6 text-lg text-bp-text/80">Form coming soon.</p>
      </div>
    </PublicSection>
  );
}
