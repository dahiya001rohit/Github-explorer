import React, { useEffect } from 'react'
import { useUserRepos } from './hooks/useUserRepos'

export const App = () => {
  const { repos, loading, error, selectedUser, fetchRepos } = useUserRepos();

  useEffect(() => {
    if (repos.length > 0) {
      console.log(`Repos loaded: ${repos.length} repos, first: "${repos[0].name}"`);
    }
  }, [repos]);

  const btnStyle = {
    padding: "10px 20px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
    marginRight: "10px",
  };

  return (
    <div style={{ padding: "40px", fontFamily: "monospace" }}>
      <h2>useUserRepos Test</h2>

      <div style={{ marginBottom: "20px" }}>
        <button style={btnStyle} onClick={() => fetchRepos("torvalds")}>
          Load torvalds repos
        </button>
        <button style={btnStyle} onClick={() => fetchRepos("thisuserdoesnotexist123456789")}>
          Load invalid user
        </button>
      </div>

      {loading && <p style={{ color: "#666" }}>Loading repos...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && selectedUser && repos.length === 0 && (
        <p style={{ color: "#999" }}>No public repositories found</p>
      )}

      {repos.length > 0 && (
        <div>
          <p><strong>{selectedUser}'s repos ({repos.length}):</strong></p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {repos.slice(0, 10).map((repo) => (
              <li key={repo.id} style={{ padding: "6px 0", borderBottom: "1px solid #eee" }}>
                ⭐ {repo.stargazers_count} — <strong>{repo.name}</strong>
              </li>
            ))}
          </ul>
          {repos.length > 10 && (
            <p style={{ color: "#999" }}>...and {repos.length - 10} more</p>
          )}
        </div>
      )}
    </div>
  )
}

