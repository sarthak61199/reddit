import { z } from "zod";

const imageSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= 5 * 1024 * 1024, // 5MB
    {
      message: "Image must be less than 5MB",
    }
  )
  .refine(
    (file) =>
      ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(file.type),
    {
      message: "Only .jpg, .jpeg, .png and .gif formats are supported",
    }
  );

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
    .nullable()
    .optional(),
  image: imageSchema.nullable().optional(),
});

export const addModeratorSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
});

export type CreateSubredditInput = z.infer<typeof createSubredditSchema>;
export type AddModeratorInput = z.infer<typeof addModeratorSchema>;
