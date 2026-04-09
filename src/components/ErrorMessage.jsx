export const ErrorMessage = ({ message = "Something went wrong." }) => {
  return (
     <div className="flex flex-col items-center justify-center py-10 gap-2">
      <span className="text-3xl">⚠️</span>
      <p className="text-sm font-medium text-red-500 dark:text-red-400">{message}</p>
    </div>
  )
}
