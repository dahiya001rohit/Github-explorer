export const SearchBar = ({ query, setQuery }) => {
  return (
     <div className="w-full px-4 py-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search GitHub users..."
        className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:bg-[var(--color-surface-dark)] dark:text-[var(--color-text-dark)] dark:border-[var(--color-border-dark)] dark:placeholder-[var(--color-muted-dark)] dark:focus:ring-[var(--color-primary)]"
      />
    </div>
  )
}
