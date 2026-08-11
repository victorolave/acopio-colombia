/**
 * Set de iconos propio, SVG en línea.
 *
 * Por qué no emojis: 📍 y 💬 se dibujan distinto en cada sistema operativo, no
 * heredan el color del texto, no se pueden alinear a la línea base y algunos
 * lectores de pantalla los leen en voz alta con nombres absurdos. Como iconos
 * estructurales son inconsistentes; como decoración, ruido.
 *
 * Por qué no una librería: son once iconos. Añadir una dependencia para esto
 * castiga el arranque en las conexiones malas para las que está pensada la app.
 *
 * Sistema: rejilla de 24, trazo 1.75, extremos redondeados, `currentColor`.
 * Todos ocultos para lectores de pantalla: el texto adyacente ya nombra la
 * acción, y un icono anunciado por separado solo duplica.
 */
type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function IconPin({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20 10c0 4.9-5.4 10.2-7.4 11.9a1 1 0 0 1-1.2 0C9.4 20.2 4 14.9 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.75" />
    </svg>
  );
}

export function IconCrosshair({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 1.5v3M12 19.5v3M22.5 12h-3M4.5 12h-3" />
    </svg>
  );
}

export function IconSearch({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.3-4.3" />
    </svg>
  );
}

export function IconFilter({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 5.5h18M6.5 12h11M10 18.5h4" />
    </svg>
  );
}

export function IconCheck({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function IconAlert({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 8.5v4.5M12 16.5h.01" />
      <path d="M10.3 3.9 2.4 17.4A2 2 0 0 0 4.1 20.4h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
    </svg>
  );
}

export function IconClock({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.75" />
    </svg>
  );
}

export function IconPhone({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6.6 3.5h2.6l1.4 3.5-1.9 1.3a11 11 0 0 0 5 5l1.3-1.9 3.5 1.4v2.6a2 2 0 0 1-2.2 2 17.5 17.5 0 0 1-15.2-15.2 2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function IconChat({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20.5 11.8a7.9 7.9 0 0 1-8.5 7.9 9 9 0 0 1-3.1-.6L4 20.5l1.4-4.4a7.7 7.7 0 0 1-1-3.8 8 8 0 0 1 8.4-7.9 8 8 0 0 1 7.7 7.4Z" />
    </svg>
  );
}

export function IconClose({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function IconChevronRight({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
    </svg>
  );
}

export function IconArrowLeft({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M19.5 12h-15M10.5 5.5 4 12l6.5 6.5" />
    </svg>
  );
}

export function IconRoute({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="6" cy="18.5" r="2.5" />
      <circle cx="18" cy="5.5" r="2.5" />
      <path d="M15.5 5.5H10a3.5 3.5 0 0 0 0 7h4a3.5 3.5 0 0 1 0 7H8.5" />
    </svg>
  );
}

export function IconLayers({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m4.5 12.5 7.5 4 7.5-4" />
    </svg>
  );
}
