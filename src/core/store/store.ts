import { AuthSlice, IngredientsSlice, RecipeSlice } from "@/core/store/slices";
import unitMeasuresReducer from "@/core/store/slices/unitMeasuresSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    unitMeasures: unitMeasuresReducer,
    ingredients: IngredientsSlice.reducer,
    recipes: RecipeSlice.reducer,
  },
});