// hooks/useBookmarks.js
import { useState, useEffect } from "react";


const BOOKMARKS_KEY = "gh_explorer_bookmarks";

// read from localStorage safely
const getStoredBookmarks = () => {
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};


export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(getStoredBookmarks);

  // sync to localStorage on every change
  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (repo) => {
    setBookmarks((prev) =>
      prev.find((r) => r.id === repo.id) ? prev : [...prev, repo]
    );
  };

  const removeBookmark = (repoId) => {
    setBookmarks((prev) => prev.filter((r) => r.id !== repoId));
  };

  const isBookmarked = (repoId) => {
    return bookmarks.some((r) => r.id === repoId);
  };

  return { bookmarks, addBookmark, removeBookmark, isBookmarked };
}