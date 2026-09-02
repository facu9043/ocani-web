"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/lib/store/cart";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.open);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      unit: product.unit,
      price: product.price,
    });
    openCart();
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-forest-dark/10 bg-cream shadow-sm transition-transform hover:-translate-y-0.5">
      <div className="relative flex aspect-square items-center justify-center bg-sage">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 30vw, 45vw"
            className="object-cover"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-12 w-12 text-forest/70"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21c-4.5-2-8-6-8-10.5A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 8 6.5C20 15 16.5 19 12 21Zm0 0V9"
            />
          </svg>
        )}

        {!product.inStock && (
          <span className="absolute top-3 left-3 rounded-full bg-forest-dark px-2.5 py-1 text-[11px] font-semibold text-cream">
            Sin stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-xs font-semibold tracking-wide text-forest uppercase">
          {product.category}
        </span>
        <h3 className="font-display text-base leading-snug font-semibold text-forest-dark">
          {product.name}
        </h3>
        <span className="text-sm text-ink/60">{product.unit}</span>

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-lg font-semibold text-rust">{formatPrice(product.price)}</span>
        </div>

        <button
          type="button"
          disabled={!product.inStock}
          onClick={handleAdd}
          className="mt-2 rounded-xl bg-forest-dark px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:bg-forest-dark/30 disabled:text-cream/70"
        >
          {!product.inStock ? "Sin stock" : justAdded ? "Agregado ✓" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}
