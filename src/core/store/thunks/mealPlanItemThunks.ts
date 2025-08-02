import api from "@/core/lib/api";
import { CreateMealItemDto } from "@/modules/dashboard/dtos";
import { MealPlanItem } from "@/modules/dashboard/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMealPlanItems = createAsyncThunk(
  "mealPlanItems/getMealPlanItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<MealPlanItem[]>("/mealplanitem");
      return response.data;
    } catch (error) {
      console.error("Error fetching meal plan items:", error);
      return rejectWithValue("Failed to fetch meal plan items");
    }
  }
);

export const createMealPlanItem = createAsyncThunk(
  "mealPlanItems/createMealPlanItem",
  async (data: CreateMealItemDto, { rejectWithValue }) => {
    try {
      const response = await api.post<MealPlanItem>("/mealplanitem", data);
      return response.data;
    } catch (error) {
      console.error("Error creating meal item:", error);
      return rejectWithValue("Failed to create meal item");
    }
  }
);