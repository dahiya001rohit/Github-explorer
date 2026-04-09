const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <div className="w-8 h-8 border-4 border-black border-t-white rounded-full animate-spin dark:border-white dark:border-t-black" />
      <p className="text-sm text-black dark:text-white">{message}</p>
    </div>
  )
}

export default Loader