import { createContext, useContext, useState, useEffect } from "react";

const THEME_KEY = "gh_explorer_theme";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || "light";
  });

  // save to localStorage and toggle dark class on html tag
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// custom hook for easy access
export function useTheme() {
  return useContext(ThemeContext);
}