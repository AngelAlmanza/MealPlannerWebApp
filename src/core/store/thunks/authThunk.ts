import api from "@/core/lib/api";
import { LoginDto } from "@/modules/auth/dtos/LoginDto";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data: LoginDto, { rejectWithValue }) => {
    try {
      const response = await api.post<{ token: string }>("/auth/login", data);
      const { token } = response.data;
      return { token };
    } catch (error) {
      console.error("Error during login:", error);
      return rejectWithValue("Fallo al iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.");
    }
  }
)