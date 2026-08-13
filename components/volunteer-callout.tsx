import { staleAfterHours } from "@/lib/format";
import { VOLUNTEER_FORM_URL, isVolunteerFormConfigured } from "@/lib/volunteer";

type Counts = {
  /** Centros publicados cuyo dato ya superó el umbral de frescura. */
  staleCount: number;
  /** Total de centros publicados, para dar la escala del problema. */
  totalCount: number;
};

/**
 * El argumento, sin envoltorio.
 *
 * Vive aparte porque se presenta en dos sitios con marcos distintos —una
 * sección dentro de la metodología y un diálogo lanzado desde el mapa— y el
 * texto tiene que ser LITERALMENTE el mismo en ambos. Si se duplica, un día
 * alguien ajusta uno y el otro se queda contando una versión vieja del trato
 * que le estamos ofreciendo a la gente.
 *
 * EL ORDEN DE LOS BLOQUES ES UN EMBUDO, NO UNA LISTA:
 *
 * 1. POR QUÉ — y con un número, no con un adjetivo. Es la misma regla que
 *    `CoverageNudge`: «necesitamos ayuda» no mueve a nadie; una cifra
 *    comprobable contra las fichas que la persona acaba de ver, sí. Sale del
 *    mismo `freshness()` que pinta los avisos de las tarjetas, así que no puede
 *    desincronizarse del sitio.
 *
 *    OJO CON CÓMO SE PRESENTA LA CIFRA. El trabajo pendiente son los
 *    {totalCount} centros, NO los {staleCount} vencidos. Un centro `verified`
 *    no es un centro que siga abierto: es uno que alguien confirmó en su
 *    momento, y puede haber cerrado esa misma tarde. Encabezar con la cifra de
 *    vencidos haría creer que el resto está resuelto y dejaría sin revisar
 *    justamente los que el sitio presenta con más confianza. Por eso la
 *    frescura entra como PRIORIDAD («por dónde empezar») y no como alcance.
 *
 * 2. CÓMO — las tres vías, explícitas. Desactiva «no sabría hacerlo», que es la
 *    primera objeción y la más silenciosa. Y son tres A PROPÓSITO: mucha gente
 *    no llama por teléfono a desconocidos, y si la única vía que ofreces es
 *    marcar un número acabas de perder a la mitad. Buscar en internet o mirar
 *    las redes de la entidad sirve de verdad: la revalidación del 13 de agosto
 *    encontró así el cierre de Itagüí y el traslado del Banco de Alimentos de
 *    Pereira, sin una sola llamada.
 *
 * 3. CUÁNTO CUESTA — desactiva «no tengo tiempo», que es la segunda objeción.
 *    En una emergencia nadie firma un cheque en blanco de su tiempo. «Con una
 *    ya ayudas» es literalmente cierto: cada comprobación actualiza una ficha.
 *
 * 4. QUÉ PEDIMOS — un correo, y nada más. Es literal: el formulario solo
 *    recoge la dirección para dar de alta a la persona en `admin_users`, y
 *    desde ahí actualiza las fichas ella misma en `/admin`.
 *
 *    Esta frase tiene que seguir a las tres vías, no precederlas. Primero
 *    «puedo hacerlo», después «me cuesta un correo». Y tiene que decir la
 *    verdad sobre el formulario: prometer aquí algo distinto de lo que la
 *    persona encuentra al abrirlo es la forma más rápida de perderla, y de que
 *    no vuelva.
 */
export function VolunteerPitch({ staleCount, totalCount }: Counts) {
  const hours = staleAfterHours();
  const hasGap = staleCount > 0 && totalCount > 0;

  return (
    <>
      <p className="text-ink-700">
        Un acopio puede llenarse, mudarse o cerrar el mismo día, y quien llega con el carro cargado a
        un punto que ya no recibe hizo el viaje para nada. Verificar es simplemente confirmar que
        sigue abierto.
      </p>

      {hasGap && (
        <p className="mt-2 text-ink-700">
          Hay{" "}
          <span className="font-semibold text-ink-900">
            {totalCount} acopios publicados y todos hay que volver a mirarlos
          </span>
          . Que una ficha diga «verificado» solo significa que alguien lo confirmó en su momento: un
          punto puede cerrar el mismo día en que lo verificamos. Los {staleCount} que llevan más de{" "}
          {hours} horas sin revisar son por dónde empezar, no dónde terminar.
        </p>
      )}

      <p className="mt-3 font-semibold text-ink-900">No es difícil, y casi nunca hay que llamar</p>
      <ul className="mt-1.5 space-y-1.5 text-ink-700">
        <li className="flex gap-2">
          <span aria-hidden="true" className="text-brand-600">
            •
          </span>
          <span>
            <span className="font-medium text-ink-900">Una búsqueda en internet.</span> Escribe el
            nombre del acopio y mira si alguien publicó algo después de la fecha que mostramos.
          </span>
        </li>
        <li className="flex gap-2">
          <span aria-hidden="true" className="text-brand-600">
            •
          </span>
          <span>
            <span className="font-medium text-ink-900">Un vistazo a sus redes.</span> La alcaldía o
            la fundación suele avisar ahí de que cierra o se traslada mucho antes que en su web.
          </span>
        </li>
        <li className="flex gap-2">
          <span aria-hidden="true" className="text-brand-600">
            •
          </span>
          <span>
            <span className="font-medium text-ink-900">Una llamada.</span> Si la ficha trae teléfono,
            es la forma más segura: preguntas si siguen recibiendo y ya está.
          </span>
        </li>
      </ul>

      <p className="mt-3 text-ink-700">
        <span className="font-semibold text-ink-900">Solo te pedimos un correo.</span> Con él te
        damos acceso al panel y actualizas las fichas tú mismo: marcar si sigue abierto, si cerró o
        si cambió lo que necesita. Nada de datos personales ni formularios largos.
      </p>

      <p className="mt-3 text-ink-700">
        <span className="font-semibold text-ink-900">No es un trabajo de horas.</span> Es el rato que
        tengas suelto, desde el teléfono y sin moverte de donde estés. Con que compruebes uno solo ya
        ayudas: nadie te va a pedir un turno, un horario ni un mínimo.
      </p>
    </>
  );
}

/**
 * El botón y su letra pequeña.
 *
 * Se separa del texto porque en el diálogo NO puede ir dentro de la zona con
 * scroll: con las tres vías explicadas el contenido pasa de alto de pantalla,
 * y la acción principal de un modal no se busca desplazando. Ahí va anclada al
 * pie, siempre visible. En la página de metodología, en cambio, va a
 * continuación del texto como un párrafo más.
 */
export function VolunteerCta() {
  return (
    <>
      <a
        href={VOLUNTEER_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700 active:bg-brand-700 sm:w-auto sm:justify-start"
      >
        Quiero ayudar a verificar
      </a>

      <p className="mt-2 text-xs text-ink-500">Se abre un formulario externo en otra pestaña.</p>
    </>
  );
}

/**
 * El argumento como sección de página. Se usa en `/metodologia`, justo después
 * de admitir que el dato envejece: ahí la petición se entiende sola.
 *
 * No se muestra si `NEXT_PUBLIC_VOLUNTEER_FORM_URL` no está definida: mejor sin
 * invitación que con un enlace muerto delante de quien se ofreció a ayudar.
 */
export function VolunteerCallout({ staleCount, totalCount }: Counts) {
  if (!isVolunteerFormConfigured) return null;

  return (
    <section
      aria-labelledby="voluntarios-titulo"
      className="mt-8 rounded-xl border border-brand-100 bg-brand-50 p-4"
    >
      <h2 id="voluntarios-titulo" className="mb-2 text-lg font-semibold text-brand-700">
        Nos faltan manos para verificar
      </h2>
      <VolunteerPitch staleCount={staleCount} totalCount={totalCount} />
      <div className="mt-3">
        <VolunteerCta />
      </div>
    </section>
  );
}

/**
 * Versión de una línea, para el pie de página y el final de la lista en móvil.
 */
export function VolunteerLink({ className }: { className?: string }) {
  if (!isVolunteerFormConfigured) return null;

  return (
    <a href={VOLUNTEER_FORM_URL} target="_blank" rel="noopener noreferrer" className={className}>
      Ayúdanos a verificar
    </a>
  );
}
