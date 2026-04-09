import { useState } from 'react'
import { SearchBar } from './features/search/SearchBar'

export const App = () => {
  const [query, setQuery] = useState("")

  return (
    <div style={{ padding: "40px" }}>
      <h2>SearchBar test:</h2>
      <SearchBar query={query} setQuery={setQuery} />
      <p>Current query: {query}</p>
    </div>
  )
}

