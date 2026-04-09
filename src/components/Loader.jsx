export const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <div className="w-8 h-8 border-4 border-[var(--color-border)] border-t-[var(--color-primary)] rounded-full animate-spin dark:border-[var(--color-border-dark)] dark:border-t-[var(--color-primary)]" />
      <p className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">{message}</p>
    </div>
  )
}

