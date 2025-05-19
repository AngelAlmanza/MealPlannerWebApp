import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(1, { message: "El nombre de usuario es requerido" }),
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  roleId: z.string().min(1, { message: "El rol es requerido" }),
})