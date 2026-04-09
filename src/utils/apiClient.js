import axios from "axios";

// Add GitHub PATs here to increase rate limits (60/hr → 5000/hr per token)
export const GITHUB_TOKENS = [];

export const BASE_URL = "https://api.github.com";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

export async function githubFetch(url) {
  // No tokens — make unauthenticated request
  if (GITHUB_TOKENS.length === 0) {
    try {
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error("API request failed (no auth):", error.message);
      if (error.response?.status === 404) throw new Error("User not found.")
      if (error.response?.status === 403) throw new Error("Rate limit exceeded. Try again later.")
      if (!error.response) throw new Error("Something went wrong. Check your connection.")
      throw error;
    }
  }

  // Rotate through tokens, skip to next on 403
  for (let i = 0; i < GITHUB_TOKENS.length; i++) {
    const token = GITHUB_TOKENS[i];

    try {
      const response = await apiClient.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.warn(`Token ${i + 1} hit 403. Trying next token...`);
        continue;
      }

      if (error.response?.status === 404) throw new Error("User not found.")
      if (!error.response) throw new Error("Something went wrong. Check your connection.")
      console.error(`API request failed with token ${i + 1}:`, error.message);
      throw error;
    }
  }

  throw new Error("All API keys exhausted. Try again later.");
}

