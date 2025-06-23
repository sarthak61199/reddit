"use server";

import db from "@/lib/db";
import { VoteType } from "@/lib/generated/prisma";
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
    const comment = await db.comment.create({
      data: {
        content,
        postId,
        parentId,
        userId: user.id,
      },
    });

    await db.commentVote.create({
      data: {
        userId: user.id,
        commentId: comment.id,
        voteType: VoteType.UPVOTE,
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
