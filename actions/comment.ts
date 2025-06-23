"use server";

import db from "@/lib/db";
import { getUser } from "@/lib/get-user";
import { createCommentSchema, CreateCommentSchema } from "@/schema/comment";
import { Response } from "@/types";

export const createComment = async (
  input: CreateCommentSchema,
  postId: string,
  parentId?: string
): Promise<Response> => {
  const user = await getUser();

  const v = createCommentSchema.safeParse(input);

  if (!v.success) {
    return {
      message: "Invalid input",
      success: false,
    };
  }

  const { content } = v.data;

  try {
    await db.comment.create({
      data: {
        content,
        postId,
        parentId,
        userId: user.id,
      },
    });

    return {
      message: "Comment created successfully",
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Failed to create comment",
      success: false,
    };
  }
};
