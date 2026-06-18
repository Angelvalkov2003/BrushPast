import { getSupabaseServiceClient } from "lib/supabase/service";
import type { AdminWorkshop, ContentStatus } from "lib/types/admin";

export async function getAllWorkshopsAdmin(): Promise<AdminWorkshop[]> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("workshops")
    .select("*")
    .order("sort_order", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as AdminWorkshop[];
}

export async function getWorkshopById(id: string): Promise<AdminWorkshop | null> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase.from("workshops").select("*").eq("id", id).single();
  if (error) return null;
  return data as AdminWorkshop;
}

export async function createWorkshop(input: {
  title?: string;
  slug?: string;
  image_url?: string;
  short_description?: string;
  location_label?: string;
  page_url?: string | null;
  workshop_category?: string;
  organisation_id?: string | null;
  status?: ContentStatus;
  sort_order?: number;
}) {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase.from("workshops").insert(input).select().single();
  if (error) throw new Error(error.message);
  return data as AdminWorkshop;
}

export async function updateWorkshop(
  id: string,
  input: Partial<{
    title: string;
    slug: string;
    image_url: string;
    short_description: string;
    location_label: string;
    page_url: string | null;
    workshop_category: string;
    organisation_id: string | null;
    status: ContentStatus;
    sort_order: number;
  }>,
) {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("workshops")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as AdminWorkshop;
}

export async function deleteWorkshop(id: string) {
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("workshops").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
