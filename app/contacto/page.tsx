import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import FoodBackdrop from "@/components/FoodBackdrop";
import TickerSync from "@/components/TickerSync";
import { getSiteSettings } from "@/lib/supabase/settings";
import { getCatalog } from "@/lib/supabase/catalog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactá a Ocani por WhatsApp o Instagram. Horarios de atención y ubicación en Resistencia, Chaco.",
};

const FALLBACK = {
  whatsapp_number: "543624158218",
  business_hours: "Lunes a viernes de 9:00 a 13:00 y de 16:00 a 20:00. Sábados de 10:30 a 13:30.",
  address: "Tomás García P 172, Resistencia, Chaco",
  instagram_url: "https://instagram.com/ocani_mayorista",
};

export default async function ContactoPage() {
  const [settings, catalog] = await Promise.all([
    getSiteSettings().catch((error) => {
      console.error("[contacto] getSiteSettings failed:", error);
      return null;
    }),
    getCatalog().catch((error) => {
      console.error("[contacto] getCatalog failed:", error);
      return null;
    }),
  ]);

  const whatsappNumber = settings?.whatsapp_number || FALLBACK.whatsapp_number;
  const businessHours = settings?.business_hours || FALLBACK.business_hours;
  const address = settings?.address || FALLBACK.address;
  const instagramUrl = settings?.instagram_url || FALLBACK.instagram_url;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <div className="relative">
      <FoodBackdrop count={10} />
      {catalog && <TickerSync products={catalog.products} />}

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <nav className="text-sm font-semibold text-ink/60">
          <Link href="/catalogo" className="hover:text-forest-dark">
            Catálogo
          </Link>{" "}
          <span className="mx-1">›</span> <span className="text-forest-dark">Contacto</span>
        </nav>

        <h1 className="mt-3 font-display text-3xl font-bold text-forest-dark sm:text-4xl">
          Contacto
        </h1>
        <p className="mt-2 max-w-xl font-semibold text-ink/70">
          Escribinos por WhatsApp o Instagram, o dejanos tu consulta acá abajo.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-2xl border border-forest-dark/10 bg-sage p-6">
              <h2 className="font-display text-lg font-bold text-forest-dark">WhatsApp</h2>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-bold text-forest hover:text-forest-dark"
              >
                +54 3624 15-8218
              </a>

              <h2 className="mt-5 font-display text-lg font-bold text-forest-dark">Instagram</h2>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-bold text-forest hover:text-forest-dark"
              >
                @ocani_mayorista
              </a>

              <h2 className="mt-5 font-display text-lg font-bold text-forest-dark">
                Horario de atención
              </h2>
              <p className="mt-2 text-sm font-semibold text-ink/80">{businessHours}</p>

              <h2 className="mt-5 font-display text-lg font-bold text-forest-dark">Dirección</h2>
              <p className="mt-2 text-sm font-semibold text-ink/80">{address}</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-forest-dark/10">
              <iframe
                src={mapSrc}
                title="Ubicación de Ocani"
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-forest-dark/10 bg-cream p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-forest-dark">Escribinos</h2>
            <p className="mt-1 text-sm font-semibold text-ink/70">
              Completá el formulario y se abre WhatsApp con tu mensaje listo para enviar.
            </p>
            <div className="mt-5">
              <ContactForm whatsappNumber={whatsappNumber} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
