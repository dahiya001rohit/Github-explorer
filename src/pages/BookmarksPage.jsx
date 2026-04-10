import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { useBookmarks } from '../hooks/useBookmarks'
import {BookmarkList} from '../features/bookmarks/BookmarkList'
import { Link } from 'react-router-dom'

const BookmarksPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
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
            to="/"
            className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] hover:text-[var(--color-primary)] transition-colors"
          >
            ← Back to Search
          </Link>
          <button
            onClick={toggleTheme}
            className="text-sm px-3 py-1.5 rounded-full border border-[var(--color-border)] dark:border-[var(--color-border-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:border-[var(--color-primary)] transition-colors"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </nav>

      {/* content */}
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-xl font-bold text-[var(--color-text)] dark:text-[var(--color-text-dark)] mb-6">
          Bookmarked Repositories
        </h1>
        <BookmarkList
          bookmarks={bookmarks}
          isBookmarked={isBookmarked}
          onBookmark={handleBookmark}
        />
      </div>
    </div>
  )
}

export default BookmarksPage