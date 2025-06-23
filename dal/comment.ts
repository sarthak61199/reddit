import db from "@/lib/db";
import { getUser } from "@/lib/get-user";
import { CommentWithVotes } from "@/types";

const buildCommentTree = (comments: CommentWithVotes[]): CommentWithVotes[] => {
  const commentMap = new Map<string, CommentWithVotes>();
  const rootComments: CommentWithVotes[] = [];

  comments.forEach((comment) => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  comments.forEach((comment) => {
    const commentWithReplies = commentMap.get(comment.id)!;

    if (comment.parentId === null) {
      rootComments.push(commentWithReplies);
    } else {
      const parent = commentMap.get(comment.parentId);
      if (parent) {
        parent.replies!.push(commentWithReplies);
      }
    }
  });

  rootComments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const sortReplies = (comment: CommentWithVotes) => {
    if (comment.replies && comment.replies.length > 0) {
      comment.replies.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      comment.replies.forEach(sortReplies);
    }
  };

  rootComments.forEach(sortReplies);

  return rootComments;
};

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
    };
  });

  const commentsWithVotes = await Promise.all(commentPromise);

  return buildCommentTree(commentsWithVotes);
};

export type GetComments = Awaited<ReturnType<typeof getComments>>;
