"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/data/products";
import ProductCard from "@/components/ProductCard";
import { useTickerStore } from "@/lib/store/ticker";

type CatalogClientProps = {
  products: Product[];
  categories: string[];
};

type SortOption = "destacado" | "precio-asc" | "precio-desc" | "az" | "za";

const SORT_LABELS: Record<SortOption, string> = {
  destacado: "Destacado",
  "precio-asc": "Precio: menor a mayor",
  "precio-desc": "Precio: mayor a menor",
  az: "Nombre: A-Z",
  za: "Nombre: Z-A",
};

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function sortProducts(products: Product[], sortBy: SortOption) {
  const sorted = [...products];
  switch (sortBy) {
    case "precio-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "precio-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "az":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "es"));
    case "za":
      return sorted.sort((a, b) => b.name.localeCompare(a.name, "es"));
    default:
      return sorted;
  }
}

export default function CatalogClient({ products, categories }: CatalogClientProps) {
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

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | "Todas">("Todas");
  const [selectedUnits, setSelectedUnits] = useState<Set<string>>(new Set());
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [priceMinInput, setPriceMinInput] = useState("");
  const [priceMaxInput, setPriceMaxInput] = useState("");
  const [appliedPrice, setAppliedPrice] = useState<{ min: number | null; max: number | null }>({
    min: null,
    max: null,
  });
  const [sortBy, setSortBy] = useState<SortOption>("destacado");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const product of products) {
      counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
    }
    return counts;
  }, [products]);

  const productsInCategory = useMemo(
    () =>
      selectedCategory === "Todas"
        ? products
        : products.filter((product) => product.category === selectedCategory),
    [products, selectedCategory],
  );

  const unitOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const product of productsInCategory) {
      counts.set(product.unit, (counts.get(product.unit) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0], "es"));
  }, [productsInCategory]);

  const filteredProducts = useMemo(() => {
    const query = normalize(search.trim());

    const filtered = productsInCategory.filter((product) => {
      if (query && !normalize(product.name).includes(query)) return false;
      if (selectedUnits.size > 0 && !selectedUnits.has(product.unit)) return false;
      if (onlyInStock && !product.inStock) return false;
      if (appliedPrice.min !== null && product.price < appliedPrice.min) return false;
      if (appliedPrice.max !== null && product.price > appliedPrice.max) return false;
      return true;
    });

    return sortProducts(filtered, sortBy);
  }, [productsInCategory, search, selectedUnits, onlyInStock, appliedPrice, sortBy]);

  function toggleUnit(unit: string) {
    setSelectedUnits((current) => {
      const next = new Set(current);
      if (next.has(unit)) {
        next.delete(unit);
      } else {
        next.add(unit);
      }
      return next;
    });
  }

  function applyPriceRange() {
    const min = priceMinInput.trim() === "" ? null : Number(priceMinInput);
    const max = priceMaxInput.trim() === "" ? null : Number(priceMaxInput);
    setAppliedPrice({
      min: min !== null && !Number.isNaN(min) ? min : null,
      max: max !== null && !Number.isNaN(max) ? max : null,
    });
  }

  function clearFilters() {
    setSelectedCategory("Todas");
    setSelectedUnits(new Set());
    setOnlyInStock(false);
    setPriceMinInput("");
    setPriceMaxInput("");
    setAppliedPrice({ min: null, max: null });
    setSearch("");
  }

  const hasActiveFilters =
    selectedCategory !== "Todas" ||
    selectedUnits.size > 0 ||
    onlyInStock ||
    appliedPrice.min !== null ||
    appliedPrice.max !== null;

  const filters = (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-base font-semibold text-forest-dark">Categorías</h3>
        <ul className="mt-3 space-y-1">
          <li>
            <button
              type="button"
              onClick={() => setSelectedCategory("Todas")}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors ${
                selectedCategory === "Todas"
                  ? "bg-forest-dark text-cream"
                  : "text-ink/80 hover:bg-sage"
              }`}
            >
              Todas
              <span className="text-xs opacity-70">{products.length}</span>
            </button>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <button
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-forest-dark text-cream"
                    : "text-ink/80 hover:bg-sage"
                }`}
              >
                {category}
                <span className="text-xs opacity-70">{categoryCounts.get(category) ?? 0}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-base font-semibold text-forest-dark">Presentación</h3>
        <ul className="mt-3 space-y-2">
          {unitOptions.map(([unit, count]) => (
            <li key={unit}>
              <label className="flex cursor-pointer items-center justify-between gap-2 text-sm text-ink/80">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedUnits.has(unit)}
                    onChange={() => toggleUnit(unit)}
                    className="h-4 w-4 rounded border-forest-dark/30 text-forest-dark accent-forest-dark"
                  />
                  {unit}
                </span>
                <span className="text-xs opacity-60">({count})</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-base font-semibold text-forest-dark">Precio</h3>
        <div className="mt-3 flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Desde"
            value={priceMinInput}
            onChange={(event) => setPriceMinInput(event.target.value)}
            className="w-full rounded-lg border border-forest-dark/20 bg-cream px-2.5 py-1.5 text-sm text-ink placeholder:text-ink/40 focus:border-forest focus:outline-none"
          />
          <span className="text-ink/40">–</span>
          <input
            type="number"
            min={0}
            placeholder="Hasta"
            value={priceMaxInput}
            onChange={(event) => setPriceMaxInput(event.target.value)}
            className="w-full rounded-lg border border-forest-dark/20 bg-cream px-2.5 py-1.5 text-sm text-ink placeholder:text-ink/40 focus:border-forest focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={applyPriceRange}
          className="mt-2.5 w-full rounded-lg border border-forest-dark/20 bg-sage px-3 py-1.5 text-sm font-semibold text-forest-dark transition-colors hover:bg-forest-dark hover:text-cream"
        >
          Aplicar
        </button>
      </div>

      <div>
        <h3 className="font-display text-base font-semibold text-forest-dark">Disponibilidad</h3>
        <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-ink/80">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(event) => setOnlyInStock(event.target.checked)}
            className="h-4 w-4 rounded border-forest-dark/30 text-forest-dark accent-forest-dark"
          />
          Solo con stock
        </label>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="text-sm font-semibold text-rust hover:underline"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="text-sm text-ink/60">
        <span>Inicio</span> <span className="mx-1">›</span> <span className="text-forest-dark">Catálogo</span>
      </nav>

      <h1 className="mt-3 font-display text-3xl font-semibold text-forest-dark sm:text-4xl">
        Catálogo
      </h1>
      <p className="mt-2 max-w-xl text-ink/70">
        Precios mayoristas a partir de 1 kg por producto o bulto cerrado. Filtrá por
        categoría, presentación o precio para encontrar lo que necesitás.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar producto..."
          className="w-full rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-forest focus:outline-none sm:max-w-sm"
        />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((open) => !open)}
            className="rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm font-semibold text-forest-dark lg:hidden"
          >
            Filtros {hasActiveFilters ? "•" : ""}
          </button>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
            className="rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm font-semibold text-forest-dark focus:border-forest focus:outline-none"
          >
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="mt-6 rounded-2xl border border-forest-dark/10 bg-sage/40 p-5 lg:hidden">
          {filters}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">{filters}</aside>

        <div>
          <p className="mb-4 text-sm text-ink/60">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "producto encontrado" : "productos encontrados"}
          </p>

          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-forest-dark/10 bg-sage/40 p-10 text-center">
              <p className="font-display text-lg font-semibold text-forest-dark">
                No encontramos productos con esos filtros
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-3 text-sm font-semibold text-forest hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
