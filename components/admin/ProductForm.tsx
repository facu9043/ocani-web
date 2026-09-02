"use client";

import { useActionState } from "react";
import Image from "next/image";
import type { ProductFormState } from "@/lib/actions/products";

type Category = { id: string; name: string };

type ProductFormProps = {
  action: (state: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  categories: Category[];
  product?: {
    name: string;
    category_id: string | null;
    unit: string;
    price: number;
    in_stock: boolean;
    featured: boolean;
    image_url: string | null;
  };
  submitLabel: string;
};

const initialState: ProductFormState = { error: null };

export default function ProductForm({
  action,
  categories,
  product,
  submitLabel,
}: ProductFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {state.error && (
        <p className="rounded-lg bg-rust/10 px-3 py-2 text-sm font-medium text-rust">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink/80">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={product?.name}
          className="mt-1.5 w-full rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category_id" className="text-sm font-medium text-ink/80">
            Categoría
          </label>
          <select
            id="category_id"
            name="category_id"
            required
            defaultValue={product?.category_id ?? ""}
            className="mt-1.5 w-full rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-forest-dark focus:border-forest focus:outline-none"
          >
            <option value="" disabled>
              Elegí una categoría
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="unit" className="text-sm font-medium text-ink/80">
            Presentación
          </label>
          <input
            id="unit"
            name="unit"
            type="text"
            required
            placeholder="Ej: 1 kg, Bulto 2.5kg"
            defaultValue={product?.unit}
            className="mt-1.5 w-full rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-forest focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="price" className="text-sm font-medium text-ink/80">
          Precio (ARS)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="1"
          required
          defaultValue={product?.price}
          className="mt-1.5 w-full max-w-xs rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-ink/80">
          <input
            type="checkbox"
            name="in_stock"
            defaultChecked={product?.in_stock ?? true}
            className="h-4 w-4 rounded border-forest-dark/30 accent-forest-dark"
          />
          En stock
        </label>
        <label className="flex items-center gap-2 text-sm text-ink/80">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured ?? false}
            className="h-4 w-4 rounded border-forest-dark/30 accent-forest-dark"
          />
          Destacado
        </label>
      </div>

      <div>
        <label htmlFor="image" className="text-sm font-medium text-ink/80">
          Foto del producto
        </label>
        {product?.image_url && (
          <div className="relative mt-2 h-24 w-24 overflow-hidden rounded-xl bg-sage">
            <Image src={product.image_url} alt="" fill sizes="96px" className="object-cover" />
          </div>
        )}
        <input
          id="image"
          name="image"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="mt-2 w-full text-sm text-ink/70 file:mr-3 file:rounded-lg file:border-0 file:bg-sage file:px-3 file:py-2 file:text-sm file:font-semibold file:text-forest-dark hover:file:bg-forest-dark hover:file:text-cream"
        />
        <p className="mt-1 text-xs text-ink/50">
          {product
            ? "Opcional: subí una imagen nueva para reemplazar la actual."
            : "Opcional. Si no subís nada, se muestra un ícono genérico."}
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-forest-dark px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}
