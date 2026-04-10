import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {HomePage} from './pages/HomePage'
import {BookmarksPage} from './pages/BookmarksPage'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
      </Routes>
    </BrowserRouter>
  )
}