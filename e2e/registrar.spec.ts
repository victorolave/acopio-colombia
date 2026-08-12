import { test, expect } from "@playwright/test";

/**
 * El buscador de direcciones de /registrar.
 *
 * Existe una regla que estas pruebas protegen por encima de todo: el
 * geocodificador ENCUADRA el mapa, pero NUNCA decide el pin. Si alguna vez se
 * puede enviar el formulario con un punto que puso Nominatim y que nadie
 * revisó, se publica un centro con coordenadas equivocadas durante una
 * emergencia. Ese es el peor modo de fallo del proyecto.
 *
 * La respuesta del servicio se simula: CI no debe depender de Nominatim, que es
 * lento, tiene límite de 1 petición por segundo y cambia sus resultados.
 */

const CAMPOS_MINIMOS = {
  address: "Carrera 52 #30A-97",
  municipality: "Medellín",
  department: "Antioquia",
};

/** Respuesta típica: Nominatim no resolvió la dirección y devolvió el municipio. */
const RESPUESTA_MUNICIPIO = {
  found: true,
  latitude: 6.269732,
  longitude: -75.60256,
  displayName: "Medellín, Valle de Aburrá, Antioquia, Colombia",
  precision: "municipality",
};

/**
 * El aviso de error del formulario. Se acota al `form` a propósito: Next monta
 * su propio anunciador de rutas con `role="alert"`, así que buscar el rol suelto
 * devuelve dos elementos.
 */
function alertaDelFormulario(page: import("@playwright/test").Page) {
  return page.locator("form p[role=alert]");
}

async function llenarUbicacion(page: import("@playwright/test").Page) {
  await page.getByLabel("Dirección *").fill(CAMPOS_MINIMOS.address);
  await page.getByLabel("Municipio *").fill(CAMPOS_MINIMOS.municipality);
  await page.getByLabel("Departamento *").selectOption(CAMPOS_MINIMOS.department);
}

test.describe("Buscador de direcciones", () => {
  test("el botón «Ubicar dirección» responde al toque y exige los tres campos", async ({ page }) => {
    // Un botón que existe en el DOM no es un botón que funciona: el rediseño
    // móvil ya salió una vez con botones que el dedo no alcanzaba.
    await page.goto("/registrar");

    const boton = page.getByRole("button", { name: "Ubicar dirección en el mapa" });
    await expect(boton).toBeVisible();
    await boton.click();

    await expect(
      page.getByText("Escribe la dirección, el municipio y el departamento antes de buscar."),
    ).toBeVisible();
  });

  test("muestra lo que el buscador entendió, sin fingir precisión", async ({ page }) => {
    // Mostrar el texto crudo de Nominatim es el mecanismo de honestidad: la
    // persona ve al instante que le resolvieron la ciudad y no su cuadra.
    await page.route("**/api/geocode", (route) =>
      route.fulfill({ json: RESPUESTA_MUNICIPIO }),
    );

    await page.goto("/registrar");
    await llenarUbicacion(page);
    await page.getByRole("button", { name: "Ubicar dirección en el mapa" }).click();

    await expect(page.getByText(/El buscador entendió/)).toContainText("Valle de Aburrá");
    await expect(page.getByText(/Solo pudimos ubicar el municipio/)).toBeVisible();
  });

  test("no deja enviar con un pin que puso el buscador y nadie confirmó", async ({ page }) => {
    await page.route("**/api/geocode", (route) =>
      route.fulfill({ json: RESPUESTA_MUNICIPIO }),
    );

    await page.goto("/registrar");
    await llenarUbicacion(page);
    await page.getByRole("button", { name: "Ubicar dirección en el mapa" }).click();

    const confirmacion = page.getByLabel(/Revisé el mapa y el pin está sobre la entrada/);
    await expect(confirmacion).toBeVisible();
    await expect(confirmacion).not.toBeChecked();

    await page.getByRole("button", { name: "Enviar para revisión" }).click();
    await expect(alertaDelFormulario(page)).toContainText("El pin lo puso el buscador automático");

    // Al confirmar, el bloqueo cede y la validación avanza al siguiente campo.
    await confirmacion.check();
    await page.getByRole("button", { name: "Enviar para revisión" }).click();
    await expect(alertaDelFormulario(page)).toContainText("Indica al menos qué recibe el centro.");
  });

  test("exige al menos una prueba, y con el contacto del centro basta", async ({ page }) => {
    /**
     * La regla central del formulario: ya NO se exige un enlace oficial, pero
     * tampoco se admite un envío sin nada con qué comprobarlo. Si esta prueba
     * cae del lado permisivo, entra ruido imposible de moderar; si cae del lado
     * estricto, volvemos a dejar fuera a quien ve el acopio con sus propios ojos.
     */
    await page.route("**/api/geocode", (route) => route.fulfill({ json: RESPUESTA_MUNICIPIO }));

    await page.goto("/registrar");
    await llenarUbicacion(page);
    await page.getByRole("button", { name: "Ubicar dirección en el mapa" }).click();
    await page.getByLabel(/Revisé el mapa y el pin está sobre la entrada/).check();
    await page.getByRole("button", { name: "Agua", exact: true }).click();

    await expect(page.getByText("Falta la prueba:")).toBeVisible();
    await page.getByRole("button", { name: "Enviar para revisión" }).click();
    await expect(alertaDelFormulario(page)).toContainText(
      "Necesitamos al menos una forma de comprobar el centro",
    );

    // Un teléfono del centro es prueba suficiente: se confirma con una llamada.
    await page.getByLabel("Teléfono").fill("604 385 5555");
    await expect(page.getByText(/con el contacto podemos confirmarlo/)).toBeVisible();

    await page.route("**/api/submissions", (route) => route.fulfill({ json: { ok: true } }));
    await page.getByRole("button", { name: "Enviar para revisión" }).click();

    await expect(page.getByRole("heading", { name: "Gracias." })).toBeVisible();
    // Y se invita a seguir aportando, que es el punto de todo el cambio.
    await expect(page.getByRole("button", { name: "Registrar otro centro" })).toBeVisible();
  });

  test("cuando el buscador no encuentra nada, invita a marcar el punto a mano", async ({ page }) => {
    await page.route("**/api/geocode", (route) => route.fulfill({ json: { found: false } }));

    await page.goto("/registrar");
    await llenarUbicacion(page);
    await page.getByRole("button", { name: "Ubicar dirección en el mapa" }).click();

    await expect(page.getByText("No encontramos esa dirección. Marca el punto tocando el mapa.")).toBeVisible();
    // Sin punto no hay envío posible.
    await page.getByRole("button", { name: "Enviar para revisión" }).click();
    await expect(alertaDelFormulario(page)).toContainText("Marca la ubicación del centro en el mapa.");
  });
});
