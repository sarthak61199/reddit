import { z } from "zod";

export const createCommentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
  postId: z.string().min(1, "Post ID cannot be empty"),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
