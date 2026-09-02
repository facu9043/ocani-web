import { supabase } from "@/lib/supabase/client";
import type { Product } from "@/lib/data/products";

export async function getCatalog(): Promise<{ products: Product[]; categories: string[] }> {
  const [{ data: categoryRows, error: categoriesError }, { data: productRows, error: productsError }] =
    await Promise.all([
      supabase.from("categories").select("id, name, sort_order").order("sort_order"),
      supabase
        .from("products")
        .select("id, name, category_id, unit, price, in_stock")
        .order("name"),
    ]);

  if (categoriesError) throw categoriesError;
  if (productsError) throw productsError;

  const categoryNameById = new Map((categoryRows ?? []).map((category) => [category.id, category.name]));

  const products: Product[] = (productRows ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    category: (row.category_id && categoryNameById.get(row.category_id)) || "Sin categoría",
    unit: row.unit,
    price: Number(row.price),
    inStock: row.in_stock,
  }));

  const categories = (categoryRows ?? []).map((category) => category.name);

  return { products, categories };
}
