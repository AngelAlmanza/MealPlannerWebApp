import { AuthSlice } from "@/core/store/slices";
import { configureStore } from "@reduxjs/toolkit";
import unitMeasuresReducer from "@/core/store/slices/unitMeasuresSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    unitMeasures: unitMeasuresReducer,
  },
});