import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/format";
import { deleteProduct } from "@/lib/actions/products";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata: Metadata = { title: "Productos" };

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;

  const [{ data: categories }, productsQuery] = await Promise.all([
    supabaseAdmin.from("categories").select("id, name").order("sort_order"),
    (() => {
      let query = supabaseAdmin
        .from("products")
        .select("id, name, unit, price, in_stock, featured, image_url, category_id")
        .order("name");
      if (category) query = query.eq("category_id", category);
      if (q) query = query.ilike("name", `%${q}%`);
      return query;
    })(),
  ]);

  const { data: products, error } = productsQuery;
  const categoryNameById = new Map((categories ?? []).map((c) => [c.id, c.name]));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-forest-dark">Productos</h1>
          <p className="mt-1 text-sm text-ink/60">{products?.length ?? 0} productos</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="rounded-xl bg-forest-dark px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-forest"
        >
          + Nuevo producto
        </Link>
      </div>

      <form className="mt-6 flex flex-col gap-3 sm:flex-row" method="get">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Buscar por nombre..."
          className="w-full rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-ink focus:border-forest focus:outline-none sm:max-w-sm"
        />
        <select
          name="category"
          defaultValue={category ?? ""}
          className="rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-forest-dark focus:border-forest focus:outline-none"
        >
          <option value="">Todas las categorías</option>
          {(categories ?? []).map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-xl border border-forest-dark/20 bg-cream px-5 py-2.5 text-sm font-semibold text-forest-dark transition-colors hover:bg-sage"
        >
          Filtrar
        </button>
      </form>

      {error && <p className="mt-6 text-sm text-rust">No se pudieron cargar los productos.</p>}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-forest-dark/10 bg-cream">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-forest-dark/10 text-xs text-ink/60 uppercase">
              <th className="px-4 py-3 font-semibold">Producto</th>
              <th className="px-4 py-3 font-semibold">Categoría</th>
              <th className="px-4 py-3 font-semibold">Presentación</th>
              <th className="px-4 py-3 font-semibold">Precio</th>
              <th className="px-4 py-3 font-semibold">Stock</th>
              <th className="px-4 py-3 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((product) => (
              <tr key={product.id} className="border-b border-forest-dark/5 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-sage">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-xs text-forest/50">–</span>
                      )}
                    </span>
                    <span className="font-medium text-forest-dark">
                      {product.name}
                      {product.featured && (
                        <span className="ml-2 rounded-full bg-gold/30 px-2 py-0.5 text-[10px] font-semibold text-forest-dark">
                          Destacado
                        </span>
                      )}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink/70">
                  {product.category_id ? (categoryNameById.get(product.category_id) ?? "—") : "—"}
                </td>
                <td className="px-4 py-3 text-ink/70">{product.unit}</td>
                <td className="px-4 py-3 font-semibold text-rust">{formatPrice(product.price)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      product.in_stock
                        ? "bg-forest-light/20 text-forest-dark"
                        : "bg-rust/10 text-rust"
                    }`}
                  >
                    {product.in_stock ? "En stock" : "Sin stock"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/productos/${product.id}`}
                      className="text-xs font-semibold text-forest hover:underline"
                    >
                      Editar
                    </Link>
                    <DeleteButton
                      action={deleteProduct.bind(null, product.id)}
                      confirmText={`¿Borrar "${product.name}"? Esta acción no se puede deshacer.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(products ?? []).length === 0 && (
          <p className="px-4 py-10 text-center text-sm text-ink/60">
            No hay productos que coincidan con esos filtros.
          </p>
        )}
      </div>
    </div>
  );
}
