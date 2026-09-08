// Crea el bucket de Supabase Storage para las fotos de producto (Fase admin).
// Uso: npx tsx scripts/setup-storage.ts
// Idempotente: si el bucket ya existe, no hace nada.

import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function main() {
  const { error } = await supabase.storage.createBucket("product-images", {
    public: true,
    fileSizeLimit: "5MB",
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"],
  });

  if (error && !error.message.includes("already exists")) {
    throw error;
  }

  console.log("Bucket 'product-images' listo.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
