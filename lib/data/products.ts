// Catálogo real de Ocani, usado como fuente de datos para scripts/seed.ts.
// La página de catálogo ya no lee de acá: consume Supabase (ver lib/supabase/catalog.ts).
// Este archivo sigue siendo la fuente de verdad para volver a correr `npm run seed`.

export type Product = {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  inStock: boolean;
  imageUrl: string | null;
};

export const CATEGORIES = [
  "Cereales",
  "Frutos Secos",
  "Mix Frutos Secos",
  "Aceites",
  "Repostería",
  "Harinas",
  "Suplementos",
  "Granolas",
  "Sal",
  "Miel",
  "Condimentos",
  "Semillas",
  "Sin TACC",
  "Legumbres",
  "Snacks",
] as const;

const RAW_PRODUCTS: Omit<Product, "id" | "imageUrl">[] = [
  { category: "Cereales", name: "Almohaditas de Avellana (Lasfor)", unit: "Bulto 2.5kg", price: 19000, inStock: true },
  { category: "Cereales", name: "Almohaditas de Limón (Lasfor)", unit: "Bulto 2.5kg", price: 19000, inStock: true },
  { category: "Cereales", name: "Almohaditas de Frutilla (Lasfor)", unit: "Bulto 2.5kg", price: 19000, inStock: true },
  { category: "Cereales", name: "Aritos Frutales (Lasfor)", unit: "Bulto 2kg", price: 14000, inStock: true },
  { category: "Cereales", name: "Aritos de Avena y Miel (Lasfor)", unit: "Bulto 2kg", price: 14000, inStock: false },
  { category: "Cereales", name: "Copos con Azúcar (Granix)", unit: "Bulto 3kg", price: 16000, inStock: false },
  { category: "Cereales", name: "Copos sin Azúcar (Granix)", unit: "Bulto 3kg", price: 16000, inStock: true },

  { category: "Frutos Secos", name: "Almendras Grandes", unit: "1 kg", price: 22500, inStock: true },
  { category: "Frutos Secos", name: "Almendra Guara Ramillada", unit: "1 kg", price: 18000, inStock: true },
  { category: "Frutos Secos", name: "Ciruelas Disecadas", unit: "1 kg", price: 7000, inStock: true },
  { category: "Frutos Secos", name: "Dátiles (Egipto)", unit: "1 kg", price: 6500, inStock: true },
  { category: "Frutos Secos", name: "Nueces Mariposa", unit: "1 kg", price: 21000, inStock: true },
  { category: "Frutos Secos", name: "Castañas de Cajú", unit: "1 kg", price: 14000, inStock: true },
  { category: "Frutos Secos", name: "Pasas Rubias", unit: "1 kg", price: 6200, inStock: true },
  { category: "Frutos Secos", name: "Pasas Morochas", unit: "1 kg", price: 4800, inStock: true },
  { category: "Frutos Secos", name: "Chip de Banana", unit: "1 kg", price: 12500, inStock: true },

  { category: "Mix Frutos Secos", name: "Mix Tropical Europeo", unit: "1 kg", price: 8500, inStock: true },
  { category: "Mix Frutos Secos", name: "Mix Europeo", unit: "1 kg", price: 8500, inStock: true },

  { category: "Aceites", name: "Aceite de Coco Neutro (Entrenut)", unit: "200cc", price: 4500, inStock: true },
  { category: "Aceites", name: "Aceite de Coco Neutro (Entrenut)", unit: "360cc", price: 6700, inStock: true },
  { category: "Aceites", name: "Aceite de Girasol (Crisol)", unit: "10 lts", price: 31000, inStock: true },
  { category: "Aceites", name: "Aceite de Oliva (Crisol)", unit: "3 lts", price: 26000, inStock: true },

  { category: "Repostería", name: "Canela en Polvo", unit: "1 kg", price: 9900, inStock: true },
  { category: "Repostería", name: "Cacao Amargo 100% Puro", unit: "1 kg", price: 16500, inStock: true },
  { category: "Repostería", name: "Polvo de Hornear", unit: "1 kg", price: 5000, inStock: true },
  { category: "Repostería", name: "Bicarbonato de Sodio", unit: "1 kg", price: 2500, inStock: true },
  { category: "Repostería", name: "Esencia Pan Dulce", unit: "1 kg", price: 3100, inStock: true },
  { category: "Repostería", name: "Esencia de Vainilla (Conventry)", unit: "125cc", price: 1800, inStock: true },
  { category: "Repostería", name: "Coco Rallado", unit: "1 kg", price: 9100, inStock: true },
  { category: "Repostería", name: "Azúcar Mascabo", unit: "1 kg", price: 4200, inStock: true },
  { category: "Repostería", name: "Azúcar Impalpable", unit: "1 kg", price: 2500, inStock: true },
  { category: "Repostería", name: "Avena Instantánea", unit: "1 kg", price: 2200, inStock: true },
  { category: "Repostería", name: "Avena Tradicional", unit: "1 kg", price: 2200, inStock: true },
  { category: "Repostería", name: "Fécula de Maíz", unit: "1 kg", price: 2300, inStock: true },
  { category: "Repostería", name: "Fécula de Mandioca", unit: "1 kg", price: 2900, inStock: true },
  { category: "Repostería", name: "Papaya en Cubos", unit: "1 kg", price: 8000, inStock: true },
  { category: "Repostería", name: "Frutas Escurridas", unit: "1 kg", price: 3000, inStock: true },
  { category: "Repostería", name: "Gelatina sin Sabor", unit: "1 kg", price: 22000, inStock: true },
  { category: "Repostería", name: "Gotitas de Chocolate (Chocolart)", unit: "1 kg", price: 10500, inStock: true },

  { category: "Harinas", name: "Harina Integral", unit: "1 kg", price: 1300, inStock: true },
  { category: "Harinas", name: "Harina de Arroz Blanco", unit: "1 kg", price: 1800, inStock: true },
  { category: "Harinas", name: "Harina de Almendras c/piel", unit: "1 kg", price: 4500, inStock: true },
  { category: "Harinas", name: "Harina de Almendras sin piel", unit: "1 kg", price: 4500, inStock: true },
  { category: "Harinas", name: "Harina de Garbanzo", unit: "1 kg", price: 1500, inStock: true },
  { category: "Harinas", name: "Harina de Coco", unit: "1 kg", price: 4000, inStock: true },
  { category: "Harinas", name: "Harina de Algarroba", unit: "1 kg", price: 5100, inStock: true },
  { category: "Harinas", name: "Harina de Avena", unit: "1 kg", price: 2500, inStock: true },

  { category: "Suplementos", name: "Maca Negra", unit: "Unidad", price: 2200, inStock: true },
  { category: "Suplementos", name: "Maca Kalpa", unit: "500 gr", price: 2200, inStock: true },
  { category: "Suplementos", name: "Cloruro de Magnesio", unit: "1 kg", price: 6500, inStock: true },
  { category: "Suplementos", name: "Colágeno Hidrolizado", unit: "90 gr", price: 900, inStock: true },

  { category: "Granolas", name: "Granola Mix (girasol, lino, sésamo, avena y miel)", unit: "1 kg", price: 5000, inStock: true },

  { category: "Sal", name: "Sal de Himalaya", unit: "1 kg", price: 2700, inStock: true },
  { category: "Sal", name: "Sal Marina", unit: "1 kg", price: 3700, inStock: true },

  { category: "Miel", name: "Miel Pura (Dulce Luz)", unit: "1/2 kg", price: 4000, inStock: true },

  { category: "Condimentos", name: "Ají Molido", unit: "1 kg", price: 6000, inStock: true },
  { category: "Condimentos", name: "Provenzal", unit: "1 kg", price: 6000, inStock: true },
  { category: "Condimentos", name: "Orégano Nacional", unit: "1 kg", price: 6500, inStock: true },
  { category: "Condimentos", name: "Cúrcuma", unit: "1 kg", price: 5000, inStock: true },
  { category: "Condimentos", name: "Pimentón Ahumado", unit: "1 kg", price: 7400, inStock: true },
  { category: "Condimentos", name: "Pimentón Dulce", unit: "1 kg", price: 6500, inStock: true },
  { category: "Condimentos", name: "Adobo Pizza", unit: "1 kg", price: 6700, inStock: true },
  { category: "Condimentos", name: "Jengibre Molido", unit: "1 kg", price: 6300, inStock: true },
  { category: "Condimentos", name: "Pimienta Negra Molida", unit: "1 kg", price: 12000, inStock: true },
  { category: "Condimentos", name: "Curry Suave (India)", unit: "1 kg", price: 6600, inStock: true },
  { category: "Condimentos", name: "Chimichurri", unit: "1 kg", price: 7300, inStock: true },
  { category: "Condimentos", name: "Comino Molido", unit: "1 kg", price: 6500, inStock: true },
  { category: "Condimentos", name: "Perejil", unit: "1 kg", price: 8500, inStock: true },
  { category: "Condimentos", name: "Ajo en Polvo", unit: "1 kg", price: 6900, inStock: true },
  { category: "Condimentos", name: "Tomillo", unit: "1 kg", price: 12900, inStock: true },

  { category: "Semillas", name: "Semillas de Girasol", unit: "1 kg", price: 3800, inStock: true },
  { category: "Semillas", name: "Mix de Semillas (lino, sésamo, chía, girasol)", unit: "1 kg", price: 5000, inStock: true },
  { category: "Semillas", name: "Semillas de Chía Premium", unit: "1 kg", price: 7000, inStock: true },
  { category: "Semillas", name: "Semilla de Lino Marrón", unit: "1 kg", price: 2800, inStock: true },
  { category: "Semillas", name: "Semilla de Sésamo Integral", unit: "1 kg", price: 2500, inStock: true },

  { category: "Sin TACC", name: "Premezcla Universal (Dicomere)", unit: "450 gr", price: 4000, inStock: true },
  { category: "Sin TACC", name: "Pasta de Maní (Entre Nut)", unit: "370 gr", price: 3000, inStock: true },
  { category: "Sin TACC", name: "Dulce de Leche con Stevia (Kony)", unit: "440 gr", price: 6400, inStock: true },
  { category: "Sin TACC", name: "Stevia Líquida (Kony)", unit: "100 ml", price: 3000, inStock: true },
  { category: "Sin TACC", name: "Stevia Líquida (Kony)", unit: "200 ml", price: 4500, inStock: true },

  { category: "Legumbres", name: "Garbanzos", unit: "1 kg", price: 2000, inStock: true },
  { category: "Legumbres", name: "Lentejas", unit: "1 kg", price: 2800, inStock: true },
  { category: "Legumbres", name: "Maíz Pisingallo", unit: "1 kg", price: 1600, inStock: true },
  { category: "Legumbres", name: "Soja Texturizada Mediana", unit: "1 kg", price: 2300, inStock: true },

  { category: "Snacks", name: "Tutucas", unit: "1 kg", price: 4000, inStock: true },
  { category: "Snacks", name: "Maní Blanched (Maní-Jul)", unit: "1 kg", price: 4200, inStock: true },
  { category: "Snacks", name: "Maní Blanched (Maní-Cab)", unit: "1 kg", price: 4700, inStock: true },
  { category: "Snacks", name: "Maní Crocante Saborizado", unit: "1 kg", price: 4500, inStock: true },
  { category: "Snacks", name: "Maní Picante", unit: "1 kg", price: 4200, inStock: true },
  { category: "Snacks", name: "Maní sin Sal", unit: "1 kg", price: 4200, inStock: true },
  { category: "Snacks", name: "Palito Saborizado", unit: "1 kg", price: 4000, inStock: true },
];

export const PRODUCTS: Product[] = RAW_PRODUCTS.map((product, index) => ({
  id: `p${index + 1}`,
  imageUrl: null,
  ...product,
}));
