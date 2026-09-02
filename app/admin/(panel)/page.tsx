import type { Metadata } from "next";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = { title: "Panel" };

export default async function AdminDashboardPage() {
  const [{ count: totalProducts }, { count: outOfStock }, { count: totalCategories }] =
    await Promise.all([
      supabaseAdmin.from("products").select("id", { count: "exact", head: true }),
      supabaseAdmin
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("in_stock", false),
      supabaseAdmin.from("categories").select("id", { count: "exact", head: true }),
    ]);

  const stats = [
    { label: "Productos", value: totalProducts ?? 0, href: "/admin/productos" },
    { label: "Sin stock", value: outOfStock ?? 0, href: "/admin/productos" },
    { label: "Categorías", value: totalCategories ?? 0, href: "/admin/categorias" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-dark">Resumen</h1>
      <p className="mt-1 text-sm text-ink/60">Estado actual de tu catálogo.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-forest-dark/10 bg-cream p-6 shadow-sm transition-colors hover:bg-sage"
          >
            <p className="text-sm text-ink/60">{stat.label}</p>
            <p className="mt-1 font-display text-3xl font-semibold text-forest-dark">
              {stat.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/productos/nuevo"
          className="rounded-xl bg-forest-dark px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-forest"
        >
          + Nuevo producto
        </Link>
        <Link
          href="/catalogo"
          target="_blank"
          className="rounded-xl border border-forest-dark/20 bg-cream px-5 py-2.5 text-sm font-semibold text-forest-dark transition-colors hover:bg-sage"
        >
          Ver catálogo público
        </Link>
      </div>
    </div>
  );
}
