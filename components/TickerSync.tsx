"use client";

import { useEffect } from "react";
import { useTickerStore } from "@/lib/store/ticker";
import type { Product } from "@/lib/data/products";

export default function TickerSync({ products }: { products: Product[] }) {
  const setTickerItems = useTickerStore((state) => state.setItems);

  useEffect(() => {
    const inStock = products.filter((product) => product.inStock);
    const shuffled = [...inStock].sort(() => Math.random() - 0.5);
    setTickerItems(
      shuffled.slice(0, 14).map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    );
  }, [products, setTickerItems]);

  return null;
}
