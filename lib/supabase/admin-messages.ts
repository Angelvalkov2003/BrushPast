import { getSupabaseServiceClient } from "lib/supabase/service";
import type { CustomerMessage } from "lib/types/admin";

export async function getAllCustomerMessages(): Promise<CustomerMessage[]> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("customer_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as CustomerMessage[];
}

export async function deleteCustomerMessage(id: string) {
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("customer_messages").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
