"use server";

import db from "@/lib/db";
import { VoteType } from "@/lib/generated/prisma";
import { getUser } from "@/lib/get-user";
import { createPostSchema, CreatePostSchema } from "@/schema/post";
import { Response } from "@/types";

export const createPost = async (
  input: CreatePostSchema
): Promise<Response<{ id: string; subreddit: string }>> => {
  const user = await getUser();

  const v = createPostSchema.safeParse(input);

  if (!v.success) {
    return {
      message: "Invalid input",
      success: false,
    };
  }

  const { content, imageUrl, subreddit, title } = v.data;

  try {
    const post = await db.post.create({
      data: {
        title,
        content,
        subredditName: subreddit,
        imageUrl: imageUrl || null,
        userId: user.id,
        postVotes: {
          create: {
            userId: user.id,
            voteType: VoteType.UPVOTE,
          },
        },
      },
      select: {
        id: true,
        subredditName: true,
      },
    });

    return {
      data: {
        id: post.id,
        subreddit: post.subredditName,
      },
      message: "Post created successfully",
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Failed to create post",
      success: false,
    };
  }
};
