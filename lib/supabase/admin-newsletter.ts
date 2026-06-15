import { getSupabaseServiceClient } from "lib/supabase/service";
import type { NewsletterSubscriber } from "lib/types/admin";

export async function getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as NewsletterSubscriber[];
}

export async function deleteNewsletterSubscriber(id: string) {
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
