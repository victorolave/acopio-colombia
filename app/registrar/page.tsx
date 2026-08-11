import type { Metadata } from "next";
import { RegisterCenterForm } from "@/components/forms/register-center-form";

export const metadata: Metadata = {
  title: "Registrar centro de acopio",
  description:
    "Registra un centro de acopio activo para la emergencia. Revisamos la fuente antes de publicarlo.",
};

export default function RegistrarPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-2xl font-bold text-ink-900">Registrar centro de acopio</h1>
      <p className="mt-2 text-ink-700">
        No necesitas crear una cuenta. Revisamos la fuente que nos indiques antes de publicar el centro,
        para evitar que circule información incorrecta durante la emergencia.
      </p>

      <div className="mt-6">
        <RegisterCenterForm />
      </div>
    </div>
  );
}
