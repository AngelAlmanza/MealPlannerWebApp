import { z } from "zod";

export const ingredientSchema = z.object({
  ingredientId: z.string().min(1, "Ingredient ID is required"),
  quantity: z.number().min(0, "Quantity must be at least 0"),
});

export const recipeSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre debe tener menos de 100 caracteres"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters"),
  url: z.string().url("Invalid URL format").optional().or(z.literal("")),
  servings: z
    .number()
    .min(1, "Servings must be at least 1")
    .max(100, "Servings cannot exceed 100"),
  ingredients: z
    .array(ingredientSchema)
    .optional(),
});
