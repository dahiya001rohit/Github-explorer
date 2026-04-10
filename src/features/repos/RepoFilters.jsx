import { useState, useEffect } from 'react'
import { useDebounce } from '../../hooks/useDebounce'

export const RepoFilters = ({ filters, setFilters }) => {
  const [langInput, setLangInput] = useState("")
  const debouncedLang = useDebounce(langInput, 300)

  // only update filters after debounce
  useEffect(() => {
    setFilters((prev) => ({ ...prev, language: debouncedLang || "all" }))
  }, [debouncedLang, setFilters])

  const handleClear = () => {
    setLangInput("")
    setFilters({ sortBy: "", language: "all" })
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 flex-wrap border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)]">

      {/* sort by stars */}
      <button
        onClick={() => setFilters({ ...filters, sortBy: filters.sortBy === "stars" ? "" : "stars" })}
        className={`text-xs px-3 py-1.5 rounded-full border transition-colors
          ${filters.sortBy === "stars"
            ? "bg-[#7C3AED] text-white border-[#7C3AED]"
            : "bg-[#EDE9FE] text-[#7C3AED] border-[#C4B5FD] hover:bg-[#DDD6FE] dark:bg-[#2D1F5E] dark:text-[#C4B5FD] dark:border-[#4C3A8A]"
          }`}
      >
        ⭐ Stars
      </button>

      {/* sort by forks */}
      <button
        onClick={() => setFilters({ ...filters, sortBy: filters.sortBy === "forks" ? "" : "forks" })}
        className={`text-xs px-3 py-1.5 rounded-full border transition-colors
          ${filters.sortBy === "forks"
            ? "bg-[#7C3AED] text-white border-[#7C3AED]"
            : "bg-[#EDE9FE] text-[#7C3AED] border-[#C4B5FD] hover:bg-[#DDD6FE] dark:bg-[#2D1F5E] dark:text-[#C4B5FD] dark:border-[#4C3A8A]"
          }`}
      >
        🍴 Forks
      </button>

      {/* language input with debounce */}
      <input
        type="text"
        value={langInput}
        onChange={(e) => setLangInput(e.target.value)}
        placeholder="Filter by language..."
        className="text-xs px-3 py-1.5 rounded-full border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)] placeholder-[var(--color-muted)] dark:placeholder-[var(--color-muted-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] w-40"
      />

      {/* clear filters */}
      {(filters.sortBy || filters.language !== "all") && (
        <button
          onClick={handleClear}
          className="text-xs px-3 py-1.5 rounded-full bg-[#EDE9FE] text-[#7C3AED] border border-[#C4B5FD] hover:bg-[#DDD6FE] dark:bg-[#2D1F5E] dark:text-[#C4B5FD] dark:border-[#4C3A8A] dark:hover:bg-[#3D2B7A] transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  )
}
