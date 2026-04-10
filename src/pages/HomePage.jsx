import { useTheme } from '../hooks/useTheme'
import { useGitHubSearch } from '../hooks/useGitHubSearch'
import { useUserRepos } from '../hooks/useUserRepos'
import { useBookmarks } from '../hooks/useBookmarks'
import { SearchBar } from '../features/search/SearchBar'
import UserCard from '../features/search/UserCard'
import RepoList from '../features/repos/RepoList'
import { Loader } from '../components/Loader'
import { EmptyState } from '../components/EmptyState'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const { theme, toggleTheme } = useTheme()
  const { query, setQuery, users, loading: searchLoading, error: searchError } = useGitHubSearch()
  const { repos, loading: repoLoading, error: repoError, selectedUser, fetchRepos } = useUserRepos()
  const { bookmarks, isBookmarked, addBookmark, removeBookmark } = useBookmarks()

  const handleBookmark = (repo) => {
    isBookmarked(repo.id) ? removeBookmark(repo.id) : addBookmark(repo)
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]">

      {/* navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)]">
        <span className="text-lg font-bold text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
          GitHub Explorer
        </span>
        <div className="flex items-center gap-4">
          <Link
            to="/bookmarks"
            className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] hover:text-[var(--color-primary)] transition-colors"
          >
            Bookmarks {bookmarks.length > 0 && `(${bookmarks.length})`}
          </Link>
          <button
            onClick={toggleTheme}
            className="text-sm px-3 py-1.5 rounded-full border border-[var(--color-border)] dark:border-[var(--color-border-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:border-[var(--color-primary)] transition-colors"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </nav>

      {/* main layout */}
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">

        {/* sidebar */}
        <div className="w-72 shrink-0 border-r border-[var(--color-border)] dark:border-[var(--color-border-dark)] flex flex-col overflow-hidden">
          <SearchBar query={query} setQuery={setQuery} />

          <div className="flex-1 overflow-y-auto">
            {searchLoading && <Loader message="Searching users..." />}
            {searchError && (
              <p className="text-xs text-red-500 px-4">{searchError}</p>
            )}
            {!searchLoading && query && users.length === 0 && (
              <EmptyState message="No users found." />
            )}
            {!searchLoading && !query && (
              <EmptyState message="Search for a GitHub user." />
            )}
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                isSelected={selectedUser === user.login}
                onClick={() => fetchRepos(user.login)}
              />
            ))}
          </div>
        </div>

        {/* repo panel */}
        <div className="flex-1 overflow-y-auto h-full">
          <RepoList
            repos={repos}
            loading={repoLoading}
            error={repoError}
            selectedUser={selectedUser}
            isBookmarked={isBookmarked}
            onBookmark={handleBookmark}
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage