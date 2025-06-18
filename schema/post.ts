import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3).max(100).trim(),
  content: z.string().min(3).max(1000).trim(),
  subreddit: z.string().min(3).max(21).trim(),
  imageUrl: z.string(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
