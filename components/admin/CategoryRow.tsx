"use client";

import { useState, useTransition } from "react";
import { renameCategory, moveCategory, deleteCategory } from "@/lib/actions/categories";
import DeleteButton from "@/components/admin/DeleteButton";

export default function CategoryRow({
  id,
  name,
  isFirst,
  isLast,
}: {
  id: string;
  name: string;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);
  const [pending, startTransition] = useTransition();

  function save() {
    if (!value.trim() || value === name) {
      setEditing(false);
      setValue(name);
      return;
    }
    startTransition(async () => {
      try {
        await renameCategory(id, value);
        setEditing(false);
      } catch (error) {
        alert(error instanceof Error ? error.message : "No se pudo renombrar.");
        setValue(name);
      }
    });
  }

  return (
    <li className="flex items-center justify-between gap-3 border-b border-forest-dark/10 px-4 py-3 last:border-0">
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-0.5">
          <button
            type="button"
            disabled={isFirst || pending}
            onClick={() => startTransition(() => moveCategory(id, "up"))}
            className="text-forest-dark/50 hover:text-forest-dark disabled:opacity-20"
            aria-label="Subir"
          >
            ▲
          </button>
          <button
            type="button"
            disabled={isLast || pending}
            onClick={() => startTransition(() => moveCategory(id, "down"))}
            className="text-forest-dark/50 hover:text-forest-dark disabled:opacity-20"
            aria-label="Bajar"
          >
            ▼
          </button>
        </div>

        {editing ? (
          <input
            autoFocus
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onBlur={save}
            onKeyDown={(event) => event.key === "Enter" && save()}
            className="rounded-lg border border-forest-dark/20 bg-cream px-2.5 py-1.5 text-sm text-ink focus:border-forest focus:outline-none"
          />
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-sm font-medium text-forest-dark hover:underline"
          >
            {name}
          </button>
        )}
      </div>

      <DeleteButton
        action={deleteCategory.bind(null, id)}
        confirmText={`¿Borrar la categoría "${name}"? Solo se puede si no tiene productos.`}
      />
    </li>
  );
}
