import type { Metadata } from "next";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { SITE_ID } from "@/lib/site";
import SettingsForm from "@/components/admin/SettingsForm";

export const metadata: Metadata = { title: "Configuración" };

export default async function AdminSettingsPage() {
  const supabaseAdmin = getSupabaseAdmin();
  const { data: settings } = await supabaseAdmin
    .from("sites")
    .select("whatsapp_number, business_hours, address, instagram_url, about_text")
    .eq("id", SITE_ID)
    .maybeSingle();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-dark">Configuración</h1>
      <p className="mt-1 text-sm text-ink/60">
        Estos datos se muestran en Contacto, Sobre Nosotros y el pie de página del sitio.
      </p>

      <div className="mt-6">
        <SettingsForm
          settings={
            settings ?? {
              whatsapp_number: "",
              business_hours: "",
              address: "",
              instagram_url: "",
              about_text: "",
            }
          }
        />
      </div>
    </div>
  );
}
