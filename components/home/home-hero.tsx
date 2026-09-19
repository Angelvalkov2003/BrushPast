import { HomeCta } from "./home-decor";
import { HomeHeroCollage } from "./home-hero-collage";
import {
  bpBodyClass,
  bpTitleClass,
  bpTitleUtility,
  PAGE_HERO_BODY_CLASS,
} from "./home-typography";
import { PageHero } from "components/shared/page-hero";

export function HomeHero() {
  return (
    <PageHero
      eyebrow="Welcome in — take your time"
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
        Brushpast works alongside people whose stories and creativity are too
        often brushed past—including those affected by homelessness, addiction
        and recovery, the criminal justice system, and other life challenges.
      </p>
      <p className={PAGE_HERO_BODY_CLASS}>
        Through workshops, mentoring, and a platform to share and sell, we help
        people turn their creativity into art, products, and enterprises they
        can own and benefit from.
      </p>
      <ul
        className={`${bpTitleClass} ${bpTitleUtility} mt-8 space-y-2 text-lg font-bold uppercase tracking-[0.06em] text-bp-text md:text-xl`}
      >
        <li>You create it.</li>
        <li>You own it.</li>
        <li className="text-bp-accent">You benefit from it.</li>
      </ul>
      <p className={`${bpBodyClass} mt-8 max-w-xl font-semibold text-bp-text`}>
        65% of profits go back to the creators and organisations supporting
        them.
      </p>
    </PageHero>
  );
}
