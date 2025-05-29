import api from "@/core/lib/api";
import { CreateIngredientDto, UpdateIngredientDto } from "@/modules/ingredients/dtos";
import { Ingredient } from "@/modules/ingredients/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Ingredient[]>("/ingredient");
      const data = response.data
      return data;
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      return rejectWithValue("Failed to fetch ingredients");
    }
  }
)

export const createIngredient = createAsyncThunk(
  "ingredients/createIngredient",
  async (ingredient: CreateIngredientDto, { rejectWithValue }) => {
    try {
      const response = await api.post<Ingredient>("/ingredient", ingredient);
      const data = response.data
      return data;
    } catch (error) {
      console.error("Error creating ingredient:", error);
      return rejectWithValue("Failed to create ingredient");
    }
  }
);

export const updateIngredient = createAsyncThunk(
  "ingredients/updateIngredient",
  async (ingredient: UpdateIngredientDto, { rejectWithValue }) => {
    try {
      const response = await api.put<Ingredient>(`/ingredient/${ingredient.id}`, ingredient);
      const data = response.data
      return data;
    } catch (error) {
      console.error("Error updating ingredient:", error);
      return rejectWithValue("Failed to update ingredient");
    }
  }
);

export const deleteIngredient = createAsyncThunk(
  "ingredients/deleteIngredient",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/ingredient/${id}`);
      return id;
    } catch (error) {
      console.error("Error deleting ingredient:", error);
      return rejectWithValue("Failed to delete ingredient");
    }
  }
);