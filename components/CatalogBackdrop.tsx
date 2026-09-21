import type { CSSProperties } from "react";

type Item = {
  src: string;
  alt: string;
  top: string;
  left: string;
  size: number;
  rotate: number;
  duration: number;
  delay: number;
};

// Posiciones relativas al viewport (no al alto total de la página, que con
// el grid de productos es muy largo) — así quedan siempre visibles como
// ambientación en los márgenes, sin competir con las tarjetas del catálogo.
const ITEMS: Item[] = [
  { src: "/backdrop/walnut.webp", alt: "", top: "8%", left: "2%", size: 92, rotate: -10, duration: 7, delay: 0 },
  { src: "/backdrop/oat.webp", alt: "", top: "32%", left: "1%", size: 88, rotate: -6, duration: 8.5, delay: 0.8 },
  { src: "/backdrop/peanut.webp", alt: "", top: "58%", left: "3%", size: 78, rotate: 8, duration: 6.5, delay: 0.4 },
  { src: "/backdrop/chia.webp", alt: "", top: "82%", left: "2%", size: 52, rotate: 0, duration: 9, delay: 1.2 },
  { src: "/backdrop/granola.webp", alt: "", top: "14%", left: "92%", size: 90, rotate: 10, duration: 7.5, delay: 0.6 },
  { src: "/backdrop/almond.webp", alt: "", top: "40%", left: "94%", size: 70, rotate: -10, duration: 8, delay: 1 },
  { src: "/backdrop/chestnut.webp", alt: "", top: "66%", left: "93%", size: 66, rotate: 0, duration: 6, delay: 0.2 },
  { src: "/backdrop/walnut.webp", alt: "", top: "88%", left: "91%", size: 78, rotate: 14, duration: 7.8, delay: 1.4 },
];

export default function CatalogBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {ITEMS.map(({ src, alt, top, left, size, rotate, duration, delay }, index) => {
        const style: CSSProperties = {
          position: "absolute",
          top,
          left,
          width: size,
          height: size,
          animationDelay: `${delay}s`,
          "--float-rotate": `${rotate}deg`,
          "--float-duration": `${duration}s`,
        } as CSSProperties;
        return (
          // eslint-disable-next-line @next/next/no-img-element -- fixed-position decorative sprite, not content
          <img
            key={index}
            src={src}
            alt={alt}
            width={size}
            height={size}
            className="food-icon rounded-full opacity-40 mix-blend-multiply"
            style={style}
          />
        );
      })}
    </div>
  );
}
