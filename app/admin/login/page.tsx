"use client";

import { useActionState } from "react";
import { signIn, type ActionState } from "../actions";

const initialState: ActionState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <h1 className="text-2xl font-bold text-ink-900">Panel de administración</h1>
      <p className="mt-2 text-sm text-ink-500">Acceso solo para administradores autorizados.</p>

      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink-700">
            Correo
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-lg border border-ink-300 px-3 py-2.5 text-base"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-ink-700">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1 w-full rounded-lg border border-ink-300 px-3 py-2.5 text-base"
          />
        </div>

        {state.error && (
          <p role="alert" className="rounded-lg bg-caution-50 px-3 py-2 text-sm text-caution-700">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-brand-600 px-4 py-3 font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
