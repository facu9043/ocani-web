export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Identificador de este emprendimiento dentro de la base de datos compartida
// "tiendas-web" (columna site_id en categories/products, y el id de la fila
// en sites). Cada sitio que corre sobre esa base define su propio valor acá
// vía variable de entorno.
export const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || "ocani";
