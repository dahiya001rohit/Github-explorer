import axios from "axios";

// ============================================
// GitHub API Configuration
// ============================================

// Array of GitHub Personal Access Tokens for rotating through API requests.
// Add your tokens here to increase rate limits (60 req/hr unauthenticated → 5000 req/hr per token).
// Example: ["ghp_abc123...", "ghp_def456..."]
export const GITHUB_TOKENS = [];

// GitHub REST API v3 base URL — all requests are relative to this.
export const BASE_URL = "https://api.github.com";

// ============================================
// Axios Instance
// ============================================

// Pre-configured axios instance with GitHub API defaults.
// Using axios.create() lets us set baseURL and headers once,
// so every request automatically inherits them.
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

// ============================================
// Main Fetch Function
// ============================================

/**
 * githubFetch — Makes an authenticated (or unauthenticated) request to the GitHub API.
 *
 * @param {string} url - The API endpoint path (e.g., "/users/torvalds")
 * @returns {Promise<object>} - The parsed JSON response data
 *
 * Behavior:
 * - If no tokens are configured, makes an unauthenticated request.
 * - If tokens exist, tries each one sequentially.
 * - On a 403 (rate limit / forbidden), moves to the next token.
 * - If all tokens are exhausted, throws an error.
 */
export async function githubFetch(url) {
  // --- Case 1: No tokens available — make unauthenticated request ---
  if (GITHUB_TOKENS.length === 0) {
    try {
      const response = await apiClient.get(url);
      return response.data; // axios auto-parses JSON, so we return .data directly
    } catch (error) {
      console.error("API request failed (no auth):", error.message);
      if (error.response?.status === 404) throw new Error("User not found.")
      if (error.response?.status === 403) throw new Error("Rate limit exceeded. Try again later.")
      if (!error.response) throw new Error("Something went wrong. Check your connection.")
      throw error;
    }
  }

  // --- Case 2: Tokens available — rotate through them ---
  for (let i = 0; i < GITHUB_TOKENS.length; i++) {
    const token = GITHUB_TOKENS[i];

    try {
      // Attach the current token as a Bearer authorization header
      const response = await apiClient.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // Success — return parsed JSON data
    } catch (error) {
      // If we get a 403 (Forbidden / Rate Limited), try the next token
      if (error.response && error.response.status === 403) {
        console.warn(
          `Token ${i + 1} hit 403 (rate limit/forbidden). Trying next token...`
        );
        continue; // Move to the next token in the array
      }

      // For any other error (404, 500, network error, etc.), throw immediately
      if (error.response?.status === 404) throw new Error("User not found.")
      if (!error.response) throw new Error("Something went wrong. Check your connection.")
      console.error(`API request failed with token ${i + 1}:`, error.message);
      throw error;
    }
  }

  // --- Case 3: All tokens exhausted without a successful response ---
  throw new Error("All API keys exhausted. Try again later.");
}
