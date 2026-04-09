import { useState, useEffect } from "react";

// Default debounce delay in milliseconds
export const DEBOUNCE_DELAY = 300;

/**
 * useDebounce — Custom hook that debounces a value.
 *
 * Delays updating the returned value until after `delay` ms have passed
 * since the last time `value` changed. Useful for search inputs where
 * you don't want to fire an API call on every keystroke.
 *
 * @param {any} value - The value to debounce (e.g., search input string)
 * @param {number} delay - Time in milliseconds to wait before updating
 * @returns {any} - The debounced value
 *
 * Example:
 *   const [query, setQuery] = useState("");
 *   const debouncedQuery = useDebounce(query, 300);
 *   // debouncedQuery updates 300ms after user stops typing
 */
export function useDebounce(value, delay) {
  // Store the debounced value in state
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update debouncedValue after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: clear the timer if value changes before delay expires.
    // This is what makes it a "debounce" — the timer resets on every change,
    // so the update only fires once the user stops changing the value.
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // Re-run effect when value or delay changes

  return debouncedValue;
}
