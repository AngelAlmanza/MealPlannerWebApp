export interface CreateRecipeDto {
  name: string;
  instructions: string;
  servings: number;
  url: string | null;
  ingredients: { ingredientId: number; quantity: number }[];
}

export interface UpdateRecipeDto {
  id: number;
  name: string;
  instructions: string;
  servings: number;
  url: string | null;
  ingredients: { ingredientId: number; quantity: number }[];
}