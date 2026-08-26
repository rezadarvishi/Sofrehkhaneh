import { apiClient } from './apiClient';

export interface AIEnhancementResult {
  title: string;
  description: string;
  ingredients: { name: string; amount: number | null; unit: string | null; note?: string }[];
  steps: string[];
  suggestedTags: string[];
  suggestedDifficulty: 'easy' | 'medium' | 'hard';
  editSummary: string;
}

export const aiService = {
  async enhanceRecipe(draft: any): Promise<AIEnhancementResult> {
    const res = await apiClient.post<{ data: AIEnhancementResult }>('/ai/enhance-recipe', draft);
    return res.data;
  }
};