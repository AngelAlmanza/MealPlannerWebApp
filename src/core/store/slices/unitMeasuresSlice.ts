import { UnitMeasures } from '@/modules/unit-measures/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUnitMeasure, deleteUnitMeasure, getUnitMeasures, updateUnitMeasure } from '../thunks/unitMeasureThunks';

interface UnitMeasuresState {
  unitMeasures: UnitMeasures[];
  selectedUnitMeasure: UnitMeasures | null;
  isUnitMeasuresLoading: boolean;
  shouldNavigate: boolean;
}

const initialState: UnitMeasuresState = {
  unitMeasures: [],
  isUnitMeasuresLoading: false,
  selectedUnitMeasure: null,
  shouldNavigate: false,
};

export const UnitMeasuresSlice = createSlice({
  name: 'unitMeasures',
  initialState,
  reducers: {
    setUnitMeasures: (state, action: PayloadAction<UnitMeasures[]>) => {
      state.unitMeasures = action.payload;
    },
    setIsUnitMeasuresLoading: (state, action: PayloadAction<boolean>) => {
      state.isUnitMeasuresLoading = action.payload;
    },
    setSelectedUnitMeasure: (state, action: PayloadAction<UnitMeasures | null>) => {
      state.selectedUnitMeasure = action.payload;
    },
    setShouldNavigate: (state, action: PayloadAction<boolean>) => {
      state.shouldNavigate = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(getUnitMeasures.pending, (state) => {
      state.isUnitMeasuresLoading = true;
    });
    builder.addCase(getUnitMeasures.rejected, (state) => {
      state.isUnitMeasuresLoading = false;
    });
    builder.addCase(getUnitMeasures.fulfilled, (state, action) => {
      state.isUnitMeasuresLoading = false;
      state.unitMeasures = action.payload;
    });

    builder.addCase(createUnitMeasure.pending, (state) => {
      state.isUnitMeasuresLoading = true;
    });
    builder.addCase(createUnitMeasure.rejected, (state) => {
      state.isUnitMeasuresLoading = false;
    });
    builder.addCase(createUnitMeasure.fulfilled, (state, action) => {
      state.isUnitMeasuresLoading = false;
      state.unitMeasures.push(action.payload);
      state.shouldNavigate = true;
    });

    builder.addCase(updateUnitMeasure.pending, (state) => {
      state.isUnitMeasuresLoading = true;
    });
    builder.addCase(updateUnitMeasure.rejected, (state) => {
      state.isUnitMeasuresLoading = false;
    });
    builder.addCase(updateUnitMeasure.fulfilled, (state, action) => {
      state.isUnitMeasuresLoading = false;
      const index = state.unitMeasures.findIndex((unitMeasure) => unitMeasure.id === action.payload.id);
      if (index !== -1) {
        state.unitMeasures[index] = action.payload;
      }
      state.shouldNavigate = true;
    });

    builder.addCase(deleteUnitMeasure.pending, (state) => {
      state.isUnitMeasuresLoading = true;
    });
    builder.addCase(deleteUnitMeasure.rejected, (state) => {
      state.isUnitMeasuresLoading = false;
    });
    builder.addCase(deleteUnitMeasure.fulfilled, (state, action) => {
      state.isUnitMeasuresLoading = false;
      state.unitMeasures = state.unitMeasures.filter((unitMeasure) => unitMeasure.id !== action.payload);
    });
  },
});

export const {
  setUnitMeasures,
  setIsUnitMeasuresLoading,
  setSelectedUnitMeasure,
  setShouldNavigate,
} = UnitMeasuresSlice.actions;
export default UnitMeasuresSlice.reducer;