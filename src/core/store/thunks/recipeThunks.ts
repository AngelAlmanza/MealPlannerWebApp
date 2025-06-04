import api from "@/core/lib/api";
import { CreateRecipeDto, UpdateRecipeDto } from "@/modules/recipes/dtos";
import { Recipe } from "@/modules/recipes/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRecipes = createAsyncThunk(
  "recipes/getRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Recipe[]>("/recipe");
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return rejectWithValue("Failed to fetch recipes");
    }
  }
)

export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
  async (recipe: CreateRecipeDto, { rejectWithValue }) => {
    try {
      const response = await api.post<Recipe>("/recipe", recipe);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error creating recipe:", error);
      return rejectWithValue("Failed to create recipe");
    }
  }
)

export const updateRecipe = createAsyncThunk(
  "recipes/updateRecipe",
  async (recipe: UpdateRecipeDto, { rejectWithValue }) => {
    try {
      const response = await api.put<Recipe>(`/recipe/${recipe.id}`, recipe);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error updating recipe:", error);
      return rejectWithValue("Failed to update recipe");
    }
  }
)

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/recipe/${id}`);
      return id;
    } catch (error) {
      console.error("Error deleting recipe:", error);
      return rejectWithValue("Failed to delete recipe");
    }
  }
);