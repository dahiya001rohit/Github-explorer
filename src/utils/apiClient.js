import axios from "axios";

export const GITHUB_TOKENS = [
  import.meta.env.VITE_GITHUB_TOKEN_1,
  import.meta.env.VITE_GITHUB_TOKEN_2,
].filter(Boolean)

export const BASE_URL = "https://api.github.com";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

// makes a single request with optional token
async function makeRequest(url, token = null) {
  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {}

  const response = await apiClient.get(url, config)
  return response.data
}

// handles errors consistently
function handleError(error) {
  if (error.response?.status === 404) throw new Error("User not found.")
  if (error.response?.status === 403) throw new Error("Rate limit exceeded. Try again later.")
  if (!error.response) throw new Error("Something went wrong. Check your connection.")
  throw error
}

export async function githubFetch(url) {
  // try each token first
  for (let i = 0; i < GITHUB_TOKENS.length; i++) {
    try {
      return await makeRequest(url, GITHUB_TOKENS[i])
    } catch (error) {
      if (error.response?.status === 403) {
        console.warn(`Token ${i + 1} hit 403. Trying next...`)
        continue
      }
      handleError(error)
    }
  }

  // all tokens exhausted or no tokens — fallback to unauthenticated
  console.warn("Falling back to unauthenticated request...")
  try {
    return await makeRequest(url)
  } catch (error) {
    handleError(error)
  }
}

// fetches ALL pages of a paginated endpoint
export async function githubFetchAll(baseUrl) {
  let page = 1
  let allData = []

  while (true) {
    const separator = baseUrl.includes('?') ? '&' : '?'
    const data = await githubFetch(`${baseUrl}${separator}per_page=100&page=${page}`)

    if (!data || data.length === 0) break

    allData = [...allData, ...data]

    if (data.length < 100) break

    page++
  }

  return allData
}