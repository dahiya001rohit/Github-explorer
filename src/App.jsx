import React, { useEffect } from 'react'
import { useGitHubSearch } from './hooks/useGitHubSearch'

export const App = () => {
  const { query, setQuery, users, loading, error } = useGitHubSearch();

  // Log users array whenever it updates
  useEffect(() => {
    if (users.length > 0) {
      console.log("Users found:", users.map(u => ({
        login: u.login,
        avatar_url: u.avatar_url,      
      })));
    }
  }, [users]);

  return (
    <div style={{ padding: "40px", fontFamily: "monospace" }}>
      <h2>useGitHubSearch Test</h2>

      <input
        type="text"
        placeholder="Search GitHub users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "10px 16px",
          fontSize: "16px",
          width: "350px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {/* Loading state */}
      {loading && (
        <p style={{ color: "#666", marginTop: "16px" }}>Loading...</p>
      )}

      {/* Error state */}
      {error && (
        <p style={{ color: "red", marginTop: "16px" }}>Error: {error}</p>
      )}

      {/* Empty state — query exists but no results */}
      {!loading && !error && query && users.length === 0 && (
        <p style={{ color: "#999", marginTop: "16px" }}>No users found</p>
      )}

      {/* Results */}
      {users.length > 0 && (
        <div style={{ marginTop: "16px" }}>
          <p><strong>Found {users.length} users:</strong></p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {users.map((user) => (
              <li key={user.id} style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "8px 0",
                borderBottom: "1px solid #eee",
              }}>
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
                <span>{user.login}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
