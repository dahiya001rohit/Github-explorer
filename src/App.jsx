import React, { useEffect } from 'react'
import { useUserRepos } from './hooks/useUserRepos'
import { useInfiniteScroll } from './hooks/useInfiniteScroll'

export const App = () => {
  const { repos, loading, error, fetchRepos } = useUserRepos();
  const { visibleRepos, sentinelRef, hasMore } = useInfiniteScroll(repos);

  // Fetch torvalds repos on mount
  useEffect(() => {
    fetchRepos("torvalds");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (visibleRepos.length > 0) {
      console.log(`Visible repos: ${visibleRepos.length} of ${repos.length}`);
    }
  }, [visibleRepos]);

  return (
    <div style={{ padding: "40px", fontFamily: "monospace" }}>
      <h2>useInfiniteScroll Test</h2>

      {loading && <p style={{ color: "#666" }}>Loading repos...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {visibleRepos.length > 0 && (
        <div style={{
          maxHeight: "400px",
          overflowY: "scroll",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "12px",
        }}>
          {visibleRepos.map((repo) => (
            <div key={repo.id} style={{
              padding: "10px 8px",
              borderBottom: "1px solid #eee",
            }}>
              ⭐ {repo.stargazers_count} — <strong>{repo.name}</strong>
            </div>
          ))}

          <div ref={sentinelRef} style={{ padding: "12px", textAlign: "center" }}>
            {hasMore ? (
              <span style={{ color: "#666" }}>Loading more...</span>
            ) : (
              <span style={{ color: "#4caf50" }}>✅ All repos loaded</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
