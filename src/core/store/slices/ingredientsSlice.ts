import { Ingredient } from '@/modules/ingredients/interfaces';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { createIngredient, deleteIngredient, getIngredients, updateIngredient } from '../thunks/ingredientThunks';

interface IngredientsState {
  ingredients: Ingredient[];
  selectedIngredient: Ingredient | null;
  isIngredientsLoading: boolean;
  shouldNavigateIngredients: boolean;
}

const initialState: IngredientsState = {
  ingredients: [],
  selectedIngredient: null,
  isIngredientsLoading: false,
  shouldNavigateIngredients: false,
};

export const IngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.ingredients = action.payload;
    },
    setSelectedIngredient: (state, action: PayloadAction<Ingredient | null>) => {
      state.selectedIngredient = action.payload;
    },
    setIsIngredientsLoading: (state, action: PayloadAction<boolean>) => {
      state.isIngredientsLoading = action.payload;
    },
    setShouldNavigateIngredients: (state, action: PayloadAction<boolean>) => {
      state.shouldNavigateIngredients = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getIngredients.pending, (state) => {
      state.isIngredientsLoading = true;
    });
    builder.addCase(getIngredients.rejected, (state) => {
      state.isIngredientsLoading = false;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.isIngredientsLoading = false;
      // Sort ingredients by name ascending
      const sortedIngredients = action.payload.sort((a, b) => a.name.localeCompare(b.name));
      state.ingredients = sortedIngredients;
    });

    builder.addCase(createIngredient.pending, (state) => {
      state.isIngredientsLoading = true;
    });
    builder.addCase(createIngredient.rejected, (state) => {
      state.isIngredientsLoading = false;
    });
    builder.addCase(createIngredient.fulfilled, (state, action) => {
      state.isIngredientsLoading = false;
      state.ingredients.push(action.payload);
      state.shouldNavigateIngredients = true;
    });

    builder.addCase(updateIngredient.pending, (state) => {
      state.isIngredientsLoading = true;
    });
    builder.addCase(updateIngredient.rejected, (state) => {
      state.isIngredientsLoading = false;
    });
    builder.addCase(updateIngredient.fulfilled, (state, action) => {
      state.isIngredientsLoading = false;
      const index = state.ingredients.findIndex((ingredient) => ingredient.id === action.payload.id);
      if (index !== -1) {
        state.ingredients[index] = action.payload;
        state.shouldNavigateIngredients = true;
      }
    });

    builder.addCase(deleteIngredient.pending, (state) => {
      state.isIngredientsLoading = true;
    });
    builder.addCase(deleteIngredient.rejected, (state) => {
      state.isIngredientsLoading = false;
    });
    builder.addCase(deleteIngredient.fulfilled, (state, action) => {
      state.isIngredientsLoading = false;
      const index = state.ingredients.findIndex((ingredient) => ingredient.id === action.payload);
      if (index !== -1) {
        state.ingredients.splice(index, 1);
        state.shouldNavigateIngredients = true;
      }
    });
  },
});

export const {
  setIngredients,
  setSelectedIngredient,
  setIsIngredientsLoading,
  setShouldNavigateIngredients,
} = IngredientsSlice.actions;
