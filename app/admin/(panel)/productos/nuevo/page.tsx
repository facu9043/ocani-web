import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { createProduct } from "@/lib/actions/products";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "Nuevo producto" };

export default async function NewProductPage() {
  const supabaseAdmin = getSupabaseAdmin();
  const { data: categories } = await supabaseAdmin
    .from("categories")
    .select("id, name")
    .order("sort_order");

  return (
    <div>
      <Link href="/admin/productos" className="text-sm font-semibold text-forest hover:underline">
        ← Volver a productos
      </Link>
      <h1 className="mt-3 font-display text-2xl font-semibold text-forest-dark">
        Nuevo producto
      </h1>

      <div className="mt-6">
        <ProductForm
          action={createProduct}
          categories={categories ?? []}
          submitLabel="Crear producto"
        />
      </div>
    </div>
  );
}
