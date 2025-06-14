import { z } from "zod";

export const ingredientSchema = z.object({
  ingredientId: z.string().min(1, "El ingrediente es requerido"),
  quantity: z.number().min(1, "La cantidad debe ser al menos 1"),
});

export const recipeSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre es requerido, debe tener al menos 3 caracteres")
    .max(100, "El nombre debe tener menos de 100 caracteres"),
  description: z
    .string()
    .min(10, "La descripción es requerida, debe tener al menos 10 caracteres")
    .max(1000, "La descripción debe tener menos de 1000 caracteres"),
  url: z.string().url("URL inválida").optional().or(z.literal("")),
  servings: z
    .number()
    .min(1, "Las porciones deben ser al menos 1")
    .max(100, "Las porciones deben ser como máximo 100"),
  ingredients: z
    .array(ingredientSchema)
    .optional(),
});
