import { useState } from 'react'
import {RepoCard} from './features/repos/RepoCard'

const dummyRepo = {
  id: 1,
  name: "linux",
  html_url: "https://github.com/torvalds/linux",
  description: "Linux kernel source tree",
  stargazers_count: 180000,
  forks_count: 52000,
  language: "C"
}

export const App = () => {
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <div style={{ padding: "40px", maxWidth: "400px" }}>
      <h2>RepoCard test:</h2>
      <RepoCard
        repo={dummyRepo}
        isBookmarked={bookmarked}
        onBookmark={() => setBookmarked(!bookmarked)}
      />
    </div>
  )
}