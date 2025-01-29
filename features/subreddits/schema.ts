import { z } from "zod";

export const createSubredditSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(21, "Name must be less than 21 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers, and underscores are allowed"
    ),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  image: z.instanceof(File).optional(),
});

export const addModeratorSchema = z.object({
  username: z.string().min(1, "Username is required"),
});

export type CreateSubredditInput = z.infer<typeof createSubredditSchema>;
export type AddModeratorInput = z.infer<typeof addModeratorSchema>;
