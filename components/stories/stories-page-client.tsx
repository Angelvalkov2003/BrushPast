"use client";

import { useMemo, useState } from "react";
import type { PublicStory } from "lib/supabase/stories";
import {
  // STORY_FILTER_TABS,
  // type StoryFilterId,
  layoutForStory,
} from "lib/stories-config";
import { hasStoryCardImage } from "lib/story-display";
import { Reveal, REVEAL_STAGGER_MS } from "components/shared/reveal";
import { homeHandClass } from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";
import { StoryCard } from "./story-card";
import { StoriesGridToggle } from "./stories-grid-toggle";
import { StoriesSort, type StorySortKey } from "./stories-sort";

// function filterStories(stories: PublicStory[], filter: StoryFilterId): PublicStory[] {
//   if (filter === "all") return stories;
//   return stories.filter((s) => (s.tags ?? []).includes(filter));
// }

function storyCreatedAt(story: PublicStory): number {
  const time = Date.parse(story.created_at);
  return Number.isFinite(time) ? time : 0;
}

function sortStories(stories: PublicStory[], sort: StorySortKey): PublicStory[] {
  const list = [...stories];

  if (sort === "featured") {
    return list.sort((a, b) => {
      if (b.sort_order !== a.sort_order) return b.sort_order - a.sort_order;
      return storyCreatedAt(b) - storyCreatedAt(a);
    });
  }

  if (sort === "oldest") {
    return list.sort((a, b) => {
      const byDate = storyCreatedAt(a) - storyCreatedAt(b);
      if (byDate !== 0) return byDate;
      return b.sort_order - a.sort_order;
    });
  }

  return list.sort((a, b) => {
    const byDate = storyCreatedAt(b) - storyCreatedAt(a);
    if (byDate !== 0) return byDate;
    return b.sort_order - a.sort_order;
  });
}

export function StoriesPageClient({ stories }: { stories: PublicStory[] }) {
  const [sort, setSort] = useState<StorySortKey>("featured");
  const [compactGrid, setCompactGrid] = useState(false);

  const visible = useMemo(() => sortStories(stories, sort), [stories, sort]);

  return (
  <>
      {/* Category filter — hidden for now; always show all stories
      <nav
        className="sticky top-[65px] z-30 border-b border-bp-text/10 bg-bp-canvas/95 backdrop-blur-sm"
        aria-label="Story categories"
      >
        <div className="mx-auto max-w-[1400px] overflow-x-auto px-4 md:px-10">
          <ul className="flex min-w-max gap-5 py-4 md:gap-7">
            {STORY_FILTER_TABS.map((tab) => (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`${homeHandClass} text-lg transition-colors md:text-xl ${
                    filter === tab.id
                      ? "border-b-2 border-bp-accent pb-0.5 font-bold text-bp-text"
                      : "text-bp-text/50 hover:text-bp-accent"
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      */}

      <TextureSection texture="secondary" className="px-4 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-5 border-b border-bp-text/10 py-5 md:py-6">
              <p className={`${homeHandClass} text-xl text-bp-text md:text-2xl`}>
                <span className="font-bold text-bp-accent">{visible.length}</span>{" "}
                {visible.length === 1 ? "story" : "stories"}
              </p>
              <div className="flex items-center gap-2">
                <StoriesGridToggle compact={compactGrid} onChange={setCompactGrid} />
                <StoriesSort value={sort} onChange={setSort} />
              </div>
            </div>
          </Reveal>

          {visible.length === 0 ? (
            <p className={`${homeHandClass} py-20 text-center text-2xl text-bp-text/50`}>
              No stories yet. Check back soon.
            </p>
          ) : (
            <div
              className={
                compactGrid
                  ? "grid grid-cols-2 gap-3 py-6 md:grid-cols-12 md:gap-5 md:py-10"
                  : "grid auto-rows-min grid-cols-1 gap-5 py-8 md:grid-cols-12 md:gap-6 md:py-10"
              }
            >
              {visible.map((story, index) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  compact={compactGrid}
                  index={index}
                  layout={layoutForStory(index, hasStoryCardImage(story))}
                />
              ))}
            </div>
          )}
        </div>
      </TextureSection>
    </>
  );
}
