export const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search GitHub users..."
        className="w-full h-8 px-4 rounded-md border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)] placeholder-[var(--color-text-muted)] dark:placeholder-[var(--color-muted-dark)] focus:outline-none focus:ring-1 focus:ring-[var(--color-text)] dark:focus:ring-[var(--color-text-dark)] focus:border-[var(--color-text)] dark:focus:border-[var(--color-text-dark)] transition-all text-sm"
      />
    </div>
  )
}