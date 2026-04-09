import { useTheme } from './context/ThemeContext'

export const App = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div style={{ padding: "40px" }}>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}
