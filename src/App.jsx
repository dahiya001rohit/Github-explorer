import { useUserRepos } from './hooks/useUserRepos'
import { useBookmarks } from './hooks/useBookmarks'
import RepoList from './features/repos/RepoList'

export const App = () => {
  const { repos, loading, error, selectedUser, fetchRepos } = useUserRepos()
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks()

  const handleBookmark = (repo) => {
    isBookmarked(repo.id) ? removeBookmark(repo.id) : addBookmark(repo)
  }

  return (
    <div style={{ padding: "40px", maxWidth: "600px" }}>
      <h2>RepoList test:</h2>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button onClick={() => fetchRepos("torvalds")}>Load torvalds</button>
        <button onClick={() => fetchRepos("dahiya001rohit")}>Load mine</button>
        <button onClick={() => fetchRepos("thisuserdoesnotexist123456")}>Load invalid</button>
      </div>
      <RepoList
        key={selectedUser}
        repos={repos}
        loading={loading}
        error={error}
        selectedUser={selectedUser}
        isBookmarked={isBookmarked}
        onBookmark={handleBookmark}
      />
    </div>
  )
}