import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";
import {
  ChatBubbleLeftRightIcon,
  HeartIcon,
  PaintBrushIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  CONTACT_CONNECT_CARDS,
  CONTACT_HERO_IMAGE,
  CONTACT_SPACES_ICONS,
} from "lib/contact-config";
import {
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  PUBLIC_CONTACT_EMAIL,
} from "lib/site-config";
import { ContactForm } from "./contact-form";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

const CARD_ICONS = {
  brush: PaintBrushIcon,
  person: UserGroupIcon,
  handshake: UserGroupIcon,
  heart: HeartIcon,
};

export function ContactPageContent() {
  return (
    <>
      <section className="border-b border-bp-text/10 px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[2fr_3fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">Get in touch</p>
            <h1 className="mt-3 text-[clamp(2rem,5vw,3.75rem)] font-bold uppercase leading-tight tracking-tight text-bp-text">
              Let&apos;s start a conversation.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-bp-text/80">
              Whether you want to share a story, collaborate, join a workshop, or simply say hello —
              we&apos;d love to hear from you. Brush Past is a creative movement for second chances,
              built in public with real people and real spaces.
            </p>
          </div>
          <div className="relative h-[clamp(22rem,58vw,36rem)] w-full overflow-hidden rounded-sm bg-bp-surface lg:h-[clamp(24rem,42vw,38rem)]">
            <Image
              src={CONTACT_HERO_IMAGE.src}
              alt={CONTACT_HERO_IMAGE.alt}
              fill
              className="object-cover [mask-image:linear-gradient(to_right,transparent_0%,black_18%)]"
              style={{ objectPosition: "50% 42%" }}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-bp-text/10 bg-bp-surface px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-bp-text/5 lg:aspect-auto lg:min-h-[320px]">
            <Image
              src="/home-hero.png"
              alt="London Coffee Factory space"
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bp-accent">Rooted in real spaces</p>
            <h2 className="mt-2 text-2xl font-bold uppercase leading-snug text-bp-text">
              London Coffee Factory
              <br />
              <span className="text-lg font-semibold normal-case text-bp-text/70">Peckham, London</span>
            </h2>
            <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {CONTACT_SPACES_ICONS.map((label) => (
                <li key={label} className="flex flex-col items-center text-center">
                  <ChatBubbleLeftRightIcon className="mb-2 h-6 w-6 text-bp-text/50" strokeWidth={1.25} />
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-bp-text/70">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${caveat.className} flex items-center rounded-sm border border-bp-text/10 bg-bp-canvas p-6 text-xl leading-relaxed text-bp-text md:text-2xl`}>
            <p>
              We&apos;re building this in public — with honesty, creativity and care.
              <span className="mt-4 block text-lg">— Jeremy &amp; David</span>
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-bp-text/10 px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="text-center text-2xl font-bold uppercase tracking-[0.15em] text-bp-text md:text-3xl">
            How you can connect
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_CONNECT_CARDS.map((card) => {
              const Icon = CARD_ICONS[card.icon];
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className={`group flex flex-col rounded-sm p-6 ${card.color}`}
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-bp-text/20 bg-bp-canvas/80">
                    <Icon className="h-6 w-6 text-bp-text" strokeWidth={1.25} />
                  </div>
                  <h3 className="text-center text-sm font-bold uppercase tracking-wide text-bp-text">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-center text-xs leading-relaxed text-bp-text/75">
                    {card.description}
                  </p>
                  <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-bp-text group-hover:text-bp-accent">
                    {card.cta} →
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wide text-bp-text">
                We&apos;re figuring this out in public
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-bp-text/80">
                Brush Past is not a finished product — it&apos;s a living creative platform. Reach out
                with questions, ideas, partnerships or simply to introduce yourself.
              </p>
              <p className={`${caveat.className} mt-4 text-xl text-bp-text`}>— Jeremy &amp; David</p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-bp-text">Get in touch</h3>
              <ul className="mt-4 space-y-4 text-sm">
                <li>
                  <span className="font-semibold uppercase tracking-wide text-bp-text/50">Email</span>
                  <br />
                  <a href={`mailto:${PUBLIC_CONTACT_EMAIL}`} className="text-bp-accent hover:underline">
                    {PUBLIC_CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <span className="font-semibold uppercase tracking-wide text-bp-text/50">Phone</span>
                  <br />
                  <a href={`tel:${CONTACT_PHONE_TEL}`} className="hover:underline">
                    {CONTACT_PHONE}
                  </a>
                </li>
                <li>
                  <span className="font-semibold uppercase tracking-wide text-bp-text/50">Social</span>
                  <br />
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-bp-accent">
                    Instagram
                  </a>
                  {" · "}
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-bp-accent">
                    LinkedIn
                  </a>
                </li>
              </ul>
              <p className={`${caveat.className} mt-4 text-lg text-bp-text/80`}>
                Follow the journey as it unfolds →
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="border-t border-bp-text/10 bg-bp-surface px-4 py-10 md:px-10">
        <div className="mx-auto max-w-[1400px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-bp-text md:text-base">
            You don&apos;t need to have it all figured out to get in touch.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${PUBLIC_CONTACT_EMAIL}`}
              className="inline-flex border-2 border-bp-text px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-bp-text hover:bg-bp-text hover:text-bp-canvas"
            >
              Email us
            </a>
            <Link
              href="#contact-form"
              className="inline-flex border-2 border-bp-accent px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-bp-accent hover:bg-bp-accent hover:text-bp-canvas"
            >
              Send a message
            </Link>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-bp-text px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-bp-canvas hover:opacity-90"
            >
              Follow the journey
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
