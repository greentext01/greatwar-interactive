import { GeoPoint } from "firebase/firestore";

export function range(a: number, b: number): number[] {
  return Array.from({ length: b - a }, (_, i) => a + i)
}

export function extractLongLat(point: GeoPoint): [number, number] {
  return [point.longitude, point.latitude]
}