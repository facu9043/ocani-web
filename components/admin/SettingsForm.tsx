"use client";

import { useActionState } from "react";
import { updateSettings, type SettingsFormState } from "@/lib/actions/settings";

const initialState: SettingsFormState = { error: null };

type Settings = {
  whatsapp_number: string | null;
  business_hours: string | null;
  address: string | null;
  instagram_url: string | null;
  about_text: string | null;
};

export default function SettingsForm({ settings }: { settings: Settings }) {
  const [state, formAction, pending] = useActionState(updateSettings, initialState);

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {state.error && (
        <p className="rounded-lg bg-rust/10 px-3 py-2 text-sm font-medium text-rust">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="rounded-lg bg-forest-light/15 px-3 py-2 text-sm font-medium text-forest-dark">
          Cambios guardados.
        </p>
      )}

      <div>
        <label htmlFor="whatsapp_number" className="text-sm font-medium text-ink/80">
          WhatsApp (con código de país, sin espacios ni +)
        </label>
        <input
          id="whatsapp_number"
          name="whatsapp_number"
          type="text"
          required
          defaultValue={settings.whatsapp_number ?? ""}
          placeholder="543624158218"
          className="mt-1.5 w-full rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-forest focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="business_hours" className="text-sm font-medium text-ink/80">
          Horario de atención
        </label>
        <textarea
          id="business_hours"
          name="business_hours"
          rows={2}
          defaultValue={settings.business_hours ?? ""}
          className="mt-1.5 w-full resize-none rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="address" className="text-sm font-medium text-ink/80">
          Dirección
        </label>
        <input
          id="address"
          name="address"
          type="text"
          defaultValue={settings.address ?? ""}
          className="mt-1.5 w-full rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="instagram_url" className="text-sm font-medium text-ink/80">
          Instagram (URL completa)
        </label>
        <input
          id="instagram_url"
          name="instagram_url"
          type="url"
          defaultValue={settings.instagram_url ?? ""}
          placeholder="https://instagram.com/ocani_mayorista"
          className="mt-1.5 w-full rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-forest focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="about_text" className="text-sm font-medium text-ink/80">
          Texto de &quot;Sobre Nosotros&quot;
        </label>
        <textarea
          id="about_text"
          name="about_text"
          rows={5}
          defaultValue={settings.about_text ?? ""}
          className="mt-1.5 w-full resize-none rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-forest-dark px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
