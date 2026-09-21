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

// Posiciones relativas al alto total de la página que lo use (no del
// viewport) para que se distribuyan a lo largo de todo el scroll y también
// asomen entre los márgenes y huecos del contenido, no solo arriba.
// Generado en vez de escrito a mano para poder tener muchos sin que el
// archivo se vuelva una lista interminable de números repetidos.
function buildItems(count: number): Item[] {
  return Array.from({ length: count }, (_, index) => {
    const onLeft = index % 2 === 0;
    const inset = INSETS[index % INSETS.length];
    return {
      src: IMAGES[index % IMAGES.length],
      alt: "",
      top: `${Math.round((index / count) * 100)}%`,
      left: onLeft ? `${inset}%` : `${100 - inset}%`,
      size: SIZES[index % SIZES.length],
      rotate: (index % 2 === 0 ? -1 : 1) * (6 + ((index * 7) % 14)),
      duration: 6 + ((index * 3) % 7) * 0.5,
      delay: (index % 8) * 0.2,
    };
  });
}

// `count` se ajusta según qué tan larga es la página que lo usa: el
// catálogo (scroll muy largo, con el grid de productos) necesita muchos más
// para no quedar vacío, mientras que Sobre Nosotros/Contacto son páginas
// cortas donde el mismo número se vería amontonado.
export default function FoodBackdrop({ count = 26 }: { count?: number }) {
  const items = buildItems(count);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {items.map(({ src, alt, top, left, size, rotate, duration, delay }, index) => {
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
