import { z } from "zod";
import { ingredientSchema, recipeSchema } from "../schema/recipeSchema";

export type RecipeSchemaType = z.infer<typeof recipeSchema>;
export type IngredientRecipeSchemaType = z.infer<typeof ingredientSchema>;