import { fetchWithAuth } from "./fetchWithAuth.js";

export async function fetchJSON<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetchWithAuth(endpoint, options);
  return response.json() as Promise<T>;
}
