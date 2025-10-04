"use server";

import { getPosts } from "@/dal/post";
import db from "@/lib/db";
import { VoteType } from "@/lib/generated/prisma";
import { getUser } from "@/lib/get-user";
import { createPostSchema, CreatePostSchema } from "@/schema/post";
import { Response } from "@/types";
import { revalidatePath } from "next/cache";

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

export const votePost = async (
  postId: string,
  voteType: VoteType | null
): Promise<Response> => {
  const user = await getUser();

  try {
    const post = await db.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return {
        message: "Post not found",
        success: false,
      };
    }

    const existingVote = await db.postVote.findFirst({
      where: {
        postId,
        userId: user.id,
      },
    });

    let voteCountChange = 0;

    if (!voteType) {
      if (existingVote) {
        await db.postVote.delete({
          where: {
            userId_postId: {
              userId: user.id,
              postId,
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

      await db.postVote.upsert({
        where: {
          userId_postId: {
            userId: user.id,
            postId,
          },
        },
        create: {
          userId: user.id,
          postId,
          voteType: voteType,
        },
        update: {
          voteType: voteType,
        },
      });
    }

    if (voteCountChange !== 0) {
      await db.post.update({
        where: { id: postId },
        data: {
          voteCount: { increment: voteCountChange },
        },
      });
    }

    revalidatePath(`/(main)/`, "layout");

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

export const getPostsAction = async (
  subreddit?: string,
  username?: string,
  page: number = 1,
  limit: number = 10
) => {
  return await getPosts(subreddit, username, page, limit);
};
