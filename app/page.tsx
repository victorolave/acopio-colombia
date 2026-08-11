import Link from "next/link";
import { CentersExplorer } from "@/components/centers/centers-explorer";
import { getPublicCenters } from "@/lib/centers";

// Los centros cambian durante la emergencia: revalidamos con frecuencia.
export const revalidate = 300;

export default async function HomePage() {
  const centers = await getPublicCenters();

  const verified = centers.filter((c) => c.verification_status === "verified").length;
  const departments = new Set(centers.map((c) => c.department)).size;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <section className="mb-6">
        <h1 className="text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">
          Encuentra dónde llevar ayuda para las comunidades afectadas por el terremoto
        </h1>
        <p className="mt-2 max-w-2xl text-ink-700">
          {centers.length} centros de acopio publicados en {departments}{" "}
          {departments === 1 ? "departamento" : "departamentos"}, {verified} confirmados directamente por
          la entidad responsable. Cada uno indica qué recibe, cuándo se verificó y cuál es la fuente.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/registrar"
            className="rounded-lg border border-ink-300 bg-white px-4 py-2.5 font-medium text-ink-700 transition hover:border-ink-500"
          >
            Registrar centro de acopio
          </Link>
          <Link
            href="/metodologia"
            className="rounded-lg border border-ink-300 bg-white px-4 py-2.5 font-medium text-ink-700 transition hover:border-ink-500"
          >
            Cómo verificamos
          </Link>
        </div>
      </section>

      <CentersExplorer centers={centers} />
    </div>
  );
}
