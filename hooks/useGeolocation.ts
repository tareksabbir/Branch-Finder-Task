// hooks/useGeolocation.ts
"use client";

import { useState, useCallback } from "react";
import { GeoLocation, UseGeolocationReturn } from "@/lib/types";

const GEO_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 8000,
  maximumAge: 60_000, // reuse a cached fix up to 1 min old
};

export function useGeolocation(): UseGeolocationReturn {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(() => {
    if (!navigator?.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      (err) => {
        const messages: Record<number, string> = {
          1: "Location access denied. Please allow location access in your browser.",
          2: "Your location could not be determined. Try again.",
          3: "Location request timed out. Please try again.",
        };
        setError(messages[err.code] ?? "Unable to determine your location.");
        setLoading(false);
      },
      GEO_OPTIONS,
    );
  }, []);

  const clearLocation = useCallback(() => {
    setLocation(null);
    setError(null);
  }, []);

  return { location, loading, error, getLocation, clearLocation };
}
