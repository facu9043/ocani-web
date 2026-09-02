"use client";

import { useActionState } from "react";
import { createCategory, type CategoryFormState } from "@/lib/actions/categories";

const initialState: CategoryFormState = { error: null };

export default function NewCategoryForm() {
  const [state, formAction, pending] = useActionState(createCategory, initialState);

  return (
    <form action={formAction} className="space-y-2">
      <div className="flex gap-2">
        <input
          name="name"
          type="text"
          required
          placeholder="Nombre de la categoría"
          className="w-full rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-forest focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-forest-dark px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-forest disabled:opacity-60"
        >
          {pending ? "..." : "Agregar"}
        </button>
      </div>
      {state.error && <p className="text-xs font-medium text-rust">{state.error}</p>}
    </form>
  );
}
