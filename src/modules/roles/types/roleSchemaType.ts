import { z } from "zod";
import { roleSchema } from "../schema/roleSchema";

export type RoleSchemaType = z.infer<typeof roleSchema>;
