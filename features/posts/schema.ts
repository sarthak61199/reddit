import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(300, "Title must be less than 300 characters"),
  content: z
    .string()
    .max(40000, "Content must be less than 40,000 characters")
    .optional(),
  subreddit: z.string().min(1, "Subreddit is required"),
  image: z.instanceof(File).optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
