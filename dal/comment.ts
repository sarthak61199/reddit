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
      commentVotes: {
        where: {
          userId: user.id,
        },
        select: {
          voteType: true,
        },
        take: 1,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return buildCommentTree(
    comments.map((comment) => {
      return {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        voteCount: comment.voteCount,
        user: comment.user,
        parentId: comment.parentId,
        userVote: comment.commentVotes[0]?.voteType ?? null,
        postId: comment.postId,
      };
    })
  );
};

export const getUserComments = async (username: string) => {
  await getUser();

  const comments = await db.comment.findMany({
    where: {
      user: {
        username,
      },
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      voteCount: true,
      post: {
        select: {
          title: true,
          subredditName: true,
        },
      },
    },
  });

  return comments;
};

export type GetComments = Awaited<ReturnType<typeof getComments>>;
export type GetUserComments = Awaited<ReturnType<typeof getUserComments>>;
