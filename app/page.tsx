import Link from "next/link";
import Reveal from "@/components/Reveal";

const VALUE_PROPS = [
  {
    title: "Precios mayoristas",
    detail: "Desde 1 kg por producto, o bulto cerrado.",
  },
  {
    title: "Envíos a todo el país",
    detail: "Despachamos a cualquier provincia de Argentina.",
  },
  {
    title: "Pedidos por WhatsApp",
    detail: "Armamos tu pedido y coordinamos el pago sin vueltas.",
  },
];

const FEATURED_PLACEHOLDER = ["Frutos Secos", "Semillas", "Harinas", "Condimentos"];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-sage">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-forest-light/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-forest-dark/5 px-3 py-1 text-xs font-semibold tracking-wide text-forest uppercase">
              Dietética mayorista
            </span>
            <h1 className="mt-5 font-display text-4xl leading-tight font-semibold text-forest-dark sm:text-5xl">
              Frutos secos, semillas, harinas y más — al por mayor
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Trabajamos con revendedores, dietéticas, panaderías y consumidores
              finales. Calidad y variedad, con despacho a todo el país.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/catalogo"
                className="rounded-2xl bg-forest-dark px-6 py-3.5 text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-forest"
              >
                Ver catálogo
              </Link>
              <a
                href="https://wa.me/543624158218"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-forest-dark/20 bg-cream px-6 py-3.5 text-sm font-semibold text-forest-dark transition-colors hover:bg-sage"
              >
                Escribinos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {VALUE_PROPS.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 100}>
              <div className="rounded-2xl border border-forest-dark/10 bg-sage p-6 shadow-sm">
                <h3 className="font-display text-lg font-semibold text-forest-dark">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sage">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-forest-dark sm:text-3xl">
              Categorías destacadas
            </h2>
            <Link
              href="/catalogo"
              className="hidden text-sm font-semibold text-forest hover:text-forest-dark sm:inline-block"
            >
              Ver todo el catálogo →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {FEATURED_PLACEHOLDER.map((category, index) => (
              <Reveal key={category} delayMs={index * 80}>
                <div className="flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl bg-cream p-4 text-center shadow-sm transition-transform hover:-translate-y-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="h-10 w-10 text-forest"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21c-4.5-2-8-6-8-10.5A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 8 6.5C20 15 16.5 19 12 21Zm0 0V9"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-forest-dark">{category}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Link
            href="/catalogo"
            className="mt-8 inline-block text-sm font-semibold text-forest hover:text-forest-dark sm:hidden"
          >
            Ver todo el catálogo →
          </Link>
        </div>
      </section>
    </>
  );
}
