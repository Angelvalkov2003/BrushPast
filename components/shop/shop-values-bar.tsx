import { IndexCard } from "components/home/home-decor";
import { bpBodySmClass, bpTitleClass, bpTitleUtility } from "components/home/home-typography";
import { TEXTURE_IMAGES } from "components/shared/texture-section";
import { SHOP_VALUE_PROPS } from "lib/shop-hub-config";

export function ShopValuesBar() {
  return (
    <section className="relative overflow-hidden border-t border-bp-text/10 bg-bp-dark text-bp-canvas">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${TEXTURE_IMAGES.secondary})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-bp-dark/85" aria-hidden />

      <div className="relative mx-auto max-w-[1400px] px-4 py-14 md:px-10 md:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SHOP_VALUE_PROPS.map((item) => (
            <IndexCard
              panelTexture={null}
              key={item.title}
              className="border-bp-canvas/15 bg-bp-dark/40 text-center"
            >
              <p
                className={`${bpTitleClass} ${bpTitleUtility} text-lg font-bold uppercase tracking-wide text-bp-canvas`}
              >
                {item.title}
              </p>
              <p className={`${bpBodySmClass} mt-2 text-bp-canvas/80`}>
                {item.note}
              </p>
            </IndexCard>
          ))}
        </div>
      </div>
    </section>
  );
}
