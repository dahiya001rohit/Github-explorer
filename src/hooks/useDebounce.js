import { useState, useEffect } from "react";

export const DEBOUNCE_DELAY = 300;

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear timer on cleanup so update only fires after user stops changing value
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

