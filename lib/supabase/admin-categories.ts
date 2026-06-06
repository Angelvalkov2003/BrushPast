import { getSupabaseServiceClient } from "lib/supabase/service";
import type { AdminCategory, ContentStatus } from "lib/types/admin";

export async function getAllCategoriesAdmin(): Promise<AdminCategory[]> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as AdminCategory[];
}

export async function getCategoryById(id: string): Promise<AdminCategory | null> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase.from("categories").select("*").eq("id", id).single();
  if (error) return null;
  return data as AdminCategory;
}

export async function createCategory(input: {
  name?: string;
  slug?: string;
  image_url?: string;
  short_description?: string;
  shop_cta?: string;
  status?: ContentStatus;
  sort_order?: number;
}) {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase.from("categories").insert(input).select().single();
  if (error) throw new Error(error.message);
  return data as AdminCategory;
}

export async function updateCategory(
  id: string,
  input: Partial<{
    name: string;
    slug: string;
    image_url: string;
    short_description: string;
    shop_cta: string;
    status: ContentStatus;
    sort_order: number;
  }>,
) {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("categories")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as AdminCategory;
}

export async function deleteCategory(id: string) {
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
