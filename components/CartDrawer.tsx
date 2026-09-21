"use client";

import Image from "next/image";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/format";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "543624158218";

function LeafDivider() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center gap-3 text-forest-light/70"
    >
      {Array.from({ length: 7 }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 18 18"
          className={index % 2 === 0 ? "h-3 w-3" : "h-1.5 w-1.5 text-gold/70"}
          fill="currentColor"
        >
          {index % 2 === 0 ? (
            <path d="M9 1c4 3 7 6 7 10a7 7 0 0 1-14 0c0-4 3-7 7-10Z" />
          ) : (
            <circle cx={9} cy={9} r={9} />
          )}
        </svg>
      ))}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29Z" />
    </svg>
  );
}

export default function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const close = useCartStore((state) => state.close);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function checkout() {
    const lines = items.map(
      (item) =>
        `- ${item.name} x${item.quantity} (${item.unit}) — ${formatPrice(item.price * item.quantity)}`,
    );
    const message = [
      "Hola Ocani! 👋 Quiero hacer este pedido:",
      "",
      ...lines,
      "",
      `Total estimado: ${formatPrice(total)}`,
      "",
      "Nombre: ",
      "Localidad/envío: ",
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={close}
        className="absolute inset-0 bg-forest-dark/40"
      />

      <div className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-cream shadow-xl sm:max-w-sm">
        <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest">
              <Image src="/cart-icon.png" alt="" width={26} height={28} className="h-6 w-auto" />
            </span>
            <h2 className="font-display text-xl font-semibold text-forest-dark">Tu carrito</h2>
            {itemCount > 0 && (
              <span className="rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-forest-dark">
                {itemCount} {itemCount === 1 ? "producto" : "productos"}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar carrito"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-forest-dark hover:bg-sage"
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 pb-3">
          <LeafDivider />
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-2">
          {items.length === 0 ? (
            <p className="mt-8 text-center text-sm text-ink/60">
              Todavía no agregaste productos.
            </p>
          ) : (
            <ul className="space-y-3 py-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-2xl border border-forest/25 bg-sage/40 p-3"
                >
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cream">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="h-7 w-7 text-forest/60"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21c-4.5-2-8-6-8-10.5A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 8 6.5C20 15 16.5 19 12 21Zm0 0V9"
                        />
                      </svg>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-semibold text-forest-dark">
                      {item.name}
                    </p>
                    <p className="text-xs text-ink/60">{item.unit}</p>
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-rust">
                        {formatPrice(item.price)}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          aria-label="Restar cantidad"
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-dark text-sm font-semibold text-cream hover:bg-forest"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-sm font-medium text-ink">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Sumar cantidad"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-dark text-sm font-semibold text-cream hover:bg-forest"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label="Quitar producto"
                    className="shrink-0 self-start text-ink/40 hover:text-rust"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-dashed border-forest-dark/20 px-5 pt-4 pb-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink/70">Subtotal</span>
              <span className="font-semibold text-forest-dark">{formatPrice(total)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="text-ink/70">Envío</span>
              <span className="font-semibold text-forest">A coordinar por WhatsApp</span>
            </div>

            <button
              type="button"
              onClick={checkout}
              className="mt-4 flex w-full items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-forest to-forest-light px-5 py-3.5 text-cream shadow-sm transition-opacity hover:opacity-90"
            >
              <span className="font-display text-base font-semibold">
                Total {formatPrice(total)}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-semibold">
                <WhatsAppIcon />
                Finalizar pedido
              </span>
            </button>

            <p className="mt-3 text-center text-xs text-ink/60">
              🚚 Envíos a todo el país · 📦 Precios mayoristas desde 1&nbsp;kg
            </p>

            <button
              type="button"
              onClick={clear}
              className="mt-2 w-full text-xs font-semibold text-ink/50 hover:text-rust"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
