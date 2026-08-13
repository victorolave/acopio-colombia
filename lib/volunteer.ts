/**
 * Convocatoria de voluntarios para verificación manual.
 *
 * POR QUÉ LA URL VIVE EN EL ENTORNO Y NO EN EL CÓDIGO
 *
 * El formulario es un recurso externo con vida propia: se puede cerrar cuando
 * sobren voluntarios, sustituir por otro proveedor, o reabrir en otra fase de
 * la emergencia. Ninguna de esas tres cosas es un cambio de código, y tratarlas
 * como tal significaría abrir un pull request y esperar un despliegue para algo
 * que alguien necesita cambiar en dos minutos y de madrugada.
 *
 * Va con prefijo `NEXT_PUBLIC_` a propósito: es una URL que se renderiza en el
 * HTML que recibe cualquier visitante. No es un secreto y no debe fingir serlo.
 *
 * Si la variable no está definida, la invitación NO se muestra en ninguna parte.
 * Es el mismo criterio que `lib/supabase/config.ts`: el sitio funciona sin la
 * pieza opcional en lugar de romperse o, peor, ofrecer un enlace muerto a quien
 * se ofreció a ayudar.
 */
export const VOLUNTEER_FORM_URL = process.env.NEXT_PUBLIC_VOLUNTEER_FORM_URL ?? "";

export const isVolunteerFormConfigured = Boolean(VOLUNTEER_FORM_URL);
