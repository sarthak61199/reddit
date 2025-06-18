import { z } from "zod";

export const createSubredditSchema = z.object({
  name: z.string().min(3).max(21).trim(),
  description: z.string().min(3).max(500).trim(),
  imageUrl: z.string(),
});

export const addModeratorSchema = z.object({
  username: z.string().min(3).max(21).trim(),
});

export type CreateSubredditSchema = z.infer<typeof createSubredditSchema>;
export type AddModeratorSchema = z.infer<typeof addModeratorSchema>;
