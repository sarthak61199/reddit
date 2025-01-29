import { getSession } from "@/features/auth/session";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    username: string;
    avatar?: string | null;
  };
  children?: Comment[];
};

export const getPostComments = async (postId: string) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    notFound();
  }

  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      parentId: true,
      author: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const commentMap = new Map<string, Comment>();

  comments.forEach((comment) => {
    commentMap.set(comment.id, {
      ...comment,
      children: [],
    });
  });

  const rootComments: Comment[] = [];

  comments.forEach((comment) => {
    const commentWithChildren = commentMap.get(comment.id)!;

    if (comment.parentId === null) {
      rootComments.push(commentWithChildren);
    } else {
      const parentComment = commentMap.get(comment.parentId);
      if (parentComment) {
        parentComment.children!.push(commentWithChildren);
      }
    }
  });

  return {
    comments: rootComments,
  };
};
