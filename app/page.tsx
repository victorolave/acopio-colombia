import Link from "next/link";
import { CentersExplorer } from "@/components/centers/centers-explorer";
import { getPublicCenters } from "@/lib/centers";
import { isStale } from "@/lib/format";

export const revalidate = 300;

export default async function HomePage() {
  const centers = await getPublicCenters();

  const verified = centers.filter((c) => c.verification_status === "verified").length;
  const departments = new Set(centers.map((c) => c.department)).size;
  // Se calcula aquí, en el servidor, y baja como prop: ver la nota en
  // `CentersExplorer` sobre por qué no puede calcularse en el cliente.
  const staleCount = centers.filter((c) => isStale(c.last_verified_at)).length;

  return (
    /**
     * En móvil la portada NO hace scroll: el mapa ocupa el viewport y la lista
     * vive en la hoja inferior, que es la que se desplaza. Es el mismo modelo de
     * cualquier buscador con mapa, y evita que el contenido y la hoja compitan
     * por el gesto de scroll.
     */
    <div data-fullscreen className="h-[calc(100dvh-3.5rem)] overflow-hidden lg:h-auto lg:overflow-visible">
      <div className="mx-auto max-w-6xl px-4 lg:py-6">
        {/* La introducción solo aparece donde sobra espacio. En un teléfono, la
            pregunta «¿dónde dono?» se responde con el mapa, no con un titular. */}
        <section className="lg:mb-6">
          <h1 className="sr-only lg:not-sr-only lg:text-3xl lg:font-bold lg:leading-tight lg:text-ink-900">
            Encuentra dónde llevar ayuda para las comunidades afectadas por el terremoto
          </h1>
          <p className="mt-2 hidden max-w-2xl text-ink-700 lg:block">
            {centers.length} centros de acopio publicados en {departments}{" "}
            {departments === 1 ? "departamento" : "departamentos"}, {verified} confirmados en el canal
            propio de la entidad responsable. Cada uno indica qué recibe, cuándo se verificó y cuál es
            la fuente.
          </p>
          <div className="mt-4 hidden flex-wrap gap-2 lg:flex">
            <Link
              href="/registrar"
              className="inline-flex min-h-11 items-center rounded-xl border border-ink-300 bg-white px-4 font-medium text-ink-700 transition-colors hover:border-ink-500"
            >
              Registrar centro de acopio
            </Link>
            <Link
              href="/metodologia"
              className="inline-flex min-h-11 items-center rounded-xl border border-ink-300 bg-white px-4 font-medium text-ink-700 transition-colors hover:border-ink-500"
            >
              Cómo verificamos
            </Link>
          </div>
        </section>

        <CentersExplorer centers={centers} staleCount={staleCount} />
      </div>
    </div>
  );
}
