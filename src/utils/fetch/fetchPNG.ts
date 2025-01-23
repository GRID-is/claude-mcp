import { type RequestInit } from "node-fetch";
import { fetchWithAuth } from "./fetchWithAuth.js";

export async function fetchPNG(endpoint: string, options: RequestInit = {}) {
  const response = await fetchWithAuth(endpoint, options);
  return Buffer.from(await response.arrayBuffer()).toString("base64");
}
