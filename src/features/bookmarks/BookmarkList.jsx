import { RepoCard } from '../repos/RepoCard'
import { EmptyState } from '../../components/EmptyState'

export const BookmarkList = ({ bookmarks, isBookmarked, onBookmark }) => {
  if (bookmarks.length === 0) return (
    <EmptyState message="No bookmarks yet. Start exploring!" />
  )

  return (
    <div className="flex flex-col gap-3 p-4">
      <p className="text-xs text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
        {bookmarks.length} bookmarked {bookmarks.length === 1 ? "repository" : "repositories"}
      </p>
      {bookmarks.map((repo) => (
        <RepoCard
          key={repo.id}
          repo={repo}
          isBookmarked={isBookmarked(repo.id)}
          onBookmark={onBookmark}
        />
      ))}
    </div>
  )
}
