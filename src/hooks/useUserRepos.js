import { useState } from "react";
import { githubFetch } from "../utils/apiClient";

export function useUserRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchRepos = async (username) => {
    setSelectedUser(username);

    if (!username) {
      setRepos([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await githubFetch(
        `/users/${username}/repos?per_page=100&sort=updated`
      );
      setRepos(response || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { repos, loading, error, selectedUser, fetchRepos };
}
