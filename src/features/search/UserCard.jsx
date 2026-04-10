const UserCard = ({ user, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-surface-dark)] transition-colors
        ${isSelected
          ? "bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] border-l-4 border-l-[var(--color-primary)]"
          : "bg-transparent"
        }`}
    >
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-9 h-9 rounded-full object-cover"
      />
      <span className="text-sm font-medium text-[var(--color-text)] dark:text-[var(--color-text-dark)] truncate">
        {user.login}
      </span>
    </div>
  )
}

export default UserCard