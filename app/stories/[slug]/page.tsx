import { redirect, notFound } from "next/navigation";
import { getPublicStoryBySlug } from "lib/supabase/stories";

export const dynamic = "force-dynamic";

/**
 * Fallback only: redirects to story.page_url when set.
 * Prefer dedicated routes, e.g. app/stories/the-roundabout-meeting/page.tsx
 */
export default async function StorySlugRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await getPublicStoryBySlug(slug);
  if (!story) notFound();

  const target = story.page_url?.trim();
  if (target && target !== `/stories/${slug}`) {
    redirect(target.startsWith("/") ? target : `/${target}`);
  }

  notFound();
}
