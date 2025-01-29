"use server";

import { getSession } from "@/features/auth/session";
import {
  CreateCommentInput,
  createCommentSchema,
} from "@/features/comments/schema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export const createComment = async (
  postId: string,
  unsafeData: CreateCommentInput,
  parentId?: string
) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const { success, data } = createCommentSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true, message: "Invalid data" };
  }

  const { content } = data;

  const userId = session.id;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return { error: true, message: "Post not found" };
  }

  await prisma.comment.create({
    data: {
      content,
      postId,
      authorId: userId,
      parentId: parentId ?? null,
    },
  });

  revalidatePath(`/(main)/r/[subreddit]/post/[postId]`, "page");

  return { error: false, message: "Comment created successfully" };
};
