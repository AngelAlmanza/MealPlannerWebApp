import { z } from "zod";

export const unitMeasureSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es requerido" })
    .max(50, { message: "El nombre no puede tener más de 50 caracteres" }),
  abbreviation: z
    .string()
    .min(1, { message: "La abreviatura es requerida" })
    .max(10, { message: "La abreviatura no puede tener más de 10 caracteres" }),
});
