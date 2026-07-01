import BrandLogo from "components/brand-logo";
import Footer from "components/layout/footer";
import { HomeCta } from "components/home/home-decor";
import { bpFontVariables, bpSubtitleClass, homeHandClass } from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div
      className={`${bpFontVariables} bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
    >
      <TextureSection
        texture="primary"
        className="flex min-h-[calc(100vh-4rem)] items-center px-4 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto w-full max-w-[1400px] text-center">
          <BrandLogo size="hero" priority className="mx-auto !object-center" />
          <p className={`${homeHandClass} mt-10 text-2xl text-bp-accent md:text-3xl`}>
            404
          </p>
          <h1 className="mt-3 text-[clamp(2.25rem,6vw,4rem)] font-bold leading-tight text-bp-text">
            This page could not be found.
          </h1>
          <p className={`${bpSubtitleClass} mx-auto mt-5 max-w-lg text-lg leading-relaxed text-bp-text/80 md:text-xl`}>
            The link may be broken, or the page may have moved. Let&apos;s get you back to the
            stories and the shop.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <HomeCta href="/" variant="primary">
              Back home →
            </HomeCta>
            <HomeCta href="/shop" variant="outline">
              Visit the shop →
            </HomeCta>
          </div>
        </div>
      </TextureSection>
      <Footer />
    </div>
  );
}
