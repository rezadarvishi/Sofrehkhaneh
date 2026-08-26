import { apiClient } from "./apiClient";
import { Recipe } from "../types/recipe";
export const recipeService = {
  async getFeatured(): Promise<Recipe[]> { const res = await apiClient.get<{ data: Recipe[] }>("/recipes/featured"); return res.data; },
  async getById(id: string): Promise<Recipe> { const res = await apiClient.get<{ data: Recipe }>(`/recipes/${id}`); return res.data; },
  async getByProvince(provinceId: string): Promise<Recipe[]> { const res = await apiClient.get<{ data: Recipe[] }>(`/recipes?provinceId=${provinceId}`); return res.data; },
  async search(query: string): Promise<Recipe[]> { const res = await apiClient.get<{ data: Recipe[] }>(`/recipes/search?q=${encodeURIComponent(query)}`); return res.data; },
  async toggleSave(recipeId: string, action: "save" | "unsave"): Promise<void> { await apiClient.patch(`/recipes/${recipeId}/save`, { action }); }
};
