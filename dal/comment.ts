import db from "@/lib/db";
import { getUser } from "@/lib/get-user";

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
      ...comment,
      userVote,
    };
  });

  const commentsWithVotes = await Promise.all(commentPromise);

  return commentsWithVotes.map((comment) => ({
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    voteCount: comment.voteCount,
    user: comment.user,
    userVote: comment.userVote?.voteType ?? null,
  }));
};

export type GetComments = Awaited<ReturnType<typeof getComments>>;
