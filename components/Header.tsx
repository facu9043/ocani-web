"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useCartStore } from "@/lib/store/cart";
import { useTickerStore } from "@/lib/store/ticker";
import ProductTicker from "@/components/ProductTicker";

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

// Hojas a lo largo de la enredadera: [x, y, rotación, tono]
const VINE_LEAVES = [
  [75, 12, -35, "forest"],
  [225, 52, 35, "gold"],
  [375, 12, -35, "forest"],
  [525, 52, 35, "gold"],
  [675, 12, -35, "forest"],
  [825, 52, 35, "gold"],
  [975, 12, -35, "forest"],
  [1125, 52, 35, "gold"],
] as const;

// Frutitos donde el tallo cruza la línea base, entre hoja y hoja.
const VINE_FRUITS = [150, 450, 750, 1050] as const;

function NavVine() {
  return (
    <svg
      viewBox="0 0 1200 64"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <path
        className="vine-stem text-forest"
        d="M0 32 Q 75 10 150 32 T 300 32 T 450 32 T 600 32 T 750 32 T 900 32 T 1050 32 T 1200 32"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        pathLength={1}
      />
      {VINE_LEAVES.map(([x, y, rotate, tone], index) => (
        <g key={x} transform={`translate(${x} ${y})`}>
          <path
            className={`vine-leaf ${tone === "gold" ? "text-gold" : "text-forest-light"}`}
            style={
              {
                animationDelay: `${1.6 + index * 0.12}s`,
                transformOrigin: "9px 0px",
                "--leaf-rotate": `${rotate}deg`,
              } as CSSProperties
            }
            d="M0 0c3 -9 15 -9 18 0c-3 9 -15 9 -18 0Z"
            fill="currentColor"
          />
        </g>
      ))}
      {VINE_FRUITS.map((x, index) => (
        <g key={`fruit-${x}`} transform={`translate(${x} 32)`}>
          <path
            className="vine-leaf text-rust"
            style={
              {
                animationDelay: `${2.4 + index * 0.15}s`,
                transformOrigin: "0px 4px",
              } as CSSProperties
            }
            d="M-6 1c-1 -5 2 -8 6 -8c4 0 7 3 6 8c-1 6 -5 9 -6 9c-1 0 -5 -3 -6 -9Z"
            fill="currentColor"
          />
          <path
            className="vine-leaf text-forest-dark"
            style={
              {
                animationDelay: `${2.4 + index * 0.15}s`,
                transformOrigin: "0px 4px",
              } as CSSProperties
            }
            d="M0 -7v-3"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
            fill="none"
          />
        </g>
      ))}
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const openCart = useCartStore((state) => state.open);
  const pathname = usePathname();
  const tickerItems = useTickerStore((state) => state.items);
  const showTicker = pathname === "/catalogo" && tickerItems.length > 0;

  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((index) => (index + 1) % ANNOUNCEMENTS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function measure() {
      const nav = navRef.current;
      const activeLink = linkRefs.current.get(pathname);
      if (!nav || !activeLink) {
        setIndicator(null);
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicator({ left: linkRect.left - navRect.left, width: linkRect.width });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-forest-dark/10 bg-cream/90 backdrop-blur-sm">
      {showTicker ? (
        <ProductTicker items={tickerItems} />
      ) : (
        <div className="flex h-9 items-center justify-center bg-forest-dark px-4 text-center text-xs font-medium text-cream/90">
          {ANNOUNCEMENTS[announcementIndex]}
        </div>
      )}
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NavVine />
        <Link
          href="/"
          className="relative z-10 flex items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Ocani"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
            priority
          />
          <span className="font-display text-xl font-semibold tracking-tight text-forest-dark">
            Ocani
          </span>
        </Link>

        <nav ref={navRef} className="relative z-10 hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => {
                if (el) linkRefs.current.set(link.href, el);
                else linkRefs.current.delete(link.href);
              }}
              className={`rounded-md bg-cream/80 px-1 text-sm font-medium transition-colors hover:text-forest ${
                pathname === link.href ? "text-forest-dark" : "text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {indicator && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-1.5 h-[3px] rounded-full bg-gold transition-all duration-300 ease-out"
              style={{ left: indicator.left, width: indicator.width }}
            />
          )}
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          <button
            type="button"
            aria-label="Ver carrito"
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-sage"
          >
            <Image src="/cart-icon.png" alt="" width={26} height={28} className="h-7 w-auto" />
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
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex flex-col rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sage hover:text-forest-dark ${
                  isActive ? "text-forest-dark" : "text-ink"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`mt-1 h-[3px] rounded-full bg-gold transition-all duration-300 ${
                    isActive ? "w-6 opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
