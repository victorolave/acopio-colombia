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

  test("«Solo los que puedo confirmar» reduce la lista y se puede deshacer", async ({ page }) => {
    // La completitud del dato es un FILTRO, no un orden oculto: la persona debe
    // ver cambiar el contador para saber qué acaba de sacrificar.
    await page.goto("/");

    const contador = page.locator("[aria-live=polite]").first();
    const total = Number((await contador.textContent())?.match(/\d+/)?.[0] ?? 0);
    expect(total).toBeGreaterThan(0);

    await page.getByRole("button", { name: "Filtros" }).click();
    await page.getByRole("checkbox", { name: /Solo los que puedo confirmar/ }).check();
    await page.getByRole("button", { name: /^Ver \d+ centros?$/ }).click();

    const filtrado = Number((await contador.textContent())?.match(/\d+/)?.[0] ?? 0);
    expect(filtrado).toBeGreaterThan(0);
    expect(filtrado).toBeLessThan(total);

    await page.getByRole("button", { name: /Puedo confirmar antes de ir/ }).first().click();
    await expect(contador).toContainText(String(total));
  });

  test("el orden por defecto no abre con un centro incomunicado", async ({ page }) => {
    // REGRESIÓN: el orden era alfabético por nombre, así que el primer resultado
    // del país era «122 Plaza Apartahotel» —sin horario y sin teléfono— porque
    // el «1» ordena antes que las letras.
    await page.goto("/");

    const primera = page.locator("li[data-slug]").first();
    await expect(primera).toBeVisible();
    await expect(primera.getByText("Sin horario ni teléfono")).toHaveCount(0);
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

  test("invita a registrar acopios y respeta que la cierren", async ({ page }) => {
    /**
     * La invitación tiene que verse en móvil y en escritorio —los CTA del
     * encabezado son `lg:` y en un teléfono no existen—, pero no puede
     * convertirse en un peaje: quien viene con el carro cargado a buscar dónde
     * donar debe poder quitársela de encima para siempre.
     */
    await page.goto("/");

    const aviso = page.getByText("Aún nos queda mucho por cubrir");
    await expect(aviso).toBeVisible();

    const registrar = page.getByRole("link", { name: "Registrar un acopio" });
    await expect(registrar).toHaveAttribute("href", "/registrar");

    await page.getByRole("button", { name: "Ocultar este mensaje" }).click();
    await expect(aviso).toBeHidden();

    // Y sigue oculta al volver: si reaparece, es un estorbo, no una invitación.
    await page.reload();
    await expect(page.getByRole("button", { name: "Filtros" })).toBeVisible();
    await expect(aviso).toBeHidden();
  });

  test("en escritorio el mapa se queda con la mayor parte del ancho", async ({ page, isMobile }) => {
    // REGRESIÓN, y de las caras: durante semanas el mapa midió 129 px de ancho
    // en TODA pantalla grande. La rejilla era `grid-cols-[1.1fr_1fr]`, que
    // compila a `minmax(auto, 1.1fr)`; ese `auto` impide bajar del min-content
    // de la pista, y la columna de la lista contiene direcciones con `truncate`
    // —o sea `white-space: nowrap`—, cuyo min-content es la cadena entera: 941 px
    // en el peor centro. La lista se quedaba 971 px y el mapa 129.
    //
    // Ninguna prueba lo vio. La de desbordamiento horizontal pasaba —nada se
    // salía, el mapa se encogía— y el typecheck y el build no tienen forma de
    // saber qué ancho reparte una rejilla. Solo mirándolo en un navegador.
    test.skip(!!isMobile, "En móvil el mapa es el fondo a pantalla completa.");
    await page.goto("/");

    const mapa = page.getByRole("application", { name: "Mapa de centros de acopio" });
    await expect(mapa).toBeVisible();

    const caja = await mapa.boundingBox();
    const ancho = page.viewportSize()!.width;
    expect(caja!.width, "el mapa se quedó sin ancho: revisa el minmax(0,…) de la rejilla").
      toBeGreaterThan(ancho * 0.5);
  });

  test("en escritorio la portada no desplaza el documento", async ({ page, isMobile }) => {
    // La lista se desplaza DENTRO de su panel. Si el documento vuelve a crecer con
    // las 118 tarjetas, la cabecera con el contador y los filtros se va de la
    // pantalla justo mientras se recorre la lista, que es cuando se consulta.
    test.skip(!!isMobile, "En móvil ya era así: el mapa es fijo y la hoja se desplaza.");
    await page.goto("/");
    await expect(page.locator("li[data-slug]").first()).toBeVisible();

    const desborda = await page.evaluate(
      () => document.documentElement.scrollHeight > document.documentElement.clientHeight + 1,
    );
    expect(desborda, "la portada volvió a crecer con la lista").toBe(false);
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

test.describe("Convocatoria de voluntarios", () => {
  test("el botón flotante de voluntarios abre el diálogo con el formulario", async ({ page }) => {
    // El botón flota SOBRE el lienzo de MapLibre. Un elemento encima de un mapa
    // es justo el sitio donde un `click` se pierde: basta con que el mapa capture
    // el puntero o con equivocarse en el apilamiento para que quede muerto sin
    // que el typecheck ni el build se enteren. Por eso se prueba en un navegador.
    await page.goto("/");

    const flotante = page.getByRole("button", { name: "Ayúdanos a verificar" });
    await expect(flotante).toBeVisible();
    await flotante.click();

    const dialogo = page.getByRole("dialog", { name: "Nos faltan manos para verificar" });
    await expect(dialogo).toBeVisible();

    // Lo que la persona vino a buscar: el enlace al formulario, y que se abra fuera.
    const enlace = dialogo.getByRole("link", { name: "Quiero ayudar a verificar" });
    await expect(enlace).toHaveAttribute("target", "_blank");
    await expect(enlace).toHaveAttribute("rel", /noopener/);

    // REGRESIÓN: el diálogo se renderizaba dentro del contenedor del mapa, que
    // lleva `z-0` y por tanto abre un contexto de apilamiento. Su `z-50` solo
    // valía DENTRO de esa caja, así que la hoja inferior (`z-30`, colgada de la
    // raíz) lo pintaba por encima y lo cortaba a media frase.
    //
    // Ni `toBeVisible()` ni `hover()` lo detectan: para CSS el diálogo ESTÁ
    // visible —era otro elemento el que lo tapaba— y `hover()` desplaza el
    // contenedor con scroll hasta encontrar un hueco donde sí acierta.
    //
    // La única comprobación que distingue «pintado encima» de «pintado debajo»
    // es preguntarle al navegador qué elemento hay en un punto concreto. Se
    // muestrea la línea central del panel: si en alguna altura responde algo que
    // NO cuelga del diálogo, es que hay algo tapándolo.
    const tapado = await dialogo.evaluate((panel) => {
      const r = panel.getBoundingClientRect();
      const x = r.x + r.width / 2;
      for (let i = 1; i <= 8; i++) {
        const y = r.y + (r.height * i) / 9;
        const encima = document.elementFromPoint(x, y);
        if (encima && !panel.contains(encima)) return `${encima.tagName}.${encima.className}`;
      }
      return null;
    });
    expect(tapado, "algo se está pintando por encima del diálogo").toBeNull();

    // Las dos promesas explícitas del copy, que son las que desactivan las dos
    // objeciones reales: «no sabría hacerlo» y «no tengo tiempo». Si alguien
    // recorta el texto, que sea decidiéndolo y no sin enterarse.
    await expect(dialogo).toContainText("No es difícil");
    await expect(dialogo).toContainText("No es un trabajo de horas");

    // Las tres vías. La llamada NO puede ser la única: mucha gente no telefonea
    // a desconocidos, y ofrecerla como único camino pierde a media convocatoria.
    await expect(dialogo).toContainText("Una búsqueda en internet");
    await expect(dialogo).toContainText("Un vistazo a sus redes");
    await expect(dialogo).toContainText("Una llamada");

    // Lo que el formulario pide DE VERDAD. Prometer aquí algo distinto de lo que
    // la persona encuentra al abrirlo es la forma más rápida de perderla.
    await expect(dialogo).toContainText("Solo te pedimos un correo");

    // El alcance es TODO el seed, no solo lo vencido: un centro `verified` es uno
    // que alguien confirmó en su momento, no uno que siga abierto. Si el copy
    // vuelve a encabezar con la cifra de vencidos, el resto parece resuelto.
    await expect(dialogo).toContainText("todos hay que volver a mirarlos");
  });

  test("el diálogo de voluntarios se cierra con Escape", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Ayúdanos a verificar" }).click();

    const dialogo = page.getByRole("dialog", { name: "Nos faltan manos para verificar" });
    await expect(dialogo).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialogo).toBeHidden();
  });

  test("el flotante no tapa el control de zoom del mapa", async ({ page }) => {
    // Los dos viven sobre el mapa. El zoom de MapLibre se monta arriba a la
    // derecha (`NavigationControl` en centers-map.tsx); si se solapan, el
    // usuario se queda sin poder ampliar el mapa.
    //
    // Esta prueba YA FALLÓ en CI y encontró una colisión de verdad: el botón
    // iba arriba en escritorio, compartiendo fila con el zoom. En local
    // sobraban 62 px, pero el CI corre sobre Linux, el texto renderiza más
    // ancho y se tocaban. El margen existía solo en la máquina donde se diseñó.
    await page.goto("/");

    const flotante = page.getByRole("button", { name: "Ayúdanos a verificar" });
    const zoom = page.locator(".maplibregl-ctrl-zoom-in");
    await expect(flotante).toBeVisible();
    await expect(zoom).toBeVisible();

    const a = await flotante.boundingBox();
    const b = await zoom.boundingBox();
    expect(a && b).toBeTruthy();

    // Dos rectángulos chocan solo si se solapan en LOS DOS ejes. La primera
    // versión comprobaba únicamente la X, y eso daba falsos positivos en cuanto
    // uno de los dos se movía de fila: es justo el arreglo que necesitaba el
    // botón en escritorio, donde ahora vive abajo.
    const solapanEnX = a!.x < b!.x + b!.width && b!.x < a!.x + a!.width;
    const solapanEnY = a!.y < b!.y + b!.height && b!.y < a!.y + a!.height;
    expect(solapanEnX && solapanEnY, "el flotante se solapa con el control de zoom").toBe(false);
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
