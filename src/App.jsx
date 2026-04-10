import { useBookmarks } from './hooks/useBookmarks'
import { BookmarkList } from './features/bookmarks/BookmarkList'

const dummyRepos = [
  { id: 1, name: "linux", html_url: "https://github.com/torvalds/linux", description: "Linux kernel", stargazers_count: 180000, forks_count: 52000, language: "C" },
  { id: 2, name: "react", html_url: "https://github.com/facebook/react", description: "React library", stargazers_count: 220000, forks_count: 45000, language: "JavaScript" },
]

export const App = () => {
  const { bookmarks, addBookmark, isBookmarked, removeBookmark } = useBookmarks()

  const handleBookmark = (repo) => {
    isBookmarked(repo.id) ? removeBookmark(repo.id) : addBookmark(repo)
  }

  return (
    <div style={{ padding: "40px", maxWidth: "600px" }}>
      <h2>BookmarkList test:</h2>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button onClick={() => addBookmark(dummyRepos[0])}>Bookmark linux</button>
        <button onClick={() => addBookmark(dummyRepos[1])}>Bookmark react</button>
      </div>
      <BookmarkList
        bookmarks={bookmarks}
        isBookmarked={isBookmarked}
        onBookmark={handleBookmark}
      />
    </div>
  )
}