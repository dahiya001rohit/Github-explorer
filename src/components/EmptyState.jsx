export const EmptyState = ({ message = "Nothing to show here." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-2">
      <span className="text-4xl">🔍</span>
      <p className="text-sm font-medium text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">{message}</p>
    </div>
  )
}