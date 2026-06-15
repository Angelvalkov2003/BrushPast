import { getSupabaseServiceClient } from "lib/supabase/service";
import type { AdminJournalPost, ContentStatus } from "lib/types/admin";

const POST_SELECT = `
  *,
  journal_post_images ( id, journal_post_id, image_url, sort_order )
`;

export async function getAllJournalPostsAdmin(): Promise<AdminJournalPost[]> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("journal_posts")
    .select(POST_SELECT)
    .order("sort_order", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as AdminJournalPost[];
}

export async function getJournalPostById(id: string): Promise<AdminJournalPost | null> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("journal_posts")
    .select(POST_SELECT)
    .eq("id", id)
    .single();

  if (error) return null;
  return data as AdminJournalPost;
}

type JournalWriteInput = {
  title?: string;
  slug?: string;
  description?: string;
  main_image_url?: string | null;
  body?: string;
  status?: ContentStatus;
  sort_order?: number;
  gallery_urls?: string[];
};

async function syncJournalImages(postId: string, urls: string[]) {
  const supabase = getSupabaseServiceClient();
  await supabase.from("journal_post_images").delete().eq("journal_post_id", postId);

  const cleaned = urls.map((u) => u.trim()).filter(Boolean);
  if (cleaned.length === 0) return;

  await supabase.from("journal_post_images").insert(
    cleaned.map((image_url, index) => ({
      journal_post_id: postId,
      image_url,
      sort_order: (cleaned.length - index) * 10,
    })),
  );
}

export async function createJournalPost(input: JournalWriteInput) {
  const supabase = getSupabaseServiceClient();
  const { gallery_urls, ...fields } = input;
  const { data, error } = await supabase.from("journal_posts").insert(fields).select().single();
  if (error) throw new Error(error.message);
  await syncJournalImages(data.id, gallery_urls ?? []);
  return data as AdminJournalPost;
}

export async function updateJournalPost(id: string, input: Partial<JournalWriteInput>) {
  const supabase = getSupabaseServiceClient();
  const { gallery_urls, ...fields } = input;
  const { data, error } = await supabase.from("journal_posts").update(fields).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  if (gallery_urls !== undefined) await syncJournalImages(id, gallery_urls);
  return data as AdminJournalPost;
}

export async function deleteJournalPost(id: string) {
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("journal_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
