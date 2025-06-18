import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3).max(20).trim(),
  email: z.string().nonempty().email().trim(),
  password: z.string().min(8).trim(),
  imageUrl: z.string(),
});

export const signInSchema = z.object({
  username: z.string().min(3).max(20).trim(),
  password: z.string().min(8).trim(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
