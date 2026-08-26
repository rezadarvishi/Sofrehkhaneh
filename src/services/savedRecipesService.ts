import AsyncStorage from "@react-native-async-storage/async-storage";
import { Recipe } from "../types/recipe";
const SAVED_KEY = "saved_recipes_offline";
export const savedRecipesService = {
  async getSaved(): Promise<Recipe[]> { const raw = await AsyncStorage.getItem(SAVED_KEY); return raw ? JSON.parse(raw) : []; },
  async save(recipe: Recipe): Promise<void> { const saved = await this.getSaved(); if (!saved.find(r => r.id === recipe.id)) { saved.push(recipe); await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(saved)); } },
  async unsave(recipeId: string): Promise<void> { const saved = await this.getSaved(); const filtered = saved.filter(r => r.id !== recipeId); await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(filtered)); }
};
