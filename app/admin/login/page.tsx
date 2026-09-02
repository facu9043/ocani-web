import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Ingresar al panel" };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sage px-4">
      <div className="w-full max-w-sm rounded-2xl border border-forest-dark/10 bg-cream p-8 shadow-sm">
        <div className="flex justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-dark">
            <span className="font-display text-xl font-semibold text-gold">O</span>
          </span>
        </div>
        <h1 className="mt-4 text-center font-display text-xl font-semibold text-forest-dark">
          Panel de Ocani
        </h1>
        <p className="mt-1 text-center text-sm text-ink/60">
          Ingresá con tu cuenta para administrar el catálogo.
        </p>

        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
