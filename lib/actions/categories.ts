"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/supabase/require-user";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { slugify } from "@/lib/slug";
import { SITE_ID } from "@/lib/site";

export type CategoryFormState = { error: string | null };

export async function createCategory(
  _prevState: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  await requireUser();
  const supabaseAdmin = getSupabaseAdmin();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "El nombre es obligatorio." };

  const { data: existing } = await supabaseAdmin
    .from("categories")
    .select("sort_order")
    .eq("site_id", SITE_ID)
    .order("sort_order", { ascending: false })
    .limit(1);
  const nextOrder = (existing?.[0]?.sort_order ?? -1) + 1;

  const { error } = await supabaseAdmin.from("categories").insert({
    site_id: SITE_ID,
    name,
    slug: slugify(name),
    sort_order: nextOrder,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/categorias");
  revalidatePath("/catalogo");
  return { error: null };
}

export async function renameCategory(id: string, name: string) {
  await requireUser();
  const supabaseAdmin = getSupabaseAdmin();
  if (!name.trim()) throw new Error("El nombre es obligatorio.");

  const { error } = await supabaseAdmin
    .from("categories")
    .update({ name: name.trim(), slug: slugify(name) })
    .eq("id", id)
    .eq("site_id", SITE_ID);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/categorias");
  revalidatePath("/catalogo");
}

export async function deleteCategory(id: string) {
  await requireUser();
  const supabaseAdmin = getSupabaseAdmin();

  const { count } = await supabaseAdmin
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("category_id", id)
    .eq("site_id", SITE_ID);

  if (count && count > 0) {
    throw new Error(`No se puede borrar: hay ${count} producto(s) en esta categoría.`);
  }

  const { error } = await supabaseAdmin
    .from("categories")
    .delete()
    .eq("id", id)
    .eq("site_id", SITE_ID);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/categorias");
  revalidatePath("/catalogo");
}

export async function moveCategory(id: string, direction: "up" | "down") {
  await requireUser();
  const supabaseAdmin = getSupabaseAdmin();

  const { data: categories, error } = await supabaseAdmin
    .from("categories")
    .select("id, sort_order")
    .eq("site_id", SITE_ID)
    .order("sort_order");
  if (error) throw new Error(error.message);

  const index = categories.findIndex((category) => category.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= categories.length) return;

  const current = categories[index];
  const swapWith = categories[swapIndex];

  await Promise.all([
    supabaseAdmin.from("categories").update({ sort_order: swapWith.sort_order }).eq("id", current.id),
    supabaseAdmin.from("categories").update({ sort_order: current.sort_order }).eq("id", swapWith.id),
  ]);

  revalidatePath("/admin/categorias");
  revalidatePath("/catalogo");
}
