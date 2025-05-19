import { userSchema } from "../schema/userSchema";
import { z } from "zod";

export type UserSchemaType = z.infer<typeof userSchema>;