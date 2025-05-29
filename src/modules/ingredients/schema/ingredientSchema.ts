import { z } from "zod";

export const ingredientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  unitMeasureId: z.string().min(1, "Unit measure is required"),
});
