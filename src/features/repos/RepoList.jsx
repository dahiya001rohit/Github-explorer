import { useState, useMemo } from 'react'
import { filterAndSort } from '../../utils/filterAndSort'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import { RepoCard } from './RepoCard'
import { RepoFilters } from './RepoFilters'
import { Loader } from '../../components/Loader'
import { ErrorMessage } from '../../components/ErrorMessage'
import { EmptyState } from '../../components/EmptyState'

const RepoList = ({ repos, loading, error, selectedUser, isBookmarked, onBookmark }) => {
  const [filters, setFilters] = useState({ sortBy: "", language: "all" })
  
  const filteredRepos = useMemo(() => 
    filterAndSort(repos, filters), 
    [repos, filters]
  )
  
  const { visibleRepos, sentinelRef, scrollContainerRef, hasMore } = useInfiniteScroll(filteredRepos)

  if (!selectedUser) return (
    <EmptyState message="Select a user to see their repositories." />
  )

  if (loading) return <Loader message="Fetching repositories..." />

  if (error) return <ErrorMessage message={error} />

  if (!loading && repos.length === 0) return (
    <EmptyState message="No public repositories found." />
  )

  return (
    <div className="flex flex-col w-full h-full">
      <RepoFilters filters={filters} setFilters={setFilters} />

      {filteredRepos.length === 0 ? (
        <EmptyState message="No repositories match your filters." />
      ) : (
        <div ref={scrollContainerRef} className="flex flex-col gap-3 p-4 flex-1 overflow-y-auto">
          {visibleRepos.map((repo) => (
            <RepoCard
              key={repo.id}
              repo={repo}
              isBookmarked={isBookmarked(repo.id)}
              onBookmark={onBookmark}
            />
          ))}

          {/* sentinel for infinite scroll */}
          <div ref={sentinelRef} className="py-2 text-center text-xs text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
            {hasMore ? "Loading more..." : "All repositories loaded ✅"}
          </div>
        </div>
      )}
    </div>
  )
}

export default RepoList