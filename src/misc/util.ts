import { GeoPoint } from "firebase/firestore";
import { atom } from "jotai";
import { useEffect, useState } from "react";

export function range(a: number, b: number): number[] {
  return Array.from({ length: b - a }, (_, i) => a + i);
}

export function extractLongLat(point: GeoPoint): [number, number] {
  return [point.longitude, point.latitude];
}

// From: https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
// Slightly modified to use Typescript
export function useStickyState<T>(
  defaultValue: T,
  key: string
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export function persistentAtom<T>(key: string, initialValue: T) {
  const getInitialValue: () => T = () => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      try {
        return JSON.parse(item);
      } catch {
        return initialValue;
      }
    }
    return initialValue;
  };
  const baseAtom = atom<T>(getInitialValue());
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      localStorage.setItem(key, JSON.stringify(nextValue));
    }
  );
  return derivedAtom;
}
