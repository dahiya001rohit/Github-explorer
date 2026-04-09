import { EmptyState } from './components/EmptyState'

export const App = () => {
  return (
    <div style={{ padding: "40px" }}>
      <h2>Default empty state:</h2>
      <EmptyState />

      <h2>No users found:</h2>
      <EmptyState message="No users found. Try a different search." />

      <h2>No repos found:</h2>
      <EmptyState message="No public repositories found." />

      <h2>No bookmarks:</h2>
      <EmptyState message="No bookmarks yet. Start exploring!" />
    </div>
  )
}
