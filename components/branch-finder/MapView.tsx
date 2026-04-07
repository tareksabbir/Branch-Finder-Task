/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useCallback } from "react";
import { Branch, GeoLocation } from "@/lib/types";
import { BranchDetailPanel } from "./BranchDetailPanel";
import { createBranchPin, createUserPin } from "@/lib/utils/map";

declare global {
  interface Window {
    google: typeof google;
    initGoogleMaps: () => void;
  }
}

interface MapViewProps {
  branches: Branch[];
  selectedBranch: Branch | null;
  userLocation: GeoLocation | null;
  onSelectBranch: (b: Branch) => void;
  onCloseDetail: () => void;
  apiKey: string;
}

export function MapView({
  branches,
  selectedBranch,
  userLocation,
  onSelectBranch,
  onCloseDetail,
  apiKey,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.marker.AdvancedMarkerElement>>(new Map());
  const userMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const isLoadedRef = useRef(false);
  const prevSelectedIdRef = useRef<string | null>(null);

  const renderMarkers = useCallback(() => {
    if (!mapInstanceRef.current || !window.google?.maps?.marker) return;

    const { AdvancedMarkerElement } = window.google.maps.marker;

    // Clear existing markers
    markersRef.current.forEach((m) => {
      m.map = null;
    });
    markersRef.current.clear();

    // Render new markers
    branches.forEach((branch) => {
      if (!branch.lat || !branch.lng) return;

      const isSelected = prevSelectedIdRef.current === branch.id;

      const marker = new AdvancedMarkerElement({
        position: { lat: branch.lat, lng: branch.lng },
        map: mapInstanceRef.current!,
        title: branch.name,
        content: createBranchPin(isSelected),
        zIndex: isSelected ? 999 : 1,
      });

      marker.addEventListener("gmp-click", () => onSelectBranch(branch));
      markersRef.current.set(branch.id, marker);
    });
  }, [branches, onSelectBranch]);

  const initMap = useCallback(() => {
    if (!mapRef.current || mapInstanceRef.current || !window.google?.maps)
      return;

    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      zoom: 5,
      minZoom: 2,
      center: { lat: 39.5, lng: -98.35 },
      mapId: "branch_finder_map",
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      gestureHandling: "greedy",
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.LEFT_BOTTOM,
      },
    });

    isLoadedRef.current = true;
    renderMarkers();

    const observer = new ResizeObserver(() => {
      if (mapInstanceRef.current && window.google?.maps) {
        window.google.maps.event.trigger(mapInstanceRef.current, "resize");
      }
    });

    if (mapRef.current) observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, [renderMarkers]);

  // Handle Google Maps Script loading
  useEffect(() => {
    if (window.google?.maps?.marker) {
      initMap();
      return;
    }

    window.initGoogleMaps = () => initMap();

    if (document.getElementById("google-maps-script")) return;

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&loading=async&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (window.initGoogleMaps === initMap) {
        // @ts-expect-error – intentional cleanup
        delete window.initGoogleMaps;
      }
    };
  }, [apiKey, initMap]);

  // Re-render markers if branch list changes
  useEffect(() => {
    if (isLoadedRef.current) renderMarkers();
  }, [renderMarkers]);

  // Lightweight in-place pin swap — no full re-render, no flicker
  useEffect(() => {
    const prevId = prevSelectedIdRef.current;
    const nextId = selectedBranch?.id ?? null;

    if (prevId === nextId) return;

    // Deselect old marker
    if (prevId) {
      const old = markersRef.current.get(prevId);
      if (old) {
        old.content = createBranchPin(false);
        old.zIndex = 1;
      }
    }

    // Select new marker
    if (nextId) {
      const next = markersRef.current.get(nextId);
      if (next) {
        next.content = createBranchPin(true);
        next.zIndex = 999;
      }
    }

    prevSelectedIdRef.current = nextId;

    // Pan camera — single atomic call to avoid double animation
    if (!selectedBranch || !mapInstanceRef.current || !window.google) return;
    mapInstanceRef.current.moveCamera({
      center: { lat: selectedBranch.lat, lng: selectedBranch.lng },
      zoom: 14,
    });
  }, [selectedBranch]);

  // Handle User Location changes
  useEffect(() => {
    if (
      !userLocation ||
      !mapInstanceRef.current ||
      !window.google?.maps?.marker
    )
      return;

    const { AdvancedMarkerElement } = window.google.maps.marker;
    if (userMarkerRef.current) userMarkerRef.current.map = null;

    userMarkerRef.current = new AdvancedMarkerElement({
      position: userLocation,
      map: mapInstanceRef.current,
      title: "Your location",
      content: createUserPin(),
      zIndex: 1000,
    });

    mapInstanceRef.current.panTo(userLocation);
    mapInstanceRef.current.setZoom(10);
  }, [userLocation]);

  // Handle Bounds Change
  useEffect(() => {
    if (
      !isLoadedRef.current ||
      !mapInstanceRef.current ||
      !window.google ||
      branches.length === 0
    )
      return;

    const bounds = new window.google.maps.LatLngBounds();
    branches.forEach((b) => {
      if (b.lat && b.lng) bounds.extend({ lat: b.lat, lng: b.lng });
    });
    mapInstanceRef.current.fitBounds(bounds, 40);
  }, [branches]);

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <div ref={mapRef} className="absolute inset-0" />
      {selectedBranch && (
        <BranchDetailPanel branch={selectedBranch} onClose={onCloseDetail} />
      )}
    </div>
  );
}
