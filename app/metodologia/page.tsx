import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Metodología",
  description:
    "Cómo verificamos los centros de acopio publicados en Acopio Colombia y qué significa cada estado de verificación.",
};

const STATUSES = [
  {
    label: "Verificado",
    tone: "text-brand-700",
    text: "Confirmado en el sitio o comunicado propio de la autoridad, el organismo de socorro o la organización responsable.",
  },
  {
    label: "Reportado — confirma antes de ir",
    tone: "text-caution-700",
    text: "Publicado por un medio periodístico confiable que cita a la entidad, pero sin que hayamos localizado la fuente primaria. Se muestra, siempre marcado.",
  },
  {
    label: "Pendiente",
    tone: "text-ink-500",
    text: "Enviado por la comunidad y aún sin revisar. No se publica.",
  },
  {
    label: "En disputa",
    tone: "text-ink-500",
    text: "Existen fuentes contradictorias, o hay duda razonable de que corresponda a esta emergencia. No se publica.",
  },
  {
    label: "Inactivo",
    tone: "text-ink-500",
    text: "Cerró, terminó la campaña o dejó de recibir donaciones. No aparece en los resultados.",
  },
];

export default function MetodologiaPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-ink-900">¿Cómo verificamos los centros?</h1>

      <div className="mt-4 space-y-4 text-ink-700">
        <p>
          Priorizamos información publicada por autoridades, organismos de socorro y organizaciones
          responsables: UNGRD, gobernaciones, alcaldías, Cruz Roja Colombiana, Defensa Civil, bomberos,
          bancos de alimentos y asociaciones del sector salud.
        </p>
        <p>
          No usamos como fuente primaria cadenas de WhatsApp, imágenes sin procedencia, cuentas
          personales ni publicaciones copiadas. Tampoco reutilizamos información de campañas anteriores:
          verificamos explícitamente que cada centro esté habilitado para el terremoto del 10 de agosto
          de 2026.
        </p>
        <p>
          Los centros enviados por la comunidad son revisados antes de publicarse. Nunca aparecen
          automáticamente.
        </p>
      </div>

      <h2 className="mt-8 text-xl font-semibold text-ink-900">Estados de verificación</h2>
      <dl className="mt-3 space-y-3">
        {STATUSES.map((status) => (
          <div key={status.label} className="rounded-xl border border-ink-100 bg-white p-4">
            <dt className={`font-semibold ${status.tone}`}>{status.label}</dt>
            <dd className="mt-1 text-sm text-ink-700">{status.text}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-8 text-xl font-semibold text-ink-900">Sobre los puntos en el mapa</h2>
      <p className="mt-2 text-ink-700">
        La nomenclatura colombiana (carrera, calle, diagonal) no siempre resuelve con exactitud contra
        las bases de datos abiertas de mapas. Cuando el punto es aproximado te lo decimos y te pedimos
        guiarte por la dirección escrita. Preferimos avisarte antes que fingir una precisión que no
        tenemos.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-ink-900">Antes de desplazarte</h2>
      <p className="mt-2 text-ink-700">
        La situación puede cambiar rápidamente. Revisa la fecha de actualización y, cuando exista un
        teléfono, comunícate directamente con el centro. Si encuentras información incorrecta,{" "}
        <Link href="/" className="text-brand-700 underline underline-offset-2">
          repórtala desde la ficha del centro
        </Link>
        .
      </p>

      <h2 className="mt-8 text-xl font-semibold text-ink-900">Privacidad</h2>
      <p className="mt-2 text-ink-700">
        Tu ubicación se usa únicamente en tu dispositivo para ordenar los centros por cercanía y centrar
        el mapa. No la guardamos, no la enviamos a nuestros servidores y no la compartimos con
        herramientas de analítica.
      </p>
      <p className="mt-2 text-ink-700">
        Sí medimos, de forma anónima y sin cookies, cuántas personas visitan cada página y cuántas
        pulsan «Cómo llegar» o «WhatsApp». Nos sirve para saber qué centros está usando la gente
        realmente. No registramos quién eres, ni tu ubicación, ni lo que escribes en el buscador: de
        cada visita solo se envía la ruta de la página, sin la parte que va después del signo de
        interrogación.
      </p>
    </div>
  );
}
