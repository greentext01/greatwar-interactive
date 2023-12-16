import { GeoPoint } from "firebase/firestore";
import { useEffect, useState } from "react";

export function range(a: number, b: number): number[] {
  return Array.from({ length: b - a }, (_, i) => a + i);
}

export function extractLongLat(point: GeoPoint): [number, number] {
  return [point.longitude, point.latitude];
}

// From: https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
// Slightly modified to store strings directly instead of JSON
export function useStickyState(defaultValue: string, key: string): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? stickyValue : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
