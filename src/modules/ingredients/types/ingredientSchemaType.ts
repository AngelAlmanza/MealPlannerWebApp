import { z } from "zod";
import { ingredientSchema } from "../schema/ingredientSchema";

export type IngredientSchemaType = z.infer<typeof ingredientSchema>;