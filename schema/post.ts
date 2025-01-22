import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(300, "Title must be less than 300 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(40000, "Content must be less than 40,000 characters"),
  subredditId: z.string().min(1, "Subreddit is required"),
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024; // 5MB
      },
      {
        message: "Image must be less than 5MB",
      }
    )
    .refine(
      (file) => {
        if (!file) return true;
        return ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
          file.type
        );
      },
      {
        message: "Only .jpg, .jpeg, .png and .gif formats are supported",
      }
    ),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
