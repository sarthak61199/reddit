"use server";

import { getSession } from "@/features/auth/session";
import { CreatePostInput, createPostSchema } from "@/features/posts/schema";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createPost(unsafeData: CreatePostInput) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const { success, data } = createPostSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true, message: "Invalid data" };
  }

  const { title, content, subreddit, image } = data;

  console.log(image);

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: session.id,
      subredditName: subreddit,
    },
    select: {
      id: true,
      subreddit: {
        select: {
          name: true,
        },
      },
    },
  });

  redirect(`/r/${post.subreddit.name}/post/${post.id}`);
}
