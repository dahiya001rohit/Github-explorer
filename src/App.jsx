import Loader from './components/Loader'

export const App = () => {
  return (
    <div style={{ padding: "40px" }}>
      <h2>Default loader:</h2>
      <Loader />

      <h2>Custom message:</h2>
      <Loader message="Fetching repositories..." />
    </div>
  )
}
