const API_BASE = "https://api-alpha.grid.is";
const apiKey = process.env["GRID_API_KEY"];

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  if (!apiKey) {
    console.error("GRID_API_KEY environment variable not set");
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`GRID API request failed: ${response.statusText}`);
  }
  return response;
}
