"use client";

import { useEffect, useRef } from "react";
import maplibregl, { type Map as MapLibreMap, type Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { COLOMBIA_CENTER, COLOMBIA_ZOOM, DEFAULT_MAP_STYLE } from "@/lib/maps";

type Position = { latitude: number; longitude: number };

/**
 * Encuadre solicitado desde fuera del mapa (hoy: el buscador de direcciones).
 *
 * `nonce` existe para que buscar DOS VECES la misma dirección vuelva a mover la
 * cámara: sin él, un objeto con las mismas coordenadas parecería "sin cambios"
 * y la segunda búsqueda no haría nada visible.
 */
export type MapFocus = Position & { zoom: number; nonce: number };

type Props = {
  value: Position | null;
  /** Solo se dispara cuando una PERSONA toca el mapa o arrastra el pin. */
  onChange: (position: Position) => void;
  focus?: MapFocus | null;
};

/**
 * Selector de ubicación: la persona arrastra el pin hasta el punto exacto.
 *
 * El buscador de direcciones puede mover la cámara y soltar un pin provisional
 * (`focus`), pero NUNCA cuenta como decisión humana: quien confirma el punto es
 * la persona, porque ningún geocodificador resuelve bien la nomenclatura
 * colombiana y un pin errado durante una emergencia es el peor modo de fallo.
 */
export default function LocationPicker({ value, onChange, focus }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const lastFocusRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: DEFAULT_MAP_STYLE,
      center: value ? [value.longitude, value.latitude] : COLOMBIA_CENTER,
      zoom: value ? 15 : COLOMBIA_ZOOM,
      attributionControl: { compact: true },
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(
      new maplibregl.GeolocateControl({ positionOptions: { enableHighAccuracy: true } }),
      "top-right",
    );

    const marker = new maplibregl.Marker({ draggable: true, color: "#12715b" });

    const place = (lng: number, lat: number) => {
      marker.setLngLat([lng, lat]).addTo(map);
      onChangeRef.current({ latitude: Number(lat.toFixed(6)), longitude: Number(lng.toFixed(6)) });
    };

    if (value) marker.setLngLat([value.longitude, value.latitude]).addTo(map);

    map.on("click", (event) => place(event.lngLat.lng, event.lngLat.lat));
    marker.on("dragend", () => {
      const { lng, lat } = marker.getLngLat();
      onChangeRef.current({ latitude: Number(lat.toFixed(6)), longitude: Number(lng.toFixed(6)) });
    });

    mapRef.current = map;
    markerRef.current = marker;

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // Solo se inicializa una vez: el valor posterior lo controlan el marcador y `focus`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Encuadre externo. No llama a `onChange`: mover la cámara no es marcar el punto.
  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;
    if (!map || !marker || !focus || focus.nonce === lastFocusRef.current) return;

    lastFocusRef.current = focus.nonce;
    marker.setLngLat([focus.longitude, focus.latitude]).addTo(map);
    map.flyTo({ center: [focus.longitude, focus.latitude], zoom: focus.zoom, duration: 900 });
  }, [focus]);

  return (
    <div>
      <div
        ref={containerRef}
        role="application"
        aria-label="Selector de ubicación en el mapa. Toca el mapa o arrastra el pin para marcar el punto exacto."
        className="h-64 w-full rounded-lg border border-ink-300 bg-ink-100"
      />
      <p className="mt-1 text-sm text-ink-500">
        Toca el mapa o arrastra el pin hasta la entrada del centro.{" "}
        {value ? (
          <span className="font-medium text-brand-700">
            Ubicación marcada ({value.latitude.toFixed(5)}, {value.longitude.toFixed(5)}).
          </span>
        ) : (
          <span className="font-medium text-caution-700">Aún no has marcado la ubicación.</span>
        )}
      </p>
    </div>
  );
}
