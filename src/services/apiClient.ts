import { API_BASE_URL } from "../config/env";
import * as SecureStore from "expo-secure-store";
async function request<T>(method: string, path: string, body?: any): Promise<T> {
  const token = await SecureStore.getItemAsync("auth_token");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE_URL}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "خطایی در ارتباط با سرور رخ داد");
  return json as T;
}
export const apiClient = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body: any) => request<T>("POST", path, body),
  patch: <T>(path: string, body: any) => request<T>("PATCH", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
};
