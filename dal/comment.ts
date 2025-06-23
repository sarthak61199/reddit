import db from "@/lib/db";
import { getUser } from "@/lib/get-user";
import { buildCommentTree } from "@/lib/utils";

export const getComments = async (postId: string) => {
  const user = await getUser();

  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      voteCount: true,
      parentId: true,
      postId: true,
      user: {
        select: {
          username: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const commentPromise = comments.map(async (comment) => {
    const userVote = await db.commentVote.findUnique({
      where: {
        userId_commentId: {
          userId: user.id,
          commentId: comment.id,
        },
      },
      select: {
        voteType: true,
      },
    });

    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      voteCount: comment.voteCount,
      user: comment.user,
      parentId: comment.parentId,
      userVote: userVote?.voteType ?? null,
      postId: comment.postId,
    };
  });

  const commentsWithVotes = await Promise.all(commentPromise);

  return buildCommentTree(commentsWithVotes);
};

export type GetComments = Awaited<ReturnType<typeof getComments>>;
