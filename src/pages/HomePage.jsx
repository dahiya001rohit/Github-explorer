import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import { useGitHubSearch } from '../hooks/useGitHubSearch'
import { useUserRepos } from '../hooks/useUserRepos'
import { useBookmarks } from '../hooks/useBookmarks'
import { SearchBar } from '../features/search/SearchBar'
import UserCard from '../features/search/UserCard'
import RepoList from '../features/repos/RepoList'
import { Loader } from '../components/Loader'
import { EmptyState } from '../components/EmptyState'

export const HomePage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { query, setQuery, users, loading: searchLoading, error: searchError } = useGitHubSearch()
  const { repos, loading: repoLoading, error: repoError, selectedUser, fetchRepos } = useUserRepos()
  const { bookmarks, isBookmarked, addBookmark, removeBookmark } = useBookmarks()
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)

  const handleBookmark = (repo) => {
    isBookmarked(repo.id) ? removeBookmark(repo.id) : addBookmark(repo)
  }

  const handleMobileUserSelect = (username) => {
    fetchRepos(username)
    setMobileDropdownOpen(false)
  }

  return (
    <div className="bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)] transition-colors duration-200 min-h-screen">

      {/* navbar */}
      <nav className="h-14 sticky top-0 z-50 w-full bg-[var(--color-surface)] dark:bg-[var(--color-bg-dark)] border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)] flex items-center justify-between px-4 transition-colors">

        {/* left: logo + brand */}
        <div className="flex items-center gap-3 shrink-0">
          <svg className="text-[var(--color-text)] dark:text-[var(--color-text-dark)]" fill="currentColor" height="32" viewBox="0 0 16 16" width="32">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          <span className="text-sm font-semibold text-[var(--color-text)] dark:text-[var(--color-text-dark)] hidden sm:block">GitHub Explorer</span>
        </div>

        {/* center: search */}
        <div className="flex-1 max-w-xl px-4 flex justify-center relative">
          <div className="w-full relative">
            <SearchBar
              query={query}
              setQuery={(val) => {
                setQuery(val)
                setMobileDropdownOpen(true)
              }}
            />

            {/* mobile dropdown */}
            {mobileDropdownOpen && query && (
              <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-md shadow-lg max-h-72 overflow-y-auto mt-1">
                {searchLoading && <Loader message="Searching..." />}
                {searchError && (
                  <p className="text-xs text-red-500 px-4 py-2">{searchError}</p>
                )}
                {!searchLoading && users.length === 0 && (
                  <p className="text-xs text-[var(--color-text-muted)] dark:text-[var(--color-muted-dark)] px-4 py-3">
                    No users found.
                  </p>
                )}
                {users.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    isSelected={selectedUser === user.login}
                    onClick={() => handleMobileUserSelect(user.login)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* right: actions */}
        <div className="flex items-center gap-1 shrink-0">
          <Link
            to="/bookmarks"
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--color-bg)] dark:hover:bg-[var(--color-bg-dark)] transition-all relative group"
            title="Bookmarks"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" className="text-[var(--color-text-muted)] dark:text-[var(--color-muted-dark)] group-hover:text-[var(--color-text)] dark:group-hover:text-[var(--color-text-dark)]">
              <path d="M3 2.75C3 1.784 3.784 1 4.75 1h6.5c.966 0 1.75.784 1.75 1.75v11.5a.75.75 0 0 1-1.227.579L8 11.722l-3.773 3.107A.751.751 0 0 1 3 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.91l3.023-2.489a.75.75 0 0 1 .954 0L11.5 12.66V2.75a.25.25 0 0 0-.25-.25Z"/>
            </svg>
            {bookmarks.length > 0 && (
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[var(--color-text)] dark:bg-[var(--color-text-dark)] rounded-full" />
            )}
          </Link>
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--color-bg)] dark:hover:bg-[var(--color-bg-dark)] transition-all"
            title="Toggle theme"
          >
            {theme === 'light' ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-[var(--color-text-muted)] dark:text-[var(--color-muted-dark)]">
                <path d="M9.598 1.591a.749.749 0 0 1 .785-.175 7 7 0 1 1-8.967 8.967.75.75 0 0 1 .961-.96 5.5 5.5 0 0 0 7.046-7.046.75.75 0 0 1 .175-.786Zm1.616 1.945a7 7 0 0 1-7.678 7.678 5.499 5.499 0 1 0 7.678-7.678Z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-[var(--color-text-muted)] dark:text-[var(--color-muted-dark)]">
                <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-1.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm5.657-8.157a.75.75 0 0 1 0 1.061l-.97.97a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.735l.97-.97a.75.75 0 0 1 1.06 0Zm-9.193 9.193a.75.75 0 0 1 0 1.061l-.97.97a.75.75 0 0 1-1.06-1.06l.97-.97a.75.75 0 0 1 1.06 0ZM8 1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1.5ZM8 12.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm7.25-4.25a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM2.25 8a.75.75 0 0 1-.75.75H0a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 2.25 8Z"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* main content */}
      <div className="flex h-[calc(100vh-56px)] overflow-hidden bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]">

        {/* sidebar — desktop only */}
        <aside className="hidden md:flex w-72 bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] border-r border-[var(--color-border)] dark:border-[var(--color-border-dark)] flex-col overflow-y-auto custom-scrollbar transition-colors">
          <div className="p-4">
            <h3 className="text-[11px] font-semibold text-[var(--color-text-muted)] dark:text-[var(--color-muted-dark)] uppercase tracking-wider mb-3">
              {query ? `Results for "${query}"` : 'Top Results'}
            </h3>
            <div className="space-y-1">
              {searchLoading && <Loader message="Searching..." />}
              {searchError && (
                <p className="text-xs text-red-500 px-2 py-1">{searchError}</p>
              )}
              {!searchLoading && query && users.length === 0 && (
                <EmptyState message="No users found." />
              )}
              {!searchLoading && !query && (
                <div className="flex flex-col items-center justify-center py-10 gap-2 text-center">
                  <svg fill="currentColor" height="32" viewBox="0 0 16 16" width="32" className="text-[var(--color-text-muted)] dark:text-[var(--color-muted-dark)]">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  <p className="text-[11px] text-[var(--color-text-muted)] dark:text-[var(--color-muted-dark)]">
                    Search for a GitHub user
                  </p>
                </div>
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
        </aside>

        {/* right panel */}
        <main className="flex-1 bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] flex flex-col overflow-hidden transition-colors">
          <header className="h-12 border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)] px-6 flex items-center shrink-0 bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] transition-colors">
            {selectedUser ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--color-text)] dark:text-[var(--color-text-dark)]">{selectedUser}</span>
                <span className="text-sm text-[var(--color-text-muted)] dark:text-[var(--color-muted-dark)]">/</span>
                <span className="text-sm font-semibold text-[var(--color-text)] dark:text-[var(--color-text-dark)]">repositories</span>
              </div>
            ) : (
              <p className="text-xs text-[var(--color-text-muted)] dark:text-[var(--color-muted-dark)]">
                Select a user to explore repositories
              </p>
            )}
          </header>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <RepoList
              repos={repos}
              loading={repoLoading}
              error={repoError}
              selectedUser={selectedUser}
              isBookmarked={isBookmarked}
              onBookmark={handleBookmark}
            />
          </div>
        </main>
      </div>
    </div>
  )
}