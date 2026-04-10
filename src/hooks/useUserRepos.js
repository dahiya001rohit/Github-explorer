import { useState } from "react";
import { githubFetchAll } from "../utils/apiClient";

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
      const data = await githubFetchAll(`/users/${username}/repos?sort=updated`)
      setRepos(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { repos, loading, error, selectedUser, fetchRepos };
}