"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = { error: null };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <p className="rounded-lg bg-rust/10 px-3 py-2 text-sm font-medium text-rust">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink/80">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-1.5 w-full rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium text-ink/80">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-forest-dark px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
