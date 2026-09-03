"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/supabase/require-user";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { Database } from "@/types/supabase";

export type ProductFormState = { error: string | null };

type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

async function uploadImageIfProvided(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const supabaseAdmin = getSupabaseAdmin();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabaseAdmin.storage.from("productos").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) throw new Error(`No se pudo subir la imagen: ${error.message}`);

  const { data } = supabaseAdmin.storage.from("productos").getPublicUrl(path);
  return data.publicUrl;
}

function parseProductFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const categoryId = String(formData.get("category_id") ?? "");
  const unit = String(formData.get("unit") ?? "").trim();
  const price = Number(formData.get("price"));
  const inStock = formData.get("in_stock") === "on";
  const featured = formData.get("featured") === "on";

  if (!name) throw new Error("El nombre es obligatorio.");
  if (!categoryId) throw new Error("Elegí una categoría.");
  if (!unit) throw new Error("La presentación es obligatoria.");
  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("El precio tiene que ser mayor a 0.");
  }

  return { name, categoryId, unit, price, inStock, featured };
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireUser();
  const supabaseAdmin = getSupabaseAdmin();

  try {
    const fields = parseProductFields(formData);
    const imageUrl = await uploadImageIfProvided(formData.get("image") as File | null);

    const { error } = await supabaseAdmin.from("products").insert({
      name: fields.name,
      category_id: fields.categoryId,
      unit: fields.unit,
      price: fields.price,
      in_stock: fields.inStock,
      featured: fields.featured,
      image_url: imageUrl,
    });

    if (error) throw new Error(error.message);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Error inesperado." };
  }

  revalidatePath("/admin/productos");
  revalidatePath("/catalogo");
  redirect("/admin/productos");
}

export async function updateProduct(
  id: string,
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireUser();
  const supabaseAdmin = getSupabaseAdmin();

  try {
    const fields = parseProductFields(formData);
    const imageUrl = await uploadImageIfProvided(formData.get("image") as File | null);

    const update: ProductUpdate = {
      name: fields.name,
      category_id: fields.categoryId,
      unit: fields.unit,
      price: fields.price,
      in_stock: fields.inStock,
      featured: fields.featured,
    };
    if (imageUrl) update.image_url = imageUrl;

    const { error } = await supabaseAdmin.from("products").update(update).eq("id", id);
    if (error) throw new Error(error.message);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Error inesperado." };
  }

  revalidatePath("/admin/productos");
  revalidatePath("/catalogo");
  redirect("/admin/productos");
}

export async function deleteProduct(id: string) {
  await requireUser();
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/productos");
  revalidatePath("/catalogo");
}
