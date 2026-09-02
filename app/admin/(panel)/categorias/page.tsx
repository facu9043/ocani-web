import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase/admin";
import CategoryRow from "@/components/admin/CategoryRow";
import NewCategoryForm from "@/components/admin/NewCategoryForm";

export const metadata: Metadata = { title: "Categorías" };

export default async function AdminCategoriesPage() {
  const { data: categories } = await supabaseAdmin
    .from("categories")
    .select("id, name")
    .order("sort_order");

  const list = categories ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-dark">Categorías</h1>
      <p className="mt-1 text-sm text-ink/60">
        Usá las flechas para reordenar cómo aparecen en el catálogo. Hacé clic en el nombre para
        renombrar.
      </p>

      <div className="mt-6 max-w-lg rounded-2xl border border-forest-dark/10 bg-cream">
        <ul>
          {list.map((category, index) => (
            <CategoryRow
              key={category.id}
              id={category.id}
              name={category.name}
              isFirst={index === 0}
              isLast={index === list.length - 1}
            />
          ))}
        </ul>
        {list.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-ink/60">Todavía no hay categorías.</p>
        )}
      </div>

      <div className="mt-8 max-w-sm">
        <h2 className="font-display text-lg font-semibold text-forest-dark">Nueva categoría</h2>
        <div className="mt-3">
          <NewCategoryForm />
        </div>
      </div>
    </div>
  );
}
