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
     * La portada NO hace scroll, ni en móvil ni en escritorio: el mapa ocupa el
     * viewport y la lista se desplaza dentro de su propio panel. Es el mismo
     * modelo de cualquier buscador con mapa, y evita que el contenido y el panel
     * compitan por el gesto de scroll.
     *
     * En escritorio esto ANTES no era así: la página crecía con las 118 tarjetas
     * y el mapa se quedaba `sticky`. Con la lista dentro de su propio panel, los
     * filtros y el contador de resultados no se van nunca de la pantalla, que es
     * justo lo que se consulta mientras se recorre la lista.
     */
    <div data-fullscreen className="h-[calc(100dvh-3.5rem)] overflow-hidden">
      <div className="mx-auto flex h-full max-w-6xl flex-col px-4 lg:max-w-none lg:gap-3 lg:px-6 lg:py-4">
        {/* La introducción solo aparece donde sobra espacio. En un teléfono, la
            pregunta «¿dónde dono?» se responde con el mapa, no con un titular.
            En escritorio va en UNA fila y no en bloque: el titular anterior comía
            180 px de alto y empujaba el mapa por debajo de la línea de flote. */}
        {/* Sin CTA propios: la cabecera del sitio ya lleva «Registrar centro» y
            «Metodología» a 50 px de aquí, y `CoverageNudge` repite la invitación a
            registrar dentro de la lista. Tres copias del mismo destino sobre la
            línea de flote son ruido, no insistencia. */}
        <section className="lg:shrink-0">
          <h1 className="sr-only lg:not-sr-only lg:text-xl lg:font-bold lg:leading-tight lg:text-ink-900">
            Encuentra dónde llevar ayuda para las comunidades afectadas por el terremoto
          </h1>
          <p className="hidden text-sm text-ink-700 lg:mt-0.5 lg:block">
            {centers.length} centros de acopio publicados en {departments}{" "}
            {departments === 1 ? "departamento" : "departamentos"}, {verified} confirmados en el
            canal propio de la entidad responsable. Cada uno indica qué recibe, cuándo se verificó y
            cuál es la fuente.
          </p>
        </section>

        <CentersExplorer centers={centers} staleCount={staleCount} />
      </div>
    </div>
  );
}
