import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Analytics } from "@/components/analytics";
import { VolunteerLink } from "@/components/volunteer-callout";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Centros de Acopio Colombia | Ayuda terremoto 2026",
    template: "%s | Acopio Colombia",
  },
  description:
    "Encuentra centros de acopio cercanos y conoce qué donaciones necesitan las comunidades afectadas por el terremoto del 10 de agosto de 2026.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Acopio Colombia",
    title: "Centros de Acopio Colombia | Ayuda terremoto 2026",
    description:
      "Encuentra centros de acopio cercanos y conoce qué donaciones necesitan las comunidades afectadas.",
  },
  twitter: {
    card: "summary",
    title: "Centros de Acopio Colombia | Ayuda terremoto 2026",
    description: "Encuentra dónde llevar ayuda para las comunidades afectadas por el terremoto.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0e5c4a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO">
      <body className="min-h-dvh flex flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-brand-700 focus:shadow"
        >
          Saltar al contenido
        </a>

        <header className="sticky top-0 z-40 h-14 shrink-0 border-b border-ink-100 bg-white">
          {/* A ancho completo en escritorio para alinearse con la portada, que
              ahí es una app de mapa a pantalla completa. Con la cabecera centrada
              a 1152 px, en un monitor de 1920 el logo flotaba a 384 px del borde
              mientras el mapa empezaba a 24: parecían dos páginas distintas. */}
          <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 lg:max-w-none lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold text-ink-900">
              <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-sm text-white"
              >
                AC
              </span>
              <span>Acopio Colombia</span>
            </Link>
            <nav aria-label="Principal" className="flex items-center gap-1 text-sm">
              <Link
                href="/registrar"
                className="inline-flex min-h-11 items-center rounded-lg px-3 font-medium text-ink-700 hover:bg-ink-50"
              >
                Registrar<span className="hidden sm:inline">&nbsp;centro</span>
              </Link>
              <Link
                href="/metodologia"
                className="hidden min-h-11 items-center rounded-lg px-3 font-medium text-ink-700 hover:bg-ink-50 sm:inline-flex"
              >
                Metodología
              </Link>
            </nav>
          </div>
        </header>

        <main id="contenido" className="flex-1">
          {children}
        </main>

        {/* En las pantallas que ocupan todo el alto (la portada con mapa) el pie no
            es alcanzable en ningún tamaño, así que se oculta ahí y su aviso se
            muestra dentro del panel de la lista. En el resto de páginas se
            comporta normal. */}
        <footer className="mt-8 border-t border-ink-100 bg-white [body:has([data-fullscreen])_&]:hidden">
          <div className="mx-auto max-w-6xl space-y-3 px-4 py-8 text-sm text-ink-500">
            <p className="rounded-lg bg-caution-50 px-3 py-2 text-caution-700">
              La información puede cambiar rápidamente durante la emergencia. Revisa la fecha de última
              actualización antes de desplazarte.
            </p>
            <p className="font-medium text-ink-700">Proyecto ciudadano independiente.</p>
            <p>
              Información recopilada de fuentes oficiales y organizaciones humanitarias. Este sitio no
              representa a ninguna entidad gubernamental.
            </p>
            <nav aria-label="Pie de página" className="flex flex-wrap gap-x-4 gap-y-1">
              <Link href="/metodologia" className="underline underline-offset-2 hover:text-ink-700">
                Cómo verificamos
              </Link>
              <Link href="/registrar" className="underline underline-offset-2 hover:text-ink-700">
                Registrar un centro
              </Link>
              <VolunteerLink className="underline underline-offset-2 hover:text-ink-700" />
            </nav>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  );
}
