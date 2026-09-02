"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/supabase/require-user";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type SettingsFormState = { error: string | null; success?: boolean };

export async function updateSettings(
  _prevState: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  await requireUser();

  const whatsapp_number = String(formData.get("whatsapp_number") ?? "").trim();
  const business_hours = String(formData.get("business_hours") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const instagram_url = String(formData.get("instagram_url") ?? "").trim();
  const about_text = String(formData.get("about_text") ?? "").trim();

  const { error } = await supabaseAdmin
    .from("site_settings")
    .update({ whatsapp_number, business_hours, address, instagram_url, about_text })
    .eq("id", 1);

  if (error) return { error: error.message };

  revalidatePath("/admin/configuracion");
  revalidatePath("/contacto");
  revalidatePath("/sobre-nosotros");
  revalidatePath("/");
  return { error: null, success: true };
}
