import { HomeCta } from "./home-decor";
import { HomeHeroCollage } from "./home-hero-collage";
import { bpBodyClass, PAGE_HERO_BODY_CLASS } from "./home-typography";
import { PageHero } from "components/shared/page-hero";

export function HomeHero() {
  return (
    <PageHero
      eyebrow="Welcome in – take your time"
      title="Don't brush past."
      handLine="look closer."
      titleUppercase
      intro={
        <>
          Every story changes when you{" "}
          <span className="text-bp-accent">look closer.</span>
        </>
      }
      actions={
        <div className="flex max-w-md flex-col gap-4">
          <HomeCta
            href="/shop"
            variant="primary"
            className="w-full justify-center uppercase"
          >
            Shop gifts that give back →
          </HomeCta>
          <HomeCta
            href="/stories"
            variant="outline"
            className="w-full justify-center uppercase"
          >
            Meet the creators →
          </HomeCta>
        </div>
      }
      media={<HomeHeroCollage />}
    >
      <p className={PAGE_HERO_BODY_CLASS}>
        Brush Past is a curated collection of stories expressed through art,
        writing, photography and design by people society too often overlooks.
      </p>
      <p className={PAGE_HERO_BODY_CLASS}>
        We turn those stories into{" "}
        <span className="font-semibold text-bp-accent">gifts that give back.</span>
      </p>
      <p className={`${bpBodyClass} mt-4 max-w-xl font-semibold text-bp-text`}>
        65% of profits go back to the creators and organisations supporting them.
      </p>
      <p className="bp-hand mt-8 text-[clamp(1.15rem,2.5vw,1.45rem)] text-bp-text/80">
        Pull up a chair. Everyone belongs here.
      </p>
    </PageHero>
  );
}
