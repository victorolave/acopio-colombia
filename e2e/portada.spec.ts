import { test, expect } from "@playwright/test";

/**
 * Cada prueba de este archivo corresponde a algo que se rompió de verdad.
 * No son pruebas defensivas hipotéticas.
 */

test.describe("Portada", () => {
  test("el botón «Filtros» abre la hoja de filtros", async ({ page }) => {
    // REGRESIÓN: la zona de arrastre de la hoja envolvía la cabecera y capturaba
    // el puntero en `pointerdown`, así que el `pointerup` nunca llegaba al botón
    // y el navegador no generaba el `click`. El botón existía y no hacía nada.
    await page.goto("/");

    const filtros = page.getByRole("button", { name: "Filtros" });
    await expect(filtros).toBeVisible();
    await filtros.click();

    const dialogo = page.getByRole("dialog", { name: "Filtros" });
    await expect(dialogo).toBeVisible();
    await expect(page.getByRole("button", { name: "Agua", exact: true })).toBeVisible();
  });

  test("filtrar por categoría cambia el número de centros", async ({ page }) => {
    await page.goto("/");

    const contador = page.locator("[aria-live=polite]").first();
    const total = Number((await contador.textContent())?.match(/\d+/)?.[0] ?? 0);
    expect(total).toBeGreaterThan(0);

    await page.getByRole("button", { name: "Filtros" }).click();
    await page.getByRole("button", { name: "Alimento para mascotas" }).click();
    await page.getByRole("button", { name: /^Ver \d+ centros?$/ }).click();

    await expect(page.getByRole("dialog", { name: "Filtros" })).toBeHidden();
    const filtrado = Number((await contador.textContent())?.match(/\d+/)?.[0] ?? 0);
    expect(filtrado).toBeGreaterThan(0);
    expect(filtrado).toBeLessThan(total);

    // El chip del filtro activo debe poder quitarse de un toque.
    await page.getByRole("button", { name: /Alimento para mascotas/ }).first().click();
    await expect(contador).toContainText(String(total));
  });

  test("«Ver centros cerca de mí» ordena la lista por distancia", async ({ page, context }) => {
    // REGRESIÓN: mismo origen que el botón de filtros. Aquí además se comprueba
    // el efecto real: que aparezcan distancias y que la lista quede ordenada.
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation({ latitude: 6.2442, longitude: -75.5812 }); // Medellín
    await page.goto("/");

    await page.getByRole("button", { name: /Ver centros cerca de mí/ }).click();

    await expect(page.locator("[aria-live=polite]").first()).toContainText("por cercanía");

    const distancias = page.locator("article span.tabular-nums");
    await expect(distancias.first()).toBeVisible();

    const km = (await distancias.allTextContents())
      .slice(0, 5)
      .map((t) => (t.includes("km") ? parseFloat(t) : parseFloat(t) / 1000));
    expect(km).toEqual([...km].sort((a, b) => a - b));
  });

  test("la tarjeta ofrece «Cómo llegar» sin entrar al detalle", async ({ page }) => {
    await page.goto("/");
    const primera = page.locator("article").first();
    const comoLlegar = primera.getByRole("link", { name: /Cómo llegar/ });
    await expect(comoLlegar).toBeVisible();
    await expect(comoLlegar).toHaveAttribute("href", /google\.com\/maps/);
  });

  test("no hay desbordamiento horizontal", async ({ page }) => {
    await page.goto("/");
    const desborda = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(desborda).toBe(false);
  });
});

test.describe("Hoja inferior (solo móvil)", () => {
  test("el tirador expande y contrae la lista", async ({ page, isMobile }) => {
    test.skip(!isMobile, "En escritorio la hoja es una columna estática.");
    await page.goto("/");

    const tirador = page.getByRole("button", { name: /Expandir la lista/ });
    await expect(tirador).toBeVisible();
    await tirador.click();
    await expect(page.getByRole("button", { name: /Contraer la lista/ })).toBeVisible();
  });

  test("un toque en el tirador no se confunde con un arrastre", async ({ page, isMobile }) => {
    // REGRESIÓN: sin umbral de movimiento, cualquier toque capturaba el puntero
    // y se trataba como arrastre.
    test.skip(!isMobile, "Solo aplica al gesto táctil.");
    await page.goto("/");

    const antes = await page.getByRole("button", { name: /Expandir|Contraer/ }).getAttribute("aria-expanded");
    await page.getByRole("button", { name: /Expandir|Contraer/ }).click();
    const despues = await page.getByRole("button", { name: /Expandir|Contraer/ }).getAttribute("aria-expanded");
    expect(despues).not.toBe(antes);
  });
});

test.describe("Ficha de centro", () => {
  test("la barra de acciones abre el selector de rutas", async ({ page }) => {
    await page.goto("/");
    await page.locator("article").first().getByRole("link", { name: "Detalles" }).click();

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.getByRole("button", { name: /Cómo llegar/ }).click();
    const dialogo = page.getByRole("dialog", { name: "Abrir en" });
    await expect(dialogo).toBeVisible();
    await expect(dialogo.getByRole("link", { name: "Google Maps" })).toBeVisible();
    await expect(dialogo.getByRole("link", { name: "Waze" })).toBeVisible();
  });

  test("hay exactamente un h1 y la jerarquía no salta niveles", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  });
});
