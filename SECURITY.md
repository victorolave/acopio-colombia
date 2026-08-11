# Política de seguridad

## Reportar una vulnerabilidad

**No abras un issue público.** Un issue de seguridad abierto es un manual de instrucciones para quien quiera aprovecharlo.

Usa **[GitHub Security Advisories](https://github.com/victorolave/acopio-colombia/security/advisories/new)**, que es un canal privado entre tú y quien mantiene el proyecto.

Incluye qué encontraste, cómo reproducirlo y qué se puede hacer con ello. Si puedes, propón el arreglo.

Este es un proyecto ciudadano sin equipo dedicado ni programa de recompensas. Se responde tan rápido como sea humanamente posible, y se te acredita en el arreglo salvo que prefieras lo contrario.

## Qué nos preocupa especialmente

Este proyecto publica información que la gente usa para desplazarse durante una emergencia. Además de las vulnerabilidades habituales, importan estas:

**Publicación de datos no verificados.** Cualquier ruta que permita que un centro `pending` o `disputed` llegue a la interfaz pública es un fallo de seguridad, no un bug de interfaz. Es el peor fallo posible en este proyecto.

**Fuga de datos de quien envía un centro.** Los campos `submitted_by_*` contienen el nombre, teléfono y correo de personas reales. Ya se corrigió un caso: RLS filtra filas, no columnas, así que el rol `anon` podía leerlos con `select=*` contra PostgREST. Si encuentras otra vía, repórtala.

**Fuga de la ubicación del visitante.** La geolocalización vive solo en memoria del navegador. Cualquier ruta por la que llegue al servidor, a la URL o a la analítica es un fallo.

**Escalada a administrador.** Estar autenticado no basta para moderar: el usuario debe estar en `admin_users`. Cualquier forma de saltarse esa comprobación es crítica.

## Lo que ya está en su sitio

- Row Level Security en todas las tablas; el público solo lee `verified` y `reported`.
- Permisos a nivel de columna: `anon` no puede leer los datos de contacto del remitente.
- Sin política de `INSERT` para usuarios anónimos: los envíos pasan por route handlers del servidor con validación Zod, honeypot y rate limiting.
- Registro público de cuentas desactivado en Supabase.
- La `SUPABASE_SERVICE_ROLE_KEY` solo existe en el servidor y nunca lleva el prefijo `NEXT_PUBLIC_`.
- Escaneo de secretos y protección de push activos en el repositorio.

## Fuera de alcance

- Que la información de un centro esté desactualizada. Eso no es una vulnerabilidad: repórtalo con la plantilla «Centro con información incorrecta».
- Ataques que requieran acceso físico al dispositivo de la víctima.
- Resultados de escáneres automáticos sin un impacto demostrado.
