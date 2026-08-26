export type MealType = "appetizer" | "main" | "dessert" | "pastry" | "bread" | "drink" | "side";
export type DifficultyLevel = "easy" | "medium" | "hard";
export interface Ingredient { id: string; name: string; amount: number | null; unit: string | null; note?: string; }
export interface RecipeStep { id: string; order: number; text: string; imageUrl?: string; videoUrl?: string; timerSeconds?: number; }
export interface RecipeMedia { type: "image" | "video"; url: string; isCover?: boolean; }
export interface RecipeAuthor { id: string; displayName: string; avatarUrl?: string; provinceId?: string; isVerified?: boolean; }
export interface Recipe {
  id: string; title: string; description: string; mealType: MealType;
  provinceId: string | null; ethnicGroup?: string; tags: string[];
  ingredients: Ingredient[]; steps: RecipeStep[]; media: RecipeMedia[];
  servings: number; prepTimeMinutes: number; cookTimeMinutes: number;
  difficulty: DifficultyLevel; author: RecipeAuthor; isUserSubmitted: boolean;
  isApproved: boolean; createdAt: string; updatedAt: string;
  savedCount?: number; viewCount?: number;
}
export interface OfflineRecipeRecord { recipeId: string; downloadedAt: string; recipeSnapshot: Recipe; mediaCachedLocally: boolean; }
