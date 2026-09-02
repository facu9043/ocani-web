"use client";

import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/format";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "543624158218";

export default function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const close = useCartStore((state) => state.close);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);

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
        <div className="flex items-center justify-between border-b border-forest-dark/10 px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-forest-dark">Tu carrito</h2>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar carrito"
            className="flex h-9 w-9 items-center justify-center rounded-full text-forest-dark hover:bg-sage"
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

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-8 text-center text-sm text-ink/60">
              Todavía no agregaste productos.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start justify-between gap-3 border-b border-forest-dark/10 pb-4"
                >
                  <div>
                    <p className="font-display text-sm font-semibold text-forest-dark">
                      {item.name}
                    </p>
                    <p className="text-xs text-ink/60">{item.unit}</p>
                    <p className="mt-1 text-sm font-semibold text-rust">
                      {formatPrice(item.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Restar cantidad"
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-forest-dark/20 text-forest-dark hover:bg-sage"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="Sumar cantidad"
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-forest-dark/20 text-forest-dark hover:bg-sage"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-xs font-semibold text-rust hover:underline"
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-forest-dark/10 px-5 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink/70">Total estimado</span>
              <span className="font-display text-lg font-semibold text-forest-dark">
                {formatPrice(total)}
              </span>
            </div>
            <button
              type="button"
              onClick={checkout}
              className="mt-4 w-full rounded-xl bg-forest-dark px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest"
            >
              Finalizar pedido por WhatsApp
            </button>
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
