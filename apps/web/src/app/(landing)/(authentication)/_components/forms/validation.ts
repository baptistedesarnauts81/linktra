import { object, string, z } from "zod";

export const SignUpSchema = object({
  email: string().email(),
  password: string().min(10),
});

export const SignInSchema = object({
  email: string().email(),
  password: string().min(10),
});

export type SignUpType = z.infer<typeof SignUpSchema>;
export type SignInType = z.infer<typeof SignInSchema>;
