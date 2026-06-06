import { getSupabaseServiceClient } from "lib/supabase/service";
import type { AdminCreator, ContentStatus } from "lib/types/admin";

export async function getAllCreatorsAdmin(): Promise<AdminCreator[]> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("creators")
    .select("*")
    .order("sort_order", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as AdminCreator[];
}

export async function getCreatorById(id: string): Promise<AdminCreator | null> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase.from("creators").select("*").eq("id", id).single();
  if (error) return null;
  return data as AdminCreator;
}

export async function createCreator(input: {
  name?: string;
  image_url?: string;
  short_description?: string;
  profile_url?: string;
  is_anonymous?: boolean;
  status?: ContentStatus;
  sort_order?: number;
}) {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase.from("creators").insert(input).select().single();
  if (error) throw new Error(error.message);
  return data as AdminCreator;
}

export async function updateCreator(
  id: string,
  input: Partial<{
    name: string;
    image_url: string;
    short_description: string;
    profile_url: string;
    is_anonymous: boolean;
    status: ContentStatus;
    sort_order: number;
  }>,
) {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase.from("creators").update(input).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data as AdminCreator;
}

export async function deleteCreator(id: string) {
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("creators").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
