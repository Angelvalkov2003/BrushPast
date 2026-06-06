import { getSupabaseServiceClient } from "lib/supabase/service";
import type { AdminStory, ContentStatus } from "lib/types/admin";

export async function getAllStoriesAdmin(): Promise<AdminStory[]> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .order("sort_order", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as AdminStory[];
}

export async function getStoryById(id: string): Promise<AdminStory | null> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase.from("stories").select("*").eq("id", id).single();
  if (error) return null;
  return data as AdminStory;
}

type StoryWriteInput = {
  title?: string;
  slug?: string;
  image_url?: string | null;
  short_description?: string;
  page_url?: string | null;
  tags?: string[];
  creator_id?: string | null;
  organisation_id?: string | null;
  status?: ContentStatus;
  sort_order?: number;
};

function isMissingPageUrlColumn(message: string): boolean {
  return message.includes("page_url") && message.includes("does not exist");
}

function withoutPageUrl<T extends StoryWriteInput>(input: T): Omit<T, "page_url"> {
  const { page_url: _removed, ...rest } = input;
  return rest;
}

export async function createStory(input: StoryWriteInput) {
  const supabase = getSupabaseServiceClient();
  let { data, error } = await supabase.from("stories").insert(input).select().single();
  if (error && input.page_url !== undefined && isMissingPageUrlColumn(error.message)) {
    ({ data, error } = await supabase.from("stories").insert(withoutPageUrl(input)).select().single());
  }
  if (error) throw new Error(error.message);
  return data as AdminStory;
}

export async function updateStory(id: string, input: Partial<StoryWriteInput>) {
  const supabase = getSupabaseServiceClient();
  let { data, error } = await supabase.from("stories").update(input).eq("id", id).select().single();
  if (error && "page_url" in input && isMissingPageUrlColumn(error.message)) {
    ({ data, error } = await supabase
      .from("stories")
      .update(withoutPageUrl(input))
      .eq("id", id)
      .select()
      .single());
  }
  if (error) throw new Error(error.message);
  return data as AdminStory;
}

export async function deleteStory(id: string) {
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("stories").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
