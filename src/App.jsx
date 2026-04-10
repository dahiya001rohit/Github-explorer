import { useState } from 'react'
import {RepoFilters} from './features/repos/RepoFilters'

export const App = () => {
  const [filters, setFilters] = useState({ sortBy: "", language: "all" })

  return (
    <div style={{ padding: "40px" }}>
      <h2>RepoFilters test:</h2>
      <RepoFilters
        filters={filters}
        setFilters={setFilters}
      />
      <p>Sort by: {filters.sortBy || "none"}</p>
      <p>Language: {filters.language}</p>
    </div>
  )
}