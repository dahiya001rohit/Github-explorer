import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import { useBookmarks } from '../hooks/useBookmarks'
import { BookmarkList } from '../features/bookmarks/BookmarkList'

export const BookmarksPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { bookmarks, isBookmarked, addBookmark, removeBookmark } = useBookmarks()

  const handleBookmark = (repo) => {
    isBookmarked(repo.id) ? removeBookmark(repo.id) : addBookmark(repo)
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

        {/* right: actions */}
        <div className="flex items-center gap-1 shrink-0 ml-auto">
          <Link
            to="/"
            className="h-8 px-3 flex items-center gap-1.5 rounded-md text-xs font-medium border border-[var(--color-border)] dark:border-[var(--color-border-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:bg-[var(--color-bg)] dark:hover:bg-[var(--color-bg-dark)] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M7.78 12.53a.75.75 0 0 1-1.06 0L2.47 8.28a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L4.81 7h7.44a.75.75 0 0 1 0 1.5H4.81l2.97 2.97a.75.75 0 0 1 0 1.06Z"/>
            </svg>
            <span className="hidden sm:block">Back to Search</span>
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

      {/* page header */}
      <div className="border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] transition-colors">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
          <h1 className="text-lg font-bold text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
            Bookmarked Repositories
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] dark:text-[var(--color-muted-dark)] mt-1">
            {bookmarks.length > 0
              ? `${bookmarks.length} saved ${bookmarks.length === 1 ? 'repository' : 'repositories'}`
              : 'No bookmarks yet — start exploring'}
          </p>
        </div>
      </div>

      {/* content */}
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6 py-6">
        <BookmarkList
          bookmarks={bookmarks}
          isBookmarked={isBookmarked}
          onBookmark={handleBookmark}
        />
      </div>
    </div>
  )
}