/**
 * Genera las notas de un release y calcula el salto de versión.
 *
 *   npm run release:notes            # notas desde el último tag hasta HEAD
 *   npm run release:notes -- --bump  # imprime solo la versión siguiente
 *
 * POR QUÉ EXISTE
 * Los mensajes de commit de este repositorio ya llevan la información que hace
 * falta: tipo convencional, scope y un asunto que explica el porqué. Escribir
 * las notas a mano sería copiar a mano lo que ya está escrito, y en una
 * emergencia eso se deja de hacer al tercer día.
 *
 * POR QUÉ SEPARA DATOS DE CÓDIGO
 * Es el mismo eje que ya usan `CONTRIBUTING.md` y la plantilla de pull request,
 * y no es una separación cosmética: un cambio de datos puede mandar a alguien a
 * conducir dos horas hasta un lugar equivocado, y un cambio de código no. Quien
 * lee las notas de un release durante la emergencia busca lo primero.
 *
 * La clasificación NO se hace por el scope del commit, sino por los archivos que
 * toca. El scope es una convención que se puede escribir mal con prisa; los
 * archivos tocados son un hecho. `fix(geocoding)` que corrige nueve pines toca
 * `data/coordinates.json` y es, para quien lee, un cambio de datos.
 *
 * SOBRE EL SALTO DE VERSIÓN
 * Se deduce de los commits, pero solo hasta MINOR. Subir MAJOR significa
 * declarar que se rompió una promesa pública del sitio (ver docs/versionado.md)
 * y esa decisión no se deduce: se toma y se escribe. Si aparece un commit
 * marcado como ruptura, esto falla a propósito.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/**
 * Archivos cuyo cambio afecta a lo que alguien va a leer para ir a un lugar.
 *
 * `supabase/seed.sql` NO está aquí y es deliberado: es un archivo GENERADO, y
 * el CI ya obliga a que corresponda con `data/centers.ts`. Se reescribe cada
 * vez que cambia el generador, no cada vez que cambia un centro. Incluirlo
 * metía commits como `fix(scripts): escribir rutas de salida con fileURLToPath`
 * en la sección de datos, que es justo la que alguien lee con prisa durante la
 * emergencia buscando si una dirección cambió.
 *
 * La fuente de verdad es `data/`. Todo cambio real de datos pasa por ahí.
 */
const RUTAS_DE_DATOS = ["data/", "docs/sources.md"];

/**
 * Dónde se insertan los releases nuevos.
 *
 * El historial reconstruido de v1.0.0 a v1.5.0 se escribió a mano con criterio
 * editorial: agrupa, explica y señala lo que importa. Los releases nuevos se
 * insertan ENCIMA de él y nunca lo reescriben.
 */
const MARCA = "<!-- release-notes:inicio -->";

const REPO = "https://github.com/victorolave/acopio-colombia";

/**
 * Ruta absoluta al CHANGELOG, resuelta desde este archivo.
 *
 * Con `fileURLToPath` y no con `process.cwd()` por lo mismo que `087672d`: las
 * rutas construidas a mano se rompen en Windows.
 */
const CHANGELOG = fileURLToPath(new URL("../CHANGELOG.md", import.meta.url));

type Commit = {
  hash: string;
  tipo: string;
  scope: string | null;
  ruptura: boolean;
  asunto: string;
  cuerpo: string;
  archivos: string[];
};

function git(...args: string[]): string {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

/**
 * El tag más reciente ANTERIOR a HEAD, o null si aún no hay ninguno.
 *
 * POR QUÉ «ANTERIOR» Y NO SIMPLEMENTE «EL ÚLTIMO»
 *
 * Esto no es una precaución teórica: rompió los releases v1.6.0 y v1.7.0, que
 * salieron publicados pero sin CHANGELOG.
 *
 * El workflow de release publica el tag ANTES de escribir el CHANGELOG, y lo
 * hace a propósito —el tag sale de inmediato sobre un commit que ya pasó el CI,
 * ver la nota en `.github/workflows/release.yml`—. Pero eso significa que cuando
 * el último paso llama a `--insertar`, el tag más reciente es el que se acaba de
 * crear y apunta EXACTAMENTE a HEAD. El rango `vX..HEAD` quedaba vacío, el
 * script se detenía con «No hay commits nuevos» y salía con código 1.
 *
 * El tag se envenenaba a sí mismo. Desde aquí se resuelve de una vez y para
 * cualquier orden de ejecución: si el candidato apunta a HEAD, es el del release
 * en curso y lo que se busca es el de antes.
 */
function ultimoTag(): string | null {
  try {
    const candidato = git("describe", "--tags", "--abbrev=0");
    if (git("rev-list", "-n", "1", candidato) !== git("rev-parse", "HEAD")) {
      return candidato;
    }
    // Apunta a HEAD: es el del release en curso. Si no hay ninguno antes, el
    // `describe` de abajo lanza y el `catch` devuelve null, que es lo correcto
    // para el primer release del repositorio.
    return git("describe", "--tags", "--abbrev=0", `${candidato}^`);
  } catch {
    return null;
  }
}

/**
 * Los commits del rango, ya parseados.
 *
 * Se usa un separador improbable en vez de saltos de línea porque los cuerpos
 * de commit de este repositorio son largos y multilínea a propósito.
 */
function commitsDelRango(desde: string | null, hasta: string): Commit[] {
  const rango = desde ? `${desde}..${hasta}` : hasta;
  const SEP = "";
  const FIN = "";

  const crudo = git(
    "log",
    "--reverse",
    "--no-merges",
    `--pretty=format:%H${SEP}%s${SEP}%b${FIN}`,
    rango,
  );

  if (!crudo) return [];

  return crudo
    .split(FIN)
    .map((entrada) => entrada.trim())
    .filter(Boolean)
    .map((entrada) => {
      const [hash, asuntoCrudo, cuerpo = ""] = entrada.split(SEP);
      const encabezado = /^(\w+)(?:\(([^)]+)\))?(!)?:\s*(.+)$/.exec(asuntoCrudo);

      const archivos = git("show", "--name-only", "--pretty=format:", hash)
        .split("\n")
        .filter(Boolean);

      return {
        hash,
        tipo: encabezado?.[1] ?? "otro",
        scope: encabezado?.[2] ?? null,
        ruptura: Boolean(encabezado?.[3]) || cuerpo.includes("BREAKING CHANGE:"),
        asunto: encabezado?.[4] ?? asuntoCrudo,
        cuerpo: cuerpo.trim(),
        archivos,
      };
    });
}

function esCambioDeDatos(commit: Commit): boolean {
  return commit.archivos.some((archivo) =>
    RUTAS_DE_DATOS.some((ruta) => archivo.startsWith(ruta)),
  );
}

/**
 * Versión siguiente según los commits.
 *
 * Nunca devuelve un salto MAJOR: si hay una ruptura declarada, se detiene. Ver
 * el comentario de cabecera.
 */
function calcularSiguiente(actual: string, commits: Commit[]): string {
  const rupturas = commits.filter((c) => c.ruptura);

  if (rupturas.length > 0) {
    const lista = rupturas
      .map((c) => `  ${c.hash.slice(0, 7)} ${c.asunto}`)
      .join("\n");
    throw new Error(
      "Hay commits marcados como ruptura:\n" +
        lista +
        "\n\nUn salto MAJOR declara que el sitio dejó de cumplir una promesa " +
        "pública.\nEso se decide y se escribe a mano: corta el release desde " +
        "Actions eligiendo\n«major» y redacta las notas explicando a quién " +
        "afecta.\nVer docs/versionado.md.",
    );
  }

  const [major, minor, patch] = actual.split(".").map(Number);
  const hayFuncionalidad = commits.some((c) => c.tipo === "feat");

  return hayFuncionalidad
    ? `${major}.${minor + 1}.0`
    : `${major}.${minor}.${patch + 1}`;
}

/** Una línea de nota: asunto en mayúscula inicial y hash corto enlazable. */
function linea(commit: Commit): string {
  const asunto = commit.asunto.charAt(0).toUpperCase() + commit.asunto.slice(1);
  const scope = commit.scope ? `**${commit.scope}:** ` : "";
  return `- ${scope}${asunto} (${commit.hash.slice(0, 7)})`;
}

function generarNotas(commits: Commit[]): string {
  const datos = commits.filter(esCambioDeDatos);
  const resto = commits.filter((c) => !esCambioDeDatos(c));

  const codigo = resto.filter(
    (c) => !["docs", "chore", "ci", "build", "test"].includes(c.tipo),
  );
  const mantenimiento = resto.filter((c) =>
    ["docs", "chore", "ci", "build", "test"].includes(c.tipo),
  );

  const secciones: string[] = [];

  if (datos.length > 0) {
    secciones.push(`### Datos\n\n${datos.map(linea).join("\n")}`);
  }
  if (codigo.length > 0) {
    secciones.push(`### Código\n\n${codigo.map(linea).join("\n")}`);
  }
  if (mantenimiento.length > 0) {
    secciones.push(
      `### Mantenimiento\n\n${mantenimiento.map(linea).join("\n")}`,
    );
  }

  return secciones.join("\n\n");
}

/**
 * Inserta un release nuevo en el CHANGELOG, encima del historial existente.
 *
 * Escribe también el enlace de comparación entre tags, que es lo que permite a
 * cualquiera ver el diff exacto de un release sin clonar el repositorio.
 */
function insertarEnChangelog(
  version: string,
  notas: string,
  anterior: string | null,
): void {
  const contenido = readFileSync(CHANGELOG, "utf8");

  if (!contenido.includes(MARCA)) {
    throw new Error(
      `No se encontró la marca «${MARCA}» en CHANGELOG.md. ` +
        "Sin ella no se sabe dónde insertar sin pisar el historial escrito a mano.",
    );
  }

  const fecha = new Date().toISOString().slice(0, 10);
  const seccion = `## [${version}] — ${fecha}\n\n${notas}`;

  let salida = contenido.replace(MARCA, `${MARCA}\n\n${seccion}`);

  const enlace = anterior
    ? `[${version}]: ${REPO}/compare/${anterior}...v${version}`
    : `[${version}]: ${REPO}/releases/tag/v${version}`;

  // Se inserta antes del primer enlace de versión existente para que la lista
  // de referencias quede en el mismo orden que las secciones.
  const primerEnlace = /^\[\d+\.\d+\.\d+\]:/m.exec(salida);
  salida = primerEnlace
    ? salida.slice(0, primerEnlace.index) +
      `${enlace}\n` +
      salida.slice(primerEnlace.index)
    : `${salida.trimEnd()}\n${enlace}\n`;

  writeFileSync(CHANGELOG, salida);
}

function main() {
  const args = process.argv.slice(2);
  const soloBump = args.includes("--bump");
  const indiceInsertar = args.indexOf("--insertar");
  const desde = ultimoTag();
  const commits = commitsDelRango(desde, "HEAD");

  if (commits.length === 0) {
    console.error(
      desde
        ? `No hay commits nuevos desde ${desde}. No hay nada que publicar.`
        : "No hay commits. No hay nada que publicar.",
    );
    process.exit(1);
  }

  const actual = desde?.replace(/^v/, "") ?? "0.0.0";

  if (soloBump) {
    console.log(calcularSiguiente(actual, commits));
    return;
  }

  if (indiceInsertar !== -1) {
    const version = args[indiceInsertar + 1];
    if (!/^\d+\.\d+\.\d+$/.test(version ?? "")) {
      throw new Error("--insertar necesita una versión, por ejemplo 1.6.0");
    }
    insertarEnChangelog(version, generarNotas(commits), desde);
    console.log(`CHANGELOG.md actualizado con ${version}.`);
    return;
  }

  console.log(generarNotas(commits));
}

main();
