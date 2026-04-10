import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { BookmarksPage } from './pages/BookmarksPage'
import { useGitHubSearch } from './hooks/useGitHubSearch'
import { useUserRepos } from './hooks/useUserRepos'

export const App = () => {
  const searchState = useGitHubSearch()
  const repoState = useUserRepos()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage searchState={searchState} repoState={repoState} />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
      </Routes>
    </BrowserRouter>
  )
}