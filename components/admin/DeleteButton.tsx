"use client";

import { useTransition } from "react";

export default function DeleteButton({
  action,
  confirmText,
  label = "Borrar",
}: {
  action: () => Promise<void>;
  confirmText: string;
  label?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(confirmText)) return;
        startTransition(async () => {
          try {
            await action();
          } catch (error) {
            alert(error instanceof Error ? error.message : "No se pudo completar la acción.");
          }
        });
      }}
      className="text-xs font-semibold text-rust hover:underline disabled:opacity-50"
    >
      {pending ? "Borrando..." : label}
    </button>
  );
}
