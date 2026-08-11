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
  onSelectRef.current = onSelect;

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
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: false,
        showAccuracyCircle: false,
      }),
      "top-right",
    );

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
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

      const el = document.createElement("button");
      el.type = "button";
      el.setAttribute("aria-label", `${center.name}, ${center.municipality}`);
      el.dataset.slug = center.slug;
      el.style.cssText = [
        "width:22px",
        "height:22px",
        "border-radius:50% 50% 50% 2px",
        "transform:rotate(45deg)",
        "cursor:pointer",
        "border:2px solid #ffffff",
        "box-shadow:0 2px 6px rgba(15,23,42,.35)",
        "padding:0",
      ].join(";");
      // Verificado y reportado se distinguen por color Y por forma del borde interior.
      el.style.background = center.verification_status === "verified" ? "#12715b" : "#b45309";
      el.style.opacity = center.verification_status === "verified" ? "1" : "0.92";

      el.addEventListener("click", (event) => {
        event.stopPropagation();
        onSelectRef.current(center.slug);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([center.longitude, center.latitude])
        .addTo(map);

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

    map.easeTo({ center: [userPosition.longitude, userPosition.latitude], zoom: 11, duration: 800 });
  }, [userPosition]);

  // Centro seleccionado -----------------------------------------------------
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedSlug) return;
    const center = centers.find((c) => c.slug === selectedSlug);
    if (!center) return;
    map.easeTo({ center: [center.longitude, center.latitude], zoom: Math.max(map.getZoom(), 13), duration: 600 });
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
