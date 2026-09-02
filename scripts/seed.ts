// Script de seed (Fase 2): carga categorías, productos y la configuración del
// sitio en Supabase a partir de lib/data/products.ts (el catálogo real de Ocani).
// Uso: npm run seed
//
// Requiere NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local.
// Re-ejecutable: vacía la tabla products antes de volver a insertar, así se
// puede correr de nuevo sin duplicar filas.

import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { CATEGORIES, PRODUCTS } from "../lib/data/products";
import { slugify } from "../lib/slug";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function seed() {
  console.log("Insertando categorías...");
  const categoryRows = CATEGORIES.map((name, index) => ({
    name,
    slug: slugify(name),
    sort_order: index,
  }));

  const { data: insertedCategories, error: categoriesError } = await supabase
    .from("categories")
    .upsert(categoryRows, { onConflict: "slug" })
    .select("id, name");

  if (categoriesError) throw categoriesError;

  const categoryIdByName = new Map(
    insertedCategories.map((category) => [category.name, category.id]),
  );

  console.log("Vaciando tabla de productos...");
  const { error: deleteError } = await supabase
    .from("products")
    .delete()
    .not("id", "is", null);
  if (deleteError) throw deleteError;

  console.log("Insertando productos...");
  const productRows = PRODUCTS.map((product) => ({
    name: product.name,
    category_id: categoryIdByName.get(product.category),
    unit: product.unit,
    price: product.price,
    in_stock: product.inStock,
  }));

  const { error: productsError } = await supabase.from("products").insert(productRows);
  if (productsError) throw productsError;

  console.log("Insertando configuración del sitio...");
  const { error: settingsError } = await supabase.from("site_settings").upsert({
    id: 1,
    whatsapp_number: "543624158218",
    business_hours:
      "Lunes a viernes de 9:00 a 13:00 y de 16:00 a 20:00. Sábados de 10:30 a 13:30.",
    address: "Tomás García P 172, Resistencia, Chaco",
    instagram_url: "https://instagram.com/ocani_mayorista",
    about_text:
      "Ocani es una dietética mayorista especializada en frutos secos, semillas, harinas y productos naturales. Trabajamos con revendedores, dietéticas, panaderías y consumidores finales, con despacho a todo el país y foco en calidad y variedad.",
  });
  if (settingsError) throw settingsError;

  console.log(
    `Listo: ${categoryRows.length} categorías, ${productRows.length} productos, configuración del sitio.`,
  );
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
