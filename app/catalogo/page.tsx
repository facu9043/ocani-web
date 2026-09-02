import type { Metadata } from "next";
import CatalogClient from "@/components/CatalogClient";
import { getCatalog } from "@/lib/supabase/catalog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Catálogo mayorista de frutos secos, semillas, harinas, condimentos y productos naturales. Precios mayoristas a partir de 1 kg.",
};

async function loadCatalog() {
  try {
    return await getCatalog();
  } catch {
    return null;
  }
}

export default async function CatalogoPage() {
  const catalog = await loadCatalog();

  if (!catalog) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-forest-dark">
          No pudimos cargar el catálogo
        </h1>
        <p className="mt-2 text-ink/70">
          Probá recargar la página en unos minutos o escribinos por WhatsApp.
        </p>
      </div>
    );
  }

  return <CatalogClient products={catalog.products} categories={catalog.categories} />;
}
