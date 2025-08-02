export interface MealPlanItem {
  id:       number;
  date:     Date;
  mealType: number;
  recipe:   Recipe;
}

export interface Recipe {
  id:          number;
  name:        string;
  description: null;
  servings:    number;
  url:         null;
  ingredients: RecipeIngredient[];
}

export interface RecipeIngredient {
  id:         number;
  quantity:   number;
  ingredient: Ingredient;
}

export interface Ingredient {
  id:            number;
  name:          string;
  unitMeasureId: number;
  unitMeasure:   UnitMeasure;
}

export interface UnitMeasure {
  id:           number;
  name:         string;
  abbreviation: string;
}
