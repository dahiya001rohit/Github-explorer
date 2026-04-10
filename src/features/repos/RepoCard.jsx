import { formatNumber } from '../../utils/formatNumbers'

export const RepoCard = ({ repo, isBookmarked, onBookmark }) => {
  return (
    <div className="p-4 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] flex flex-col gap-2 hover:shadow-md transition-shadow">

      {/* repo name + bookmark */}
      <div className="flex items-center justify-between gap-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-[var(--color-primary)] hover:underline truncate"
        >
          {repo.name}
        </a>
        <button
          onClick={() => onBookmark(repo)}
          className={`text-xs font-medium px-2 py-1 rounded-full border transition-colors shrink-0
            ${isBookmarked
              ? "bg-[#7C3AED] text-white border-[#7C3AED]"
              : "bg-[#EDE9FE] text-[#7C3AED] border-[#C4B5FD] hover:bg-[#DDD6FE] dark:bg-[#2D1F5E] dark:text-[#C4B5FD] dark:border-[#4C3A8A] dark:hover:bg-[#3D2B7A]"
            }`}
        >
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>

      {/* description + language inline justified */}
      <div className="flex items-start justify-between gap-2">
        {repo.description ? (
          <p className="text-xs text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] line-clamp-2 flex-1">
            {repo.description}
          </p>
        ) : (
          <p className="text-xs text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] italic flex-1">
            No description provided.
          </p>
        )}
        {repo.language && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#EDE9FE] text-[#7C3AED] dark:bg-[#2D1F5E] dark:text-[#C4B5FD] shrink-0">
            {repo.language}
          </span>
        )}
      </div>

      {/* stars + forks */}
      <div className="flex items-center gap-4 mt-1">
        <span className="text-xs text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] flex items-center gap-1">
          ⭐ {formatNumber(repo.stargazers_count)}
        </span>
        <span className="text-xs text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] flex items-center gap-1">
          🍴 {formatNumber(repo.forks_count)}
        </span>
      </div>
    </div>
  )
}

