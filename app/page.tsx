import Link from "next/link";
import type { SVGProps } from "react";
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

function NutsIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      {/* nuez (dos lóbulos + veta central) */}
      <g transform="translate(30 30) rotate(-10)">
        <path
          d="M-16 -18c8.5 -7 23 -7 31 0c8.5 7 8.5 29 -3.5 36c-5 3 -7.5 3 -12 0c-12 -7 -24 -29 -15.5 -36Z"
          fill="var(--color-forest)"
        />
        <path
          d="M0 -17v34"
          stroke="var(--color-cream)"
          strokeWidth={2.2}
          strokeLinecap="round"
          opacity={0.6}
        />
      </g>
      {/* almendra */}
      <ellipse
        cx={72}
        cy={32}
        rx={13}
        ry={20}
        transform="rotate(22 72 32)"
        fill="var(--color-gold)"
      />
      {/* avellana */}
      <circle cx={72} cy={70} r={16} fill="var(--color-rust)" />
      {/* castaña de cajú */}
      <path
        d="M14 62c5 -13 21 -18 28 -8c6 8 1 20 -10 23c-10 3 -23 -5 -18 -15Z"
        fill="var(--color-forest-light)"
      />
    </svg>
  );
}

function SeedsIllustration(props: SVGProps<SVGSVGElement>) {
  const seeds: Array<[number, number, number, string]> = [
    [38, 58, 3.2, "var(--color-forest-dark)"],
    [46, 53, 3.6, "var(--color-gold)"],
    [55, 57, 3, "var(--color-rust)"],
    [63, 52, 3.4, "var(--color-forest)"],
    [42, 65, 3, "var(--color-rust)"],
    [50, 62, 3.6, "var(--color-forest-dark)"],
    [58, 65, 3, "var(--color-gold)"],
    [30, 40, 2.6, "var(--color-gold)"],
    [70, 36, 2.6, "var(--color-forest)"],
  ];
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      {/* bowl */}
      <path
        d="M22 50c0 15 12.5 27 28 27s28 -12 28 -27Z"
        fill="none"
        stroke="var(--color-forest-dark)"
        strokeWidth={3}
        strokeLinecap="round"
      />
      {seeds.map(([cx, cy, r, fill], index) => (
        <ellipse
          key={index}
          cx={cx}
          cy={cy}
          rx={r}
          ry={r * 0.75}
          fill={fill}
          transform={`rotate(${(index * 37) % 180} ${cx} ${cy})`}
        />
      ))}
    </svg>
  );
}

function FlourIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      {/* montículo de harina */}
      <path
        d="M14 54c3 -11 16 -17 24 -9c4 -8 15 -9 19 -2c8 -5 19 1 17 10Z"
        fill="var(--color-sage)"
        stroke="var(--color-forest-dark)"
        strokeWidth={1.75}
        strokeLinejoin="round"
      />
      {/* vasija de barro */}
      <path
        d="M30 51h30l5 9c3 7 1 17 -8 22c-7 4.5 -17 4.5 -24 0c-9 -5 -11 -15 -8 -22Z"
        fill="var(--color-rust)"
      />
      <path d="M30 51h30" stroke="var(--color-forest-dark)" strokeWidth={2.5} strokeLinecap="round" />
      {/* motas de harina */}
      <circle cx={68} cy={36} r={2.4} fill="var(--color-sage)" />
      <circle cx={78} cy={46} r={1.8} fill="var(--color-sage)" />
      <circle cx={10} cy={46} r={1.8} fill="var(--color-sage)" />
    </svg>
  );
}

function SpicesIllustration(props: SVGProps<SVGSVGElement>) {
  const jars: Array<[number, number, number, string]> = [
    [26, 44, 34, "var(--color-rust)"],
    [44, 34, 44, "var(--color-gold)"],
    [62, 40, 38, "var(--color-forest)"],
    [80, 46, 32, "var(--color-forest-dark)"],
  ];
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      {jars.map(([cx, top, height, fill], index) => (
        <g key={index}>
          <rect x={cx - 7} y={top} width={14} height={height} rx={3} fill={fill} />
          <rect x={cx - 8} y={top - 5} width={16} height={6} rx={2} fill="var(--color-forest-dark)" />
        </g>
      ))}
    </svg>
  );
}

const FEATURED_CATEGORIES = [
  { name: "Frutos Secos", Illustration: NutsIllustration },
  { name: "Semillas", Illustration: SeedsIllustration },
  { name: "Harinas", Illustration: FlourIllustration },
  { name: "Condimentos", Illustration: SpicesIllustration },
];

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
            {FEATURED_CATEGORIES.map(({ name, Illustration }, index) => (
              <Reveal key={name} delayMs={index * 80}>
                <div className="flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl bg-cream p-4 text-center shadow-sm transition-transform hover:-translate-y-0.5">
                  <Illustration className="h-16 w-16" />
                  <span className="text-sm font-semibold text-forest-dark">{name}</span>
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
