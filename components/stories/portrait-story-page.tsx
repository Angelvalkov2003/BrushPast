import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "components/layout/footer";
import {
  bpBodyClass,
  homeHandClass,
  PAGE_HERO_H1_STORY_CLASS,
} from "components/home/home-typography";
import { RevealSection } from "components/shared/reveal-section";
import { StoryPageShell, StoryPanel } from "components/stories/story-texture";
import type {
  PortraitStory,
  PortraitStoryBlock,
} from "lib/stories/portrait-stories-content";

function BrushUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <span
        className="pointer-events-none absolute -bottom-0.5 left-0 h-[0.35em] w-full -skew-x-6 bg-bp-accent/80"
        aria-hidden
      />
    </span>
  );
}

function StoryBlock({ block }: { block: PortraitStoryBlock }) {
  if (block.type === "lead") {
    return (
      <p
        className={`${homeHandClass} text-[1.65rem] leading-snug text-bp-text md:text-[1.9rem]`}
      >
        <BrushUnderline>{block.text}</BrushUnderline>
      </p>
    );
  }
  if (block.type === "pair") {
    return (
      <div className="space-y-2">
        {block.lines.map((line) => (
          <p
            key={line}
            className={`${homeHandClass} text-[1.35rem] font-bold leading-snug text-bp-text md:text-[1.5rem]`}
          >
            {line}
          </p>
        ))}
      </div>
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote
        className={`${homeHandClass} border-l-[3px] border-bp-accent pl-4 text-[1.55rem] leading-snug text-bp-text md:text-[1.75rem]`}
      >
        &ldquo;{block.text}&rdquo;
      </blockquote>
    );
  }
  return (
    <p className={`${bpBodyClass} text-[1.05rem] leading-relaxed text-bp-text/90 md:text-lg`}>
      {block.text}
    </p>
  );
}

function ArtSlot({ label, note }: { label: string; note: string }) {
  return (
    <div
      className="relative flex min-h-[280px] flex-col items-center justify-center border border-dashed border-bp-text/25 bg-bp-text/[0.03] p-6 text-center md:min-h-[360px]"
      role="img"
      aria-label={note}
    >
      <p className={`${homeHandClass} text-xl text-bp-text/50`}>{label}</p>
      <p className={`${bpBodyClass} mt-2 text-xs uppercase tracking-[0.16em] text-bp-text/40`}>
        Space ready for artwork
      </p>
    </div>
  );
}

export function PortraitStoryPage({ story }: { story: PortraitStory }) {
  return (
    <StoryPageShell>
      <div className="px-4 py-4 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Link
            href="/stories"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-bp-text/70 hover:text-bp-accent hover:underline"
          >
            ← Back to stories
          </Link>
        </div>
      </div>

      <RevealSection className="border-b border-bp-text/10">
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-4 py-10 md:px-10 md:py-14 lg:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">
              Story
            </p>
            <h1 className={`${PAGE_HERO_H1_STORY_CLASS} mt-2`}>{story.title}</h1>
            {(story.location || story.metaNote) && (
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-bp-text/70">
                {[story.location, story.metaNote].filter(Boolean).join(" · ")}
              </p>
            )}
            {story.heroQuote ? (
              <p
                className={`${homeHandClass} mt-8 max-w-xl text-2xl leading-snug md:text-[1.75rem]`}
              >
                &ldquo;{story.heroQuote}&rdquo;
              </p>
            ) : null}
            <p
              className={`${homeHandClass} mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-bp-text/60 md:text-xs`}
            >
              {story.tags}
            </p>
          </div>
          <ArtSlot
            label={story.artSlots[0]?.label ?? "Portrait"}
            note={story.artSlots[0]?.note ?? "IMAGE NEEDED"}
          />
        </div>
      </RevealSection>

      <RevealSection className="border-b border-bp-text/10 px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="space-y-6">
            {story.blocks.map((block, index) => (
              <StoryBlock key={`${block.type}-${index}`} block={block} />
            ))}
          </div>
          <div className="space-y-4">
            {story.artSlots.slice(1).map((slot) => (
              <ArtSlot key={slot.label} label={slot.label} note={slot.note} />
            ))}
            {story.artSlots.length < 2 ? (
              <ArtSlot
                label="Supporting image"
                note="IMAGE NEEDED: Supporting photograph or artwork"
              />
            ) : null}
            <StoryPanel className="border border-bp-text/15 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-bp-accent">
                Artwork incoming
              </p>
              <p className={`${bpBodyClass} mt-3 text-sm text-bp-text/75`}>
                Spaces are ready for final photography and artwork selections.
              </p>
            </StoryPanel>
          </div>
        </div>
      </RevealSection>

      <Footer />
    </StoryPageShell>
  );
}
