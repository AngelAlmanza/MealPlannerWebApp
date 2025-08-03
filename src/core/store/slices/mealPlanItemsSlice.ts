import { MealPlanItem } from "@/modules/dashboard/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createMealPlanItem,
  deleteMealPlanItem,
  getMealPlanItems,
  updateMealPlanItem,
} from "../thunks/mealPlanItemThunks";

interface MealPlanItemsState {
  mealPlanItems: MealPlanItem[];
  selectedMealPlanItem: MealPlanItem | null;
  isMealPlanItemsLoading: boolean;
  isDrawerOpen: boolean;
}

const initialState: MealPlanItemsState = {
  mealPlanItems: [],
  selectedMealPlanItem: null,
  isMealPlanItemsLoading: false,
  isDrawerOpen: false,
};

export const MealPlanItemsSlice = createSlice({
  name: "mealPlanItems",
  initialState,
  reducers: {
    setIsMealPlanItemsLoading: (state, action: PayloadAction<boolean>) => {
      state.isMealPlanItemsLoading = action.payload;
    },
    setMealPlanItems: (state, action: PayloadAction<MealPlanItem[]>) => {
      state.mealPlanItems = action.payload;
    },
    setSelectedMealPlanItem: (
      state,
      action: PayloadAction<MealPlanItem | null>
    ) => {
      state.selectedMealPlanItem = action.payload;
    },
    setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getMealPlanItems.pending, (state) => {
      state.isMealPlanItemsLoading = true;
    });
    builder.addCase(getMealPlanItems.rejected, (state) => {
      state.isMealPlanItemsLoading = false;
    });
    builder.addCase(getMealPlanItems.fulfilled, (state, action) => {
      state.isMealPlanItemsLoading = false;
      state.mealPlanItems = action.payload;
    });

    builder.addCase(createMealPlanItem.pending, (state) => {
      state.isMealPlanItemsLoading = true;
    });
    builder.addCase(createMealPlanItem.rejected, (state) => {
      state.isMealPlanItemsLoading = false;
    });
    builder.addCase(createMealPlanItem.fulfilled, (state) => {
      state.isMealPlanItemsLoading = false;
    });

    builder.addCase(updateMealPlanItem.pending, (state) => {
      state.isMealPlanItemsLoading = true;
    });
    builder.addCase(updateMealPlanItem.rejected, (state) => {
      state.isMealPlanItemsLoading = false;
    });
    builder.addCase(updateMealPlanItem.fulfilled, (state) => {
      state.isMealPlanItemsLoading = false;
    });

    builder.addCase(deleteMealPlanItem.pending, (state) => {
      state.isMealPlanItemsLoading = true;
    });
    builder.addCase(deleteMealPlanItem.rejected, (state) => {
      state.isMealPlanItemsLoading = false;
    });
    builder.addCase(deleteMealPlanItem.fulfilled, (state, action) => {
      state.isMealPlanItemsLoading = false;
      state.mealPlanItems = state.mealPlanItems.filter(
        (item) => item.id !== action.payload
      );
      if (state.selectedMealPlanItem?.id === action.payload) {
        state.selectedMealPlanItem = null;
      }
    });
  },
});

export const {
  setIsMealPlanItemsLoading,
  setMealPlanItems,
  setSelectedMealPlanItem,
  setIsDrawerOpen,
} = MealPlanItemsSlice.actions;
export default MealPlanItemsSlice.reducer;
