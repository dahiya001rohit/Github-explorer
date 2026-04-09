import React, { useState, useEffect } from 'react'
import { useDebounce, DEBOUNCE_DELAY } from './hooks/useDebounce'

export const App = () => {
  // Live input value — updates on every keystroke
  const [inputValue, setInputValue] = useState("");

  // Debounced value — only updates 300ms after user stops typing
  const debouncedValue = useDebounce(inputValue, DEBOUNCE_DELAY);

  // Log debounced value whenever it changes
  useEffect(() => {
    if (debouncedValue) {
      console.log("Debounced value:", debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div style={{ padding: "40px", fontFamily: "monospace" }}>
      <h2>useDebounce Test</h2>

      <input
        type="text"
        placeholder="Type something..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          padding: "10px 16px",
          fontSize: "16px",
          width: "300px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <div style={{ marginTop: "20px" }}>
        <p><strong>Live value:</strong> {inputValue}</p>
        <p><strong>Debounced value ({DEBOUNCE_DELAY}ms):</strong> {debouncedValue}</p>
      </div>
    </div>
  )
}
