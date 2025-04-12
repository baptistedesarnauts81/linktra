import { object, string, z } from "zod";

export const SetupSchema = object({
  username: string().min(4),
});

export type SetupSchemaType = z.infer<typeof SetupSchema>;
