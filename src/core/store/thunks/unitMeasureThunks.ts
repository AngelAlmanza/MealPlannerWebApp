import api from "@/core/lib/api";
import { CreateUnitMeasureDto, UpdateUnitMeasureDto } from "@/modules/unit-measures/dto";
import { UnitMeasures } from "@/modules/unit-measures/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUnitMeasures = createAsyncThunk(
  "unitMeasures/getUnitMeasures",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<UnitMeasures[]>("/unitmeasure");
      const data = response.data
      return data;
    } catch (error) {
      console.error("Error fetching unit measures:", error);
      return rejectWithValue("Failed to fetch unit measures");
    }
  }
)

export const createUnitMeasure = createAsyncThunk(
  "unitMeasures/createUnitMeasure",
  async (unitMeasure: CreateUnitMeasureDto, { rejectWithValue }) => {
    try {
      const response = await api.post<UnitMeasures>("/unitmeasure", unitMeasure);
      const data = response.data
      return data;
    } catch (error) {
      console.error("Error creating unit measure:", error);
      return rejectWithValue("Failed to create unit measure");
    }
  }
);

export const updateUnitMeasure = createAsyncThunk(
  "unitMeasures/updateUnitMeasure",
  async (unitMeasure: UpdateUnitMeasureDto, { rejectWithValue }) => {
    try {
      const response = await api.put<UnitMeasures>(`/unitmeasure/${unitMeasure.id}`, unitMeasure);
      const data = response.data
      return data;
    } catch (error) {
      console.error("Error updating unit measure:", error);
      return rejectWithValue("Failed to update unit measure");
    }
  }
);

export const deleteUnitMeasure = createAsyncThunk(
  "unitMeasures/deleteUnitMeasure",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/unitmeasure/${id}`);
      return id;
    } catch (error) {
      console.error("Error deleting unit measure:", error);
      return rejectWithValue("Failed to delete unit measure");
    }
  }
);
