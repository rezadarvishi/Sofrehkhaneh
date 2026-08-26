import { useState, useEffect } from "react";
import { recipeService } from "../services/recipeService";
import { Recipe } from "../types/recipe";
export function useFeaturedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { recipeService.getFeatured().then(setRecipes).catch(console.error).finally(() => setLoading(false)); }, []);
  return { recipes, loading };
}
