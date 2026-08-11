"use client";

import { useEffect, useRef } from "react";
import maplibregl, { type Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { DEFAULT_MAP_STYLE } from "@/lib/maps";

type Props = {
  latitude: number;
  longitude: number;
  label: string;
  precise: boolean;
};

export default function SingleCenterMap({ latitude, longitude, label, precise }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: DEFAULT_MAP_STYLE,
      center: [longitude, latitude],
      zoom: precise ? 15 : 13,
      attributionControl: { compact: true },
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    const el = document.createElement("div");
    el.setAttribute("aria-label", label);
    el.style.cssText =
      "width:24px;height:24px;border-radius:50% 50% 50% 2px;transform:rotate(45deg);background:#12715b;border:3px solid #fff;box-shadow:0 2px 6px rgba(15,23,42,.35)";
    new maplibregl.Marker({ element: el }).setLngLat([longitude, latitude]).addTo(map);

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [latitude, longitude, label, precise]);

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label={`Mapa de ubicación de ${label}`}
      className="h-64 w-full bg-ink-100"
    />
  );
}
