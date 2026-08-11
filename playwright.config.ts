import { defineConfig, devices } from "@playwright/test";

/**
 * Pruebas de interacción real en un navegador.
 *
 * Existen por una razón concreta: el rediseño móvil salió con los botones de
 * «Ver centros cerca de mí» y «Filtros» muertos. El typecheck pasaba, el build
 * pasaba, el HTML era correcto y las rutas devolvían 200. Nada de eso podía
 * detectarlo, porque el fallo era que un manejador de gestos se interponía
 * entre el dedo y el botón e impedía que se generara el `click`.
 *
 * Un botón que existe en el DOM no es un botón que funciona.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "list" : "line",
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3400",
    trace: "on-first-retry",
  },
  projects: [
    // El proyecto es mobile-first: el teléfono va primero y no es opcional.
    // Se usa el viewport y el modo táctil del iPhone 13 pero sobre Chromium, para
    // no arrastrar un segundo navegador a CI. Lo que se prueba aquí es la
    // interacción táctil y el tamaño de pantalla, no el motor de render.
    {
      name: "movil",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium", browserName: "chromium" },
    },
    { name: "escritorio", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "npx next start -p 3400",
        url: "http://localhost:3400",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
