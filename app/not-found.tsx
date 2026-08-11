import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-ink-900">No encontramos esta página</h1>
      <p className="mt-2 text-ink-700">
        El centro pudo haber sido retirado, marcado como inactivo o la dirección cambió.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-brand-600 px-4 py-3 font-semibold text-white"
      >
        Ver todos los centros
      </Link>
    </div>
  );
}
