import type { Metadata } from "next";
import Link from "next/link";
import type { SVGProps } from "react";
import { getSiteSettings } from "@/lib/supabase/settings";

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

function NutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      {...props}
    >
      <ellipse cx="12" cy="12.5" rx="5.5" ry="7.5" />
      <path strokeLinecap="round" d="M12 5v15" />
    </svg>
  );
}

function GrainIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      {...props}
    >
      <path strokeLinecap="round" d="M12 21V6" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6c-1.8 0-3.2-1.3-3.5-3 1.8 0 3.2 1.3 3.5 3Zm0 0c1.8 0 3.2-1.3 3.5-3-1.8 0-3.2 1.3-3.5 3Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 11c-1.8 0-3.2-1.3-3.5-3 1.8 0 3.2 1.3 3.5 3Zm0 0c1.8 0 3.2-1.3 3.5-3-1.8 0-3.2 1.3-3.5 3Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16c-1.8 0-3.2-1.3-3.5-3 1.8 0 3.2 1.3 3.5 3Zm0 0c1.8 0 3.2-1.3 3.5-3-1.8 0-3.2 1.3-3.5 3Z"
      />
    </svg>
  );
}

function SeedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21c-4.5-2-8-6-8-10.5A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 8 6.5C20 15 16.5 19 12 21Zm0 0V9"
      />
    </svg>
  );
}

function DropIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3c3 4.2 6 8.2 6 11.5a6 6 0 1 1-12 0C6 11.2 9 7.2 12 3Z"
      />
    </svg>
  );
}

const CATEGORIES = [
  { label: "Frutos Secos", Icon: NutIcon, bg: "bg-cream", tone: "text-forest" },
  { label: "Semillas", Icon: SeedIcon, bg: "bg-gold", tone: "text-forest-dark" },
  { label: "Harinas y Avena", Icon: GrainIcon, bg: "bg-forest-dark", tone: "text-gold" },
  { label: "Condimentos y Aceites", Icon: DropIcon, bg: "bg-cream", tone: "text-rust" },
];

export default async function SobreNosotrosPage() {
  const settings = await getSiteSettings().catch((error) => {
    console.error("[sobre-nosotros] getSiteSettings failed:", error);
    return null;
  });
  const aboutText = settings?.about_text || FALLBACK_ABOUT_TEXT;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <nav className="text-sm text-ink/60">
        <span>Inicio</span> <span className="mx-1">›</span>{" "}
        <span className="text-forest-dark">Sobre Nosotros</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center rounded-full bg-forest-dark/5 px-3 py-1 text-xs font-semibold tracking-wide text-forest uppercase">
            Dietética mayorista
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold text-forest-dark sm:text-4xl">
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
            <NutIcon className="h-9 w-9 text-forest" />
          </div>
          <div className="absolute top-[10%] right-[14%] flex h-16 w-16 items-center justify-center rounded-full bg-forest-dark shadow-sm sm:h-20 sm:w-20">
            <GrainIcon className="h-8 w-8 text-gold" />
          </div>
          <div className="absolute bottom-[12%] left-[28%] flex h-24 w-24 items-center justify-center rounded-full bg-gold shadow-sm sm:h-28 sm:w-28">
            <SeedIcon className="h-10 w-10 text-forest-dark" />
          </div>
          <div className="absolute right-[12%] bottom-[18%] flex h-14 w-14 items-center justify-center rounded-full bg-cream shadow-sm sm:h-16 sm:w-16">
            <DropIcon className="h-6 w-6 text-rust" />
          </div>
          <div className="absolute top-[42%] left-[55%] flex h-12 w-12 items-center justify-center rounded-full bg-forest-light shadow-sm sm:h-14 sm:w-14">
            <SeedIcon className="h-6 w-6 text-cream" />
          </div>
        </div>
      </div>

      <div className="mt-10 max-w-3xl space-y-4 text-ink/70">
        <p>
          Empezamos como una dietética de barrio y hoy despachamos a todo el país,
          siempre con el mismo criterio: buena calidad, buen precio y trato directo.
          Trabajamos con una selección amplia de frutos secos, semillas, harinas,
          avena, condimentos y productos naturales, pensada tanto para quien revende
          como para quien cocina en casa.
        </p>
        <p>
          Pedís por WhatsApp o Instagram, te confirmamos el pedido y lo mandamos a
          donde estés — con envíos a todo el país y precios mayoristas a partir de
          1 kg por producto o bulto cerrado.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl font-semibold text-forest-dark">
          Qué vendemos
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map(({ label, Icon, bg, tone }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-forest-dark/10 bg-cream p-5 text-center"
            >
              <span className={`flex h-14 w-14 items-center justify-center rounded-full ${bg}`}>
                <Icon className={`h-7 w-7 ${tone}`} />
              </span>
              <span className="text-sm font-semibold text-forest-dark">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl font-semibold text-forest-dark">
          ¿Con quién trabajamos?
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {AUDIENCES.map((audience) => (
            <div
              key={audience.title}
              className="rounded-2xl border border-forest-dark/10 bg-sage p-5"
            >
              <h3 className="font-display text-base font-semibold text-forest-dark">
                {audience.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                {audience.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/catalogo"
          className="rounded-2xl bg-forest-dark px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-forest"
        >
          Ver catálogo
        </Link>
        <Link
          href="/contacto"
          className="rounded-2xl border border-forest-dark/20 bg-cream px-6 py-3.5 text-sm font-semibold text-forest-dark transition-colors hover:bg-sage"
        >
          Contactanos
        </Link>
      </div>
    </div>
  );
}
