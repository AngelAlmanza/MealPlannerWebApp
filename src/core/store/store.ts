import { AuthSlice, IngredientsSlice, MealPlanItemsSlice, RecipeSlice } from "@/core/store/slices";
import unitMeasuresReducer from "@/core/store/slices/unitMeasuresSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    unitMeasures: unitMeasuresReducer,
    ingredients: IngredientsSlice.reducer,
    mealPlanItems: MealPlanItemsSlice.reducer,
    recipes: RecipeSlice.reducer,
  },
});