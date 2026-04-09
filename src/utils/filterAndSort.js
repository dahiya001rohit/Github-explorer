/**
 * filterAndSort — Filters repos by language and sorts by stars or forks.
 *
 * @param {Array} repos - Array of GitHub repo objects
 * @param {Object} options - Filter & sort options
 * @param {string} options.sortBy - "stars" or "forks"
 * @param {string} options.language - Language name or "all"
 * @returns {Array} - New filtered and sorted array (never mutates original)
 */
export function filterAndSort(repos, { sortBy, language }) {
  // Handle null or undefined repos
  if (!repos) return [];

  // --- Step 1: FILTER by language ---
  // If language is "all" or empty/falsy, keep all repos
  // Otherwise, match repo.language case-insensitively
  let filtered = repos;

  if (language && language.toLowerCase() !== "all") {
    filtered = repos.filter(
      (repo) =>
        repo.language &&
        repo.language.toLowerCase() === language.toLowerCase()
    );
  }

  // --- Step 2: SORT the filtered results ---
  // Always create a shallow copy to avoid mutating the original array
  const sorted = [...filtered];

  if (sortBy === "stars") {
    // Sort by stargazers_count, highest first (descending)
    sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
  } else if (sortBy === "forks") {
    // Sort by forks_count, highest first (descending)
    sorted.sort((a, b) => b.forks_count - a.forks_count);
  }
  // If sortBy is neither "stars" nor "forks", return as-is (no sorting)

  return sorted;
}

/**
 * getUniqueLanguages — Extracts unique, non-null languages from repos.
 *
 * @param {Array} repos - Array of GitHub repo objects
 * @returns {Array<string>} - Sorted array of unique language names
 */
export function getUniqueLanguages(repos) {
  // Handle null or undefined repos
  if (!repos) return [];

  // 1. Extract all language values
  // 2. Filter out null/undefined languages
  // 3. Use a Set to get unique values
  // 4. Sort alphabetically
  const languages = repos
    .map((repo) => repo.language)
    .filter((lang) => lang !== null && lang !== undefined);

  return [...new Set(languages)].sort();
}
