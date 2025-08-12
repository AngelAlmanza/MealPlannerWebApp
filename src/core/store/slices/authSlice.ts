import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { loginThunk } from "../thunks/authThunk";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  isAuthLoading: boolean;
}

const initialState: AuthState = {
  // isAuthenticated: true,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true" || false,
  token: localStorage.getItem("token") || null,
  isAuthLoading: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setIsAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isAuthLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginThunk.pending, (state) => {
      state.isAuthLoading = true;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.isAuthLoading = false;
      toast.error(action.payload as string)
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isAuthLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", action.payload.token);
    });
  },
});

export const { setIsAuthenticated, setToken, setIsAuthLoading } =
  AuthSlice.actions;
