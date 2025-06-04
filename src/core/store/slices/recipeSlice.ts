import { Recipe } from '@/modules/recipes/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createRecipe, deleteRecipe, getRecipes, updateRecipe } from '../thunks/recipeThunks';

interface RecipeState {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  isRecipesLoading: boolean;
  shouldNavigateRecipes: boolean;
}

const initialState: RecipeState = {
  recipes: [],
  selectedRecipe: null,
  isRecipesLoading: false,
  shouldNavigateRecipes: false,
};

export const RecipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
    setSelectedRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.selectedRecipe = action.payload;
    },
    setIsRecipesLoading: (state, action: PayloadAction<boolean>) => {
      state.isRecipesLoading = action.payload;
    },
    setShouldNavigateRecipes: (state, action: PayloadAction<boolean>) => {
      state.shouldNavigateRecipes = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getRecipes.pending, (state) => {
      state.isRecipesLoading = true;
    });
    builder.addCase(getRecipes.rejected, (state) => {
      state.isRecipesLoading = false;
    });
    builder.addCase(getRecipes.fulfilled, (state, action) => {
      state.isRecipesLoading = false;
      state.recipes = action.payload;
    });

    builder.addCase(createRecipe.pending, (state) => {
      state.isRecipesLoading = true;
    });
    builder.addCase(createRecipe.rejected, (state) => {
      state.isRecipesLoading = false;
    });
    builder.addCase(createRecipe.fulfilled, (state, action) => {
      state.isRecipesLoading = false;
      state.recipes.push(action.payload);
      state.shouldNavigateRecipes = true;
    });

    builder.addCase(updateRecipe.pending, (state) => {
      state.isRecipesLoading = true;
    });
    builder.addCase(updateRecipe.rejected, (state) => {
      state.isRecipesLoading = false;
    });
    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      state.isRecipesLoading = false;
      const index = state.recipes.findIndex(recipe => recipe.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = action.payload;
        state.shouldNavigateRecipes = true;
      }
    });

    builder.addCase(deleteRecipe.pending, (state) => {
      state.isRecipesLoading = true;
    });
    builder.addCase(deleteRecipe.rejected, (state) => {
      state.isRecipesLoading = false;
    });
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      state.isRecipesLoading = false;
      const index = state.recipes.findIndex(recipe => recipe.id === action.payload);
      if (index !== -1) {
        state.recipes.splice(index, 1);
      }
    })
  },
});

export const {
  setRecipes,
  setSelectedRecipe,
  setIsRecipesLoading,
  setShouldNavigateRecipes,
} = RecipeSlice.actions;
