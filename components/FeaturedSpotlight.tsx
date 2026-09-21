"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/lib/store/cart";
import type { Product } from "@/lib/data/products";

export default function FeaturedSpotlight({ products }: { products: Product[] }) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.open);

  const featured = useMemo(
    () => products.filter((product) => product.imageUrl && product.inStock),
    [products],
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (featured.length < 2) return;
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % featured.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [featured.length]);

  if (featured.length === 0) return null;

  const product = featured[index % featured.length];

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      unit: product.unit,
      price: product.price,
    });
    openCart();
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-forest-dark/10 bg-sage">
      <div className="flex items-center gap-4 p-4 sm:p-5">
        <span className="hidden shrink-0 rounded-full bg-forest-dark px-3 py-1.5 text-xs font-semibold tracking-wide text-cream uppercase sm:inline-block">
          Destacados
        </span>

        <div key={product.id} className="animate-spotlight-fade flex min-w-0 flex-1 items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream sm:h-20 sm:w-20">
            <Image
              src={product.imageUrl!}
              alt={product.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="inline-block rounded-full bg-forest-dark px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-cream uppercase sm:hidden">
              Destacados
            </span>
            <p className="mt-1 truncate font-display text-base font-semibold text-forest-dark sm:mt-0 sm:text-lg">
              {product.name}
            </p>
            <p className="text-sm font-semibold text-rust">{formatPrice(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="shrink-0 rounded-xl bg-forest-dark px-4 py-2.5 text-xs font-semibold text-cream transition-colors hover:bg-forest sm:text-sm"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
