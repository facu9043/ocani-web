import { supabase } from "@/lib/supabase/client";
import { SITE_ID } from "@/lib/site";

export async function getSiteSettings() {
  const { data, error } = await supabase.from("sites").select("*").eq("id", SITE_ID).single();
  if (error) throw error;
  return data;
}
