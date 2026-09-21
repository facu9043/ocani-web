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

const IMAGES = [
  "/backdrop/walnut.webp",
  "/backdrop/oat.webp",
  "/backdrop/peanut.webp",
  "/backdrop/chia.webp",
  "/backdrop/granola.webp",
  "/backdrop/almond.webp",
  "/backdrop/chestnut.webp",
];

const SIZES = [90, 70, 56, 82, 64, 48, 76];
const INSETS = [1, 5, 9, 3, 7, 2, 10, 4];

// Posiciones relativas al alto total de la página del catálogo (no del
// viewport) para que se distribuyan a lo largo de todo el scroll y también
// asomen entre los márgenes y huecos del grid de productos, no solo arriba.
// Generado en vez de escrito a mano para poder tener muchos más sin que el
// archivo se vuelva una lista interminable de números repetidos.
const ITEM_COUNT = 26;

const ITEMS: Item[] = Array.from({ length: ITEM_COUNT }, (_, index) => {
  const onLeft = index % 2 === 0;
  const inset = INSETS[index % INSETS.length];
  return {
    src: IMAGES[index % IMAGES.length],
    alt: "",
    top: `${Math.round((index / ITEM_COUNT) * 100)}%`,
    left: onLeft ? `${inset}%` : `${100 - inset}%`,
    size: SIZES[index % SIZES.length],
    rotate: (index % 2 === 0 ? -1 : 1) * (6 + ((index * 7) % 14)),
    duration: 6 + ((index * 3) % 7) * 0.5,
    delay: (index % 8) * 0.2,
  };
});

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
