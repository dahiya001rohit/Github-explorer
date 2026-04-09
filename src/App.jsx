import React, { useEffect } from 'react'
import { filterAndSort, getUniqueLanguages } from './utils/filterAndSort'

const dummyRepos = [
  { name: "repo1", stargazers_count: 500, forks_count: 50, language: "JavaScript" },
  { name: "repo2", stargazers_count: 1200, forks_count: 30, language: "Python" },
  { name: "repo3", stargazers_count: 300, forks_count: 100, language: "JavaScript" },
  { name: "repo4", stargazers_count: 800, forks_count: 20, language: null },
  { name: "repo5", stargazers_count: 100, forks_count: 200, language: "TypeScript" },
];

export const App = () => {
  useEffect(() => {
    // Test 1: Sort all repos by stars
    console.log("Test 1 — Sort by stars (all):",
      filterAndSort(dummyRepos, { sortBy: "stars", language: "all" })
        .map(r => r.name)
    );

    // Test 2: Sort all repos by forks
    console.log("Test 2 — Sort by forks (all):",
      filterAndSort(dummyRepos, { sortBy: "forks", language: "all" })
        .map(r => r.name)
    );

    // Test 3: Filter by JavaScript, sort by stars
    console.log("Test 3 — JS only, sort by stars:",
      filterAndSort(dummyRepos, { sortBy: "stars", language: "javascript" })
        .map(r => r.name)
    );

    // Test 4: Confirm original array is NOT mutated
    filterAndSort(dummyRepos, { sortBy: "stars", language: "all" });
    console.log("Test 4 — Original not mutated:",
      dummyRepos.map(r => r.name)
    );

    // Test 5: Get unique languages
    console.log("Test 5 — Unique languages:", getUniqueLanguages(dummyRepos));
  }, []);

  return (
    <div>App</div>
  )
}

