export function filterAndSort(repos, { sortBy, language }) {
  if (!repos) return [];

  let filtered = repos;

  // Filter by language (case-insensitive), skip if "all" or empty
  if (language && language.toLowerCase() !== "all") {
    filtered = repos.filter((repo) => {
      if (!language || language === "all") return true
      return repo.language?.toLowerCase().includes(language.toLowerCase())
    })
  }

  // Shallow copy to avoid mutating original
  const sorted = [...filtered];

  if (sortBy === "stars") {
    sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
  } else if (sortBy === "forks") {
    sorted.sort((a, b) => b.forks_count - a.forks_count);
  }

  return sorted;
}

export function getUniqueLanguages(repos) {
  if (!repos) return [];

  const languages = repos
    .map((repo) => repo.language)
    .filter((lang) => lang !== null && lang !== undefined);

  return [...new Set(languages)].sort();
}

