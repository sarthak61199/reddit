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

export const voteComment = async (
  commentId: string,
  voteType: VoteType | null
): Promise<Response> => {
  const user = await getUser();

  try {
    const comment = await db.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return {
        message: "Comment not found",
        success: false,
      };
    }

    const existingVote = await db.commentVote.findFirst({
      where: {
        commentId,
        userId: user.id,
      },
    });

    let voteCountChange = 0;

    if (!voteType) {
      if (existingVote) {
        await db.commentVote.delete({
          where: {
            userId_commentId: {
              userId: user.id,
              commentId,
            },
          },
        });

        voteCountChange = existingVote.voteType === VoteType.UPVOTE ? -1 : 1;
      }
    } else {
      if (existingVote) {
        if (existingVote.voteType !== voteType) {
          voteCountChange = voteType === VoteType.UPVOTE ? 2 : -2;
        }
      } else {
        voteCountChange = voteType === VoteType.UPVOTE ? 1 : -1;
      }

      await db.commentVote.upsert({
        where: {
          userId_commentId: {
            userId: user.id,
            commentId,
          },
        },
        create: {
          userId: user.id,
          commentId,
          voteType: voteType,
        },
        update: {
          voteType: voteType,
        },
      });
    }

    if (voteCountChange !== 0) {
      await db.comment.update({
        where: { id: commentId },
        data: {
          voteCount: { increment: voteCountChange },
        },
      });
    }

    return {
      message: "Vote updated successfully",
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Failed to vote",
      success: false,
    };
  }
};
