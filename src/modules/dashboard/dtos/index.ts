export interface CreateMealItemDto {
  mealType: number;
  recipeId: string;
  date: string;
}

export interface UpdateMealItemDto {
  id: number;
  mealType: number;
  recipeId: string;
  date: string;
}