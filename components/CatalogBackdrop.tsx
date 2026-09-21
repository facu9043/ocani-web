import type { CSSProperties, JSX, SVGProps } from "react";

function WalnutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 36" {...props}>
      <path d="M4 8c5 -6 19 -6 24 0c6 7 6 22 -4 28c-5 3 -7 3 -12 0c-10 -6 -14 -21 -8 -28Z" />
    </svg>
  );
}

function OatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 16" {...props}>
      <rect x={1} y={4} width={30} height={8} rx={4} />
    </svg>
  );
}

function PeanutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 34 18" {...props}>
      <ellipse cx={10} cy={9} rx={9} ry={8} />
      <ellipse cx={24} cy={9} rx={9} ry={8} />
    </svg>
  );
}

function AlmondIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 32" {...props}>
      <ellipse cx={10} cy={16} rx={9} ry={15} />
    </svg>
  );
}

function RaisinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" {...props}>
      <ellipse cx={10} cy={10} rx={7} ry={9} />
    </svg>
  );
}

function NutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <circle cx={12} cy={12} r={11} />
    </svg>
  );
}

type Item = {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  top: string;
  left: string;
  size: number;
  rotate: number;
  color: string;
};

// Posiciones relativas al viewport (no al alto total de la página, que con
// el grid de productos es muy largo) — así quedan siempre visibles como
// ambientación en los márgenes, sin competir con las tarjetas del catálogo.
const ITEMS: Item[] = [
  { Icon: WalnutIcon, top: "8%", left: "2%", size: 60, rotate: -15, color: "var(--color-forest)" },
  { Icon: OatIcon, top: "34%", left: "1%", size: 58, rotate: -10, color: "var(--color-gold)" },
  { Icon: PeanutIcon, top: "60%", left: "3%", size: 48, rotate: 8, color: "var(--color-rust)" },
  { Icon: RaisinIcon, top: "84%", left: "2%", size: 26, rotate: 0, color: "var(--color-ink)" },
  { Icon: OatIcon, top: "14%", left: "94%", size: 62, rotate: 12, color: "var(--color-forest-light)" },
  { Icon: AlmondIcon, top: "42%", left: "96%", size: 42, rotate: -12, color: "var(--color-gold)" },
  { Icon: NutIcon, top: "68%", left: "95%", size: 36, rotate: 0, color: "var(--color-rust)" },
  { Icon: WalnutIcon, top: "90%", left: "93%", size: 50, rotate: 18, color: "var(--color-forest)" },
];

export default function CatalogBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {ITEMS.map(({ Icon, top, left, size, rotate, color }, index) => {
        const style: CSSProperties = {
          position: "absolute",
          top,
          left,
          width: size,
          height: size,
          color,
          transform: `rotate(${rotate}deg)`,
        };
        return <Icon key={index} fill="currentColor" className="opacity-[0.22]" style={style} />;
      })}
    </div>
  );
}
