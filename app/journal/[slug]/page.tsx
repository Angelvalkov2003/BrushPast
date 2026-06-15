import Footer from "components/layout/footer";
import { JournalPostDetail } from "components/journal/journal-post-detail";
import { getPublicJournalPostBySlug } from "lib/supabase/journal";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublicJournalPostBySlug(slug);
  if (!post) return { title: "Journal" };
  return {
    title: post.title ?? "Journal",
    description: post.description ?? undefined,
  };
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublicJournalPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="bg-bp-canvas text-bp-text">
      <JournalPostDetail post={post} />
      <Footer />
    </div>
  );
}
