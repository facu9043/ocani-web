import type { Metadata } from "next";
import Link from "next/link";
import FoodBackdrop from "@/components/FoodBackdrop";
import TickerSync from "@/components/TickerSync";
import { NutsIllustration, SeedsIllustration, FlourIllustration, SpicesIllustration } from "@/components/CategoryIllustrations";
import { getSiteSettings } from "@/lib/supabase/settings";
import { getCatalog } from "@/lib/supabase/catalog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conocé a Ocani: dietética mayorista de frutos secos, semillas, harinas y productos naturales, con envíos a todo Argentina.",
};

const FALLBACK_ABOUT_TEXT =
  "Ocani es una dietética mayorista especializada en frutos secos, semillas, harinas y productos naturales. Trabajamos con revendedores, dietéticas, panaderías y consumidores finales, con despacho a todo el país y foco en calidad y variedad.";

const AUDIENCES = [
  {
    title: "Revendedores",
    detail: "Precios mayoristas para quienes ya venden al público.",
  },
  {
    title: "Dietéticas",
    detail: "Reposición constante de tu catálogo de productos naturales.",
  },
  {
    title: "Panaderías y reposterías",
    detail: "Insumos a granel para producción: harinas, frutos secos, semillas.",
  },
  {
    title: "Consumidores finales",
    detail: "También comprás por mayor para tu casa, a partir de 1 kg.",
  },
];

const CATEGORIES = [
  { label: "Frutos Secos", Illustration: NutsIllustration },
  { label: "Semillas", Illustration: SeedsIllustration },
  { label: "Harinas y Avena", Illustration: FlourIllustration },
  { label: "Condimentos y Aceites", Illustration: SpicesIllustration },
];

export default async function SobreNosotrosPage() {
  const [settings, catalog] = await Promise.all([
    getSiteSettings().catch((error) => {
      console.error("[sobre-nosotros] getSiteSettings failed:", error);
      return null;
    }),
    getCatalog().catch((error) => {
      console.error("[sobre-nosotros] getCatalog failed:", error);
      return null;
    }),
  ]);
  const aboutText = settings?.about_text || FALLBACK_ABOUT_TEXT;

  return (
    <div className="relative">
      <FoodBackdrop count={12} />
      {catalog && <TickerSync products={catalog.products} />}

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <nav className="text-sm font-semibold text-ink/60">
          <Link href="/catalogo" className="hover:text-forest-dark">
            Catálogo
          </Link>{" "}
          <span className="mx-1">›</span> <span className="text-forest-dark">Sobre Nosotros</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-forest-dark/5 px-3 py-1 text-xs font-bold tracking-wide text-forest uppercase">
              Dietética mayorista
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold text-forest-dark sm:text-4xl">
              Sobre Nosotros
            </h1>
            <p className="mt-5 font-display text-xl leading-relaxed text-forest-dark">
              {aboutText}
            </p>
          </div>

          <div className="relative h-72 overflow-hidden rounded-3xl bg-sage sm:h-80">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold/25 blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-14 -left-10 h-44 w-44 rounded-full bg-forest-light/25 blur-2xl"
            />

            <div className="absolute top-[14%] left-[10%] flex h-20 w-20 items-center justify-center rounded-full bg-cream shadow-sm sm:h-24 sm:w-24">
              <NutsIllustration className="h-11 w-11 sm:h-14 sm:w-14" />
            </div>
            <div className="absolute top-[10%] right-[14%] flex h-16 w-16 items-center justify-center rounded-full bg-cream shadow-sm sm:h-20 sm:w-20">
              <FlourIllustration className="h-9 w-9 sm:h-11 sm:w-11" />
            </div>
            <div className="absolute bottom-[12%] left-[28%] flex h-24 w-24 items-center justify-center rounded-full bg-cream shadow-sm sm:h-28 sm:w-28">
              <SeedsIllustration className="h-14 w-14 sm:h-16 sm:w-16" />
            </div>
            <div className="absolute right-[12%] bottom-[18%] flex h-14 w-14 items-center justify-center rounded-full bg-cream shadow-sm sm:h-16 sm:w-16">
              <SpicesIllustration className="h-8 w-8 sm:h-9 sm:w-9" />
            </div>
            <div className="absolute top-[42%] left-[55%] flex h-12 w-12 items-center justify-center rounded-full bg-cream shadow-sm sm:h-14 sm:w-14">
              <NutsIllustration className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>
          </div>
        </div>

        <div className="mt-10 max-w-3xl space-y-4 text-ink/70">
          <p>
            En Ocani trabajamos para brindar a nuestros clientes productos
            seleccionados y un servicio cercano, confiable y responsable. Nuestro
            objetivo es que cada compra sea una experiencia simple y satisfactoria.
          </p>
          <p>
            Nos apasiona lo que hacemos y buscamos crecer junto a nuestros clientes,
            acompañando tanto a quienes eligen nuestros productos para su consumo
            diario como a emprendedores, comercios y negocios que buscan un
            proveedor confiable.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-forest-dark">
            Qué vendemos
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {CATEGORIES.map(({ label, Illustration }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-forest-dark/10 bg-cream p-5 text-center shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage">
                  <Illustration className="h-10 w-10" />
                </span>
                <span className="text-sm font-bold text-forest-dark">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-forest-dark">
            ¿Con quién trabajamos?
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {AUDIENCES.map((audience) => (
              <div
                key={audience.title}
                className="rounded-2xl border border-forest-dark/10 bg-sage p-5"
              >
                <h3 className="font-display text-base font-bold text-forest-dark">
                  {audience.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed font-semibold text-ink/70">
                  {audience.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/catalogo"
            className="rounded-2xl bg-forest-dark px-6 py-3.5 text-sm font-bold text-cream transition-colors hover:bg-forest"
          >
            Ver catálogo
          </Link>
          <Link
            href="/contacto"
            className="rounded-2xl border border-forest-dark/20 bg-cream px-6 py-3.5 text-sm font-bold text-forest-dark transition-colors hover:bg-sage"
          >
            Contactanos
          </Link>
        </div>
      </div>
    </div>
  );
}
