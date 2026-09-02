"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store/cart";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/sobre-nosotros", label: "Sobre Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const ANNOUNCEMENTS = [
  "Envíos a todo el país",
  "Precios mayoristas a partir de 1 kg",
  "Pedidos por WhatsApp",
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const openCart = useCartStore((state) => state.open);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((index) => (index + 1) % ANNOUNCEMENTS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-forest-dark/10 bg-cream/90 backdrop-blur-sm">
      <div className="flex h-9 items-center justify-center bg-forest-dark px-4 text-center text-xs font-medium text-cream/90">
        {ANNOUNCEMENTS[announcementIndex]}
      </div>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-dark">
            <span className="font-display text-lg font-semibold text-gold">O</span>
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-forest-dark">
            Ocani
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink transition-colors hover:text-forest"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Ver carrito"
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-forest-dark transition-colors hover:bg-sage"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.98-4.766 2.545-7.5H5.106M7.5 14.25 5.106 5.272M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm10.5 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="animate-cart-bump absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-forest-dark"
              >
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-forest-dark hover:bg-sage md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              className="h-5 w-5"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-forest-dark/10 bg-cream px-4 pb-4 pt-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-sage hover:text-forest-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
