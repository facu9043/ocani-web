import type { CSSProperties, JSX, SVGProps } from "react";

function WalnutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 36" {...props}>
      <path d="M16 2C24 2 29 9 29 17c0 10-6 17-13 17S3 27 3 17C3 9 8 2 16 2Z" />
      <path
        d="M16 6v24"
        stroke="var(--color-cream)"
        strokeWidth={1.4}
        strokeLinecap="round"
        fill="none"
        opacity={0.55}
      />
    </svg>
  );
}

function OatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 34 16" {...props}>
      <path d="M3 8c0-4 3-6 6-6h16c4 0 6 3 6 6s-2 6-6 6H9c-3 0-6-2-6-6Z" />
    </svg>
  );
}

function PeanutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 34 20" {...props}>
      <path d="M10 2c6-2 9 3 8 6-1 2-3 1-4 0 2 3 3 7 0 9-4 3-11 2-13-3-2-4 1-8 4-9-2-1-2-3 0-4 1-1 3-1 5 1Z" />
      <path d="M17 8c3-3 8-3 11 0s3 8 0 11-8 3-11 0c2-1 3-4 2-6 1-2 0-4-2-5Z" />
    </svg>
  );
}

function AlmondIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 30" {...props}>
      <path d="M10 1c7 7 7 21 0 28-7-7-7-21 0-28Z" />
    </svg>
  );
}

function RaisinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 22" {...props}>
      <path d="M10 1c4 0 7 4 7 10s-3 10-7 10-7-4-7-10 3-10 7-10Z" />
    </svg>
  );
}

function HazelnutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 26" {...props}>
      <path d="M12 1c6 0 11 5 11 12s-5 12-11 12S1 20 1 13 6 1 12 1Z" />
      <path d="M4 6c3-3 13-3 16 0" stroke="var(--color-cream)" strokeWidth={1.4} fill="none" opacity={0.5} />
    </svg>
  );
}

type Item = {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  top: string;
  left: string;
  size: number;
  rotate: number;
  duration: number;
  delay: number;
  color: string;
};

// Posiciones relativas al viewport (no al alto total de la página, que con
// el grid de productos es muy largo) — así quedan siempre visibles como
// ambientación en los márgenes, sin competir con las tarjetas del catálogo.
const ITEMS: Item[] = [
  { Icon: WalnutIcon, top: "8%", left: "2%", size: 62, rotate: -12, duration: 7, delay: 0, color: "var(--color-forest)" },
  { Icon: OatIcon, top: "32%", left: "1%", size: 60, rotate: -8, duration: 8.5, delay: 0.8, color: "var(--color-gold)" },
  { Icon: PeanutIcon, top: "58%", left: "3%", size: 52, rotate: 10, duration: 6.5, delay: 0.4, color: "var(--color-rust)" },
  { Icon: RaisinIcon, top: "82%", left: "2%", size: 28, rotate: 0, duration: 9, delay: 1.2, color: "var(--color-ink)" },
  { Icon: OatIcon, top: "14%", left: "94%", size: 64, rotate: 14, duration: 7.5, delay: 0.6, color: "var(--color-forest-light)" },
  { Icon: AlmondIcon, top: "40%", left: "96%", size: 44, rotate: -14, duration: 8, delay: 1, color: "var(--color-gold)" },
  { Icon: HazelnutIcon, top: "66%", left: "95%", size: 40, rotate: 0, duration: 6, delay: 0.2, color: "var(--color-rust)" },
  { Icon: WalnutIcon, top: "88%", left: "93%", size: 52, rotate: 16, duration: 7.8, delay: 1.4, color: "var(--color-forest)" },
];

export default function CatalogBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {ITEMS.map(({ Icon, top, left, size, rotate, duration, delay, color }, index) => {
        const style: CSSProperties = {
          position: "absolute",
          top,
          left,
          width: size,
          height: size,
          color,
          animationDelay: `${delay}s`,
          "--float-rotate": `${rotate}deg`,
          "--float-duration": `${duration}s`,
        } as CSSProperties;
        return (
          <Icon
            key={index}
            fill="currentColor"
            className="food-icon opacity-[0.22]"
            style={style}
          />
        );
      })}
    </div>
  );
}
