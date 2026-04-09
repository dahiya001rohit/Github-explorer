import { ErrorMessage } from './components/ErrorMessage'

export const App = () => {
  return (
    <div style={{ padding: "40px" }}>
      <h2>Default error:</h2>
      <ErrorMessage />

      <h2>Custom error:</h2>
      <ErrorMessage message="User not found." />

      <h2>Rate limit error:</h2>
      <ErrorMessage message="Rate limit exceeded. Try again later." />
    </div>
  )
}