import type { ReactNode } from "react";
import Link from "next/link";
import { requireUser } from "@/lib/supabase/require-user";
import { signOut } from "@/lib/actions/auth";

const NAV = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/productos", label: "Productos" },
  { href: "/admin/categorias", label: "Categorías" },
  { href: "/admin/configuracion", label: "Configuración" },
];

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();

  return (
    <div className="min-h-screen bg-sage">
      <div className="flex flex-col lg:flex-row">
        <aside className="flex flex-col justify-between border-b border-forest-dark/10 bg-forest-dark px-4 py-5 text-cream lg:min-h-screen lg:w-64 lg:border-r lg:border-b-0">
          <div>
            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream">
                <span className="font-display text-base font-semibold text-forest-dark">O</span>
              </span>
              <span className="font-display text-lg font-semibold">Panel Ocani</span>
            </Link>

            <nav className="mt-8 flex flex-row gap-1 overflow-x-auto lg:mt-10 lg:flex-col lg:overflow-visible">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium whitespace-nowrap text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-6 border-t border-cream/15 pt-4">
            <p className="truncate text-xs text-cream/60">{user.email}</p>
            <form action={signOut}>
              <button type="submit" className="mt-2 text-sm font-semibold text-gold hover:underline">
                Cerrar sesión
              </button>
            </form>
            <Link href="/catalogo" className="mt-2 block text-xs text-cream/50 hover:text-cream/80">
              ← Volver al sitio
            </Link>
          </div>
        </aside>

        <main className="flex-1 px-4 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
