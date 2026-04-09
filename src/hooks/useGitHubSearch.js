import { useState, useEffect } from "react";
import { githubFetch } from "../utils/apiClient";
import { useDebounce, DEBOUNCE_DELAY } from "./useDebounce";

export function useGitHubSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setUsers([]);
      setError(null);
      setLoading(false);
      return;
    }

    // Prevents stale state updates on StrictMode re-runs or fast query changes
    let cancelled = false;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await githubFetch(
          `/search/users?q=${encodeURIComponent(debouncedQuery)}&per_page=10`
        );

        if (!cancelled) setUsers(response.items || []);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchUsers();

    return () => { cancelled = true; };
  }, [debouncedQuery]);

  return { query, setQuery, users, loading, error };
}

