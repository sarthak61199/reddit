import { z } from "zod";

export const createSubredditSchema = z.object({
  name: z.string().min(3).max(21).trim(),
  description: z.string().min(3).max(500).trim(),
  imageUrl: z.string(),
});

export type CreateSubredditSchema = z.infer<typeof createSubredditSchema>;
