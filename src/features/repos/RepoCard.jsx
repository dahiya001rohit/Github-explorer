import { formatNumber } from '../../utils/formatNumbers'

export const RepoCard = ({ repo, isBookmarked, onBookmark }) => {
  return (
    <div className="pb-6 border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)]">

      {/* repo name + bookmark button */}
      <div className="flex justify-between items-start mb-1">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-lg font-bold text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:underline cursor-pointer"
        >
          {repo.name}
        </a>
        <button
          onClick={() => onBookmark(repo)}
          className={`px-2 py-0.5 border rounded-full text-[10px] font-medium uppercase shrink-0 transition-colors
            ${isBookmarked
              ? "bg-[var(--color-text)] dark:bg-[var(--color-text-dark)] text-[var(--color-surface)] dark:text-[var(--color-surface-dark)] border-[var(--color-text)] dark:border-[var(--color-text-dark)]"
              : "border-[var(--color-border)] dark:border-[var(--color-border-dark)] text-[var(--color-text-muted)] dark:text-[var(--color-muted-dark)] hover:bg-[var(--color-bg)] dark:hover:bg-[var(--color-bg-dark)]"
            }`}
        >
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>

      {/* description */}
      <p className="text-sm text-[var(--color-text-muted)] dark:text-[var(--color-muted-dark)] mb-4 leading-normal">
        {repo.description || "No description provided."}
      </p>

      {/* stats */}
      <div className="flex flex-wrap items-center gap-4 text-[11px] text-[var(--color-text-muted)] dark:text-[var(--color-muted-dark)] font-medium">
        {repo.language && (
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-[var(--color-text)] dark:bg-[var(--color-text-dark)]" />
            {repo.language}
          </div>
        )}
        <div className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
          </svg>
          {formatNumber(repo.stargazers_count)}
        </div>
        <div className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
          </svg>
          {formatNumber(repo.forks_count)}
        </div>
      </div>
    </div>
  )
}