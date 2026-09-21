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

// Posiciones relativas al alto total de la página del catálogo (no del
// viewport) para que se distribuyan a lo largo de todo el scroll y también
// asomen entre los márgenes y huecos del grid de productos, no solo arriba.
const ITEMS: Item[] = [
  { src: "/backdrop/walnut.webp", alt: "", top: "1%", left: "1%", size: 88, rotate: -10, duration: 7, delay: 0 },
  { src: "/backdrop/oat.webp", alt: "", top: "8%", left: "93%", size: 82, rotate: -6, duration: 8.5, delay: 0.8 },
  { src: "/backdrop/peanut.webp", alt: "", top: "16%", left: "3%", size: 72, rotate: 8, duration: 6.5, delay: 0.4 },
  { src: "/backdrop/chia.webp", alt: "", top: "23%", left: "90%", size: 50, rotate: 0, duration: 9, delay: 1.2 },
  { src: "/backdrop/granola.webp", alt: "", top: "31%", left: "5%", size: 80, rotate: 10, duration: 7.5, delay: 0.6 },
  { src: "/backdrop/almond.webp", alt: "", top: "38%", left: "92%", size: 66, rotate: -10, duration: 8, delay: 1 },
  { src: "/backdrop/chestnut.webp", alt: "", top: "46%", left: "2%", size: 62, rotate: 0, duration: 6, delay: 0.2 },
  { src: "/backdrop/walnut.webp", alt: "", top: "53%", left: "95%", size: 76, rotate: 14, duration: 7.8, delay: 1.4 },
  { src: "/backdrop/oat.webp", alt: "", top: "61%", left: "6%", size: 68, rotate: 6, duration: 7.2, delay: 0.3 },
  { src: "/backdrop/peanut.webp", alt: "", top: "68%", left: "91%", size: 64, rotate: -8, duration: 8.8, delay: 0.9 },
  { src: "/backdrop/chia.webp", alt: "", top: "76%", left: "4%", size: 46, rotate: 0, duration: 9.5, delay: 1.5 },
  { src: "/backdrop/granola.webp", alt: "", top: "83%", left: "94%", size: 74, rotate: 12, duration: 7, delay: 0.5 },
  { src: "/backdrop/almond.webp", alt: "", top: "90%", left: "8%", size: 58, rotate: -6, duration: 8.3, delay: 1.1 },
  { src: "/backdrop/chestnut.webp", alt: "", top: "96%", left: "92%", size: 56, rotate: 0, duration: 6.4, delay: 0.7 },
];

export default function CatalogBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
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
          // eslint-disable-next-line @next/next/no-img-element -- absolutely-positioned decorative sprite, not content
          <img
            key={index}
            src={src}
            alt={alt}
            width={size}
            height={size}
            className="food-icon rounded-full opacity-70"
            style={style}
          />
        );
      })}
    </div>
  );
}
