"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { StoryArtworkImage } from "lib/supabase/story-products";

export function StoryArtworkCarousel({
  images,
  title,
}: {
  images: StoryArtworkImage[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  if (!images.length) return null;

  const current = images[index]!;
  const total = images.length;

  return (
    <section className="border-b border-bp-text/10 bg-bp-canvas px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-bp-surface lg:aspect-[16/10]">
          <Image
            src={current.url}
            alt={current.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">Artwork</p>
          <h2 className="mt-2 font-serif text-2xl italic leading-snug text-bp-text md:text-3xl">{title}</h2>
          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIndex((i) => (i <= 0 ? total - 1 : i - 1))}
              className="flex h-10 w-10 items-center justify-center border border-bp-text/20 hover:border-bp-accent hover:text-bp-accent"
              aria-label="Previous"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bp-text/60">
              {index + 1} / {total}
            </span>
            <button
              type="button"
              onClick={() => setIndex((i) => (i >= total - 1 ? 0 : i + 1))}
              className="flex h-10 w-10 items-center justify-center border border-bp-text/20 hover:border-bp-accent hover:text-bp-accent"
              aria-label="Next"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
          <ul className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {images.map((img, i) => (
              <li key={img.id}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border-2 ${
                    i === index ? "border-bp-accent" : "border-transparent opacity-70"
                  }`}
                >
                  <Image src={img.url} alt="" fill className="object-cover" sizes="64px" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
