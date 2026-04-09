export const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="w-full px-4 py-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search GitHub users..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-white"
      />
    </div>
  )
}
