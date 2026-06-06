import { getSupabaseServiceClient } from "lib/supabase/service";
import type { AdminOrganisation, ContentStatus } from "lib/types/admin";

export async function getAllOrganisationsAdmin(): Promise<AdminOrganisation[]> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("organisations")
    .select("*")
    .order("sort_order", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as AdminOrganisation[];
}

export async function getOrganisationById(id: string): Promise<AdminOrganisation | null> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase.from("organisations").select("*").eq("id", id).single();
  if (error) return null;
  return data as AdminOrganisation;
}

export async function createOrganisation(input: {
  name?: string;
  image_url?: string;
  short_description?: string;
  slug?: string;
  external_url?: string;
  status?: ContentStatus;
  sort_order?: number;
}) {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase.from("organisations").insert(input).select().single();
  if (error) throw new Error(error.message);
  return data as AdminOrganisation;
}

export async function updateOrganisation(
  id: string,
  input: Partial<{
    name: string;
    image_url: string;
    short_description: string;
    slug: string;
    external_url: string;
    status: ContentStatus;
    sort_order: number;
  }>,
) {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("organisations")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as AdminOrganisation;
}

export async function deleteOrganisation(id: string) {
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("organisations").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
