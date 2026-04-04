import { GeoLocation, Branch } from "../types";

/** Parse "lat, lng" string → { lat, lng } numbers */
export function parseCoordinates(coords: string): GeoLocation {
  if (!coords) return { lat: 0, lng: 0 };
  const [lat, lng] = coords.split(",").map((s) => parseFloat(s.trim()));
  if (isNaN(lat) || isNaN(lng)) return { lat: 0, lng: 0 };
  return { lat, lng };
}

/** Haversine formula — returns distance in km */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Format distance — shows metres below 1 km, otherwise km */
export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export function calculateDistances(
  branches: Branch[],
  userLocation: GeoLocation | null,
): Branch[] {
  if (!userLocation) return branches;
  return branches.map((b) => ({
    ...b,
    distance: haversineDistance(
      userLocation.lat,
      userLocation.lng,
      b.lat,
      b.lng,
    ),
  }));
}
