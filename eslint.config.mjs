import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

/**
 * Configuración de ESLint (formato plano).
 *
 * El proyecto arrastraba `"lint": "next lint"` desde `create-next-app` sin haber
 * instalado nunca ESLint, así que el comando fallaba y nadie lo notaba. Peor:
 * había un `eslint-disable-next-line react-hooks/exhaustive-deps` silenciando
 * una regla que jamás se evaluó.
 *
 * `eslint-config-next` 16 ya exporta configuración plana nativa, así que se
 * expande directamente. NO envolverla en `FlatCompat`: al normalizarla revienta
 * con "Converting circular structure to JSON".
 *
 * Se elige `core-web-vitals` por encima del preset básico a propósito: sube a
 * error las reglas que afectan a quien entra desde un teléfono con mala señal
 * durante una emergencia, que es exactamente el usuario de este sitio.
 */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    rules: {
      // Las variables intencionalmente sin usar se marcan con guion bajo.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrors: "none" },
      ],
    },
  },
];

export default eslintConfig;
