import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { updateProduct } from "@/lib/actions/products";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "Editar producto" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [{ data: categories }, { data: product }] = await Promise.all([
    supabaseAdmin.from("categories").select("id, name").order("sort_order"),
    supabaseAdmin
      .from("products")
      .select("name, category_id, unit, price, in_stock, featured, image_url")
      .eq("id", id)
      .maybeSingle(),
  ]);

  if (!product) notFound();

  return (
    <div>
      <Link href="/admin/productos" className="text-sm font-semibold text-forest hover:underline">
        ← Volver a productos
      </Link>
      <h1 className="mt-3 font-display text-2xl font-semibold text-forest-dark">
        Editar producto
      </h1>

      <div className="mt-6">
        <ProductForm
          action={updateProduct.bind(null, id)}
          categories={categories ?? []}
          product={product}
          submitLabel="Guardar cambios"
        />
      </div>
    </div>
  );
}
