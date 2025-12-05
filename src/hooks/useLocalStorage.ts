'use client';

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, boolean] {
  const [state, setState] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      const item = window.localStorage.getItem(key);
      if (item) {
        setState(JSON.parse(item) as T);
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }

    setIsHydrated(true);
  }, [key]);

  const setValue = useCallback(
    (value: T) => {
      try {
        setState(value);

        if (typeof window !== 'undefined' && isHydrated) {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'QuotaExceededError') {
            console.error(`localStorage quota exceeded for key "${key}"`);
          } else {
            console.error(`Error writing localStorage key "${key}":`, error);
          }
        }
      }
    },
    [key, isHydrated]
  );

  return [state, setValue, isHydrated];
}
