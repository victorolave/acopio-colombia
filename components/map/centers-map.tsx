"use client";

import { useEffect, useRef } from "react";
import maplibregl, { type Map as MapLibreMap, type Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { COLOMBIA_CENTER, COLOMBIA_ZOOM, DEFAULT_MAP_STYLE } from "@/lib/maps";
import type { CenterWithDistance } from "@/lib/types";

type Props = {
  centers: CenterWithDistance[];
  userPosition: { latitude: number; longitude: number } | null;
  selectedSlug: string | null;
  onSelect: (slug: string | null) => void;
};

/**
 * Mapa nacional. Se carga de forma diferida desde el explorador porque
 * MapLibre pesa: la lista debe ser útil aunque el mapa tarde o falle.
 */
export default function CentersMap({ centers, userPosition, selectedSlug, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const userMarkerRef = useRef<Marker | null>(null);
  const onSelectRef = useRef(onSelect);

  // El callback se sincroniza en un efecto, NO durante el render: escribir en un
  // ref mientras React renderiza se rompe con render concurrente, donde un render
  // puede descartarse o repetirse. Los marcadores solo disparan por un toque de
  // la persona, mucho después de que corran los efectos.
  useEffect(() => {
    onSelectRef.current = onSelect;
  });

  // Inicialización ----------------------------------------------------------
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: DEFAULT_MAP_STYLE,
      center: COLOMBIA_CENTER,
      zoom: COLOMBIA_ZOOM,
      attributionControl: { compact: true },
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    // Sin GeolocateControl a proposito: duplicaba el boton «Cerca de mi» con otro
    // aspecto y, peor, centraba el mapa sin avisar a React, asi que la lista se
    // quedaba sin ordenar por distancia. Una sola via para una sola accion.

    // Se captura la instancia del Map aquí dentro: leer `markersRef.current` en
    // la limpieza consulta el valor del momento del desmontaje, que no tiene por
    // qué ser este. Es el mismo objeto, pero dicho sin ambigüedad.
    const markers = markersRef.current;

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      markers.clear();
    };
  }, []);

  // Marcadores de centros ---------------------------------------------------
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const nextSlugs = new Set(centers.map((c) => c.slug));

    for (const [slug, marker] of markersRef.current) {
      if (!nextSlugs.has(slug)) {
        marker.remove();
        markersRef.current.delete(slug);
      }
    }

    for (const center of centers) {
      if (markersRef.current.has(center.slug)) continue;

      // El marcador visible mide 22 px, pero el area tactil es de 44 px: en un
      // mapa lleno de puntos, pedir precision de pixel es la forma mas rapida de
      // que alguien toque el centro equivocado.
      const el = document.createElement("button");
      el.type = "button";
      el.dataset.slug = center.slug;
      el.style.cssText = [
        "width:44px",
        "height:44px",
        "display:grid",
        "place-items:center",
        "background:transparent",
        "border:0",
        "padding:0",
        "cursor:pointer",
        "touch-action:manipulation",
      ].join(";");

      const dot = document.createElement("span");
      const verified = center.verification_status === "verified";
      dot.style.cssText = [
        "width:22px",
        "height:22px",
        "border-radius:50% 50% 50% 2px",
        "transform:rotate(45deg)",
        "border:2px solid #ffffff",
        "transition:transform 150ms ease-out",
        // Verificado y reportado se distinguen por color Y por relleno, nunca solo por color:
        // el reportado es un anillo hueco, distinguible sin percibir el matiz.
        `background:${verified ? "#12715b" : "#ffffff"}`,
        `box-shadow:0 2px 6px rgba(15,23,42,.35)${verified ? "" : ", inset 0 0 0 3px #b45309"}`,
      ].join(";");
      el.appendChild(dot);

      el.addEventListener("click", (event) => {
        event.stopPropagation();
        onSelectRef.current(center.slug);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([center.longitude, center.latitude])
        .addTo(map);

      // El `aria-label` se pone DESPUÉS de construir el marcador, no antes.
      // MapLibre escribe el suyo —«Map marker», idéntico para todos— sobre el
      // elemento que se le pasa, así que ponerlo arriba no servía de nada: los
      // 118 marcadores se anunciaban igual y un lector de pantalla no podía
      // distinguir un acopio de otro.
      el.setAttribute("aria-label", `${center.name}, ${center.municipality}`);

      markersRef.current.set(center.slug, marker);
    }
  }, [centers]);

  // Marcador del visitante --------------------------------------------------
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    userMarkerRef.current?.remove();
    userMarkerRef.current = null;
    if (!userPosition) return;

    const el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.style.cssText =
      "width:16px;height:16px;border-radius:50%;background:#2563eb;border:3px solid #fff;box-shadow:0 0 0 4px rgba(37,99,235,.25)";

    userMarkerRef.current = new maplibregl.Marker({ element: el })
      .setLngLat([userPosition.longitude, userPosition.latitude])
      .addTo(map);

    // La hoja inferior tapa la mitad baja de la pantalla en movil: se desplaza el
    // encuadre hacia arriba para que el punto del usuario no quede debajo.
    const sheetPadding = window.matchMedia("(min-width: 1024px)").matches ? 0 : window.innerHeight * 0.42;
    map.easeTo({
      center: [userPosition.longitude, userPosition.latitude],
      zoom: 11,
      duration: 800,
      padding: { top: 0, right: 0, bottom: sheetPadding, left: 0 },
    });
  }, [userPosition]);

  // Centro seleccionado -----------------------------------------------------
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedSlug) return;
    const center = centers.find((c) => c.slug === selectedSlug);
    if (!center) return;
    const sheetPadding = window.matchMedia("(min-width: 1024px)").matches ? 0 : window.innerHeight * 0.42;
    map.easeTo({
      center: [center.longitude, center.latitude],
      zoom: Math.max(map.getZoom(), 13),
      duration: 600,
      padding: { top: 0, right: 0, bottom: sheetPadding, left: 0 },
    });
  }, [selectedSlug, centers]);

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label="Mapa de centros de acopio"
      className="h-full w-full bg-ink-100"
    />
  );
}
