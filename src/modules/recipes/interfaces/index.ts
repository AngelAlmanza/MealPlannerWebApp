import { Ingredient } from "@/modules/ingredients/interfaces";

export interface Recipe {
  id: number;
  name: string;
  description: string;
  servings: number;
  url: string | null;
  ingredients: RecipeIngredients[];
}

export interface RecipeIngredients {
  id: number;
  quantity: number;
  ingredient: Ingredient;
}
