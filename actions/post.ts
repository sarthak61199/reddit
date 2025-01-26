"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { CreatePostInput, createPostSchema } from "@/schema/post";
import { ACTION } from "@prisma/client";
import { redirect } from "next/navigation";

export async function createPost(data: CreatePostInput) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const result = createPostSchema.safeParse(data);

  if (!result.success) {
    throw new Error("Invalid inputs");
  }

  const { title, content, subredditId: subredditIdSet } = result.data;
  const subredditId = [...subredditIdSet][0];

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: session.id,
      subredditName: subredditId,
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

  return {
    error: false,
    message: "Post created successfully",
    postId: post.id,
    subredditName: post.subreddit.name,
  };
}

export async function getSubredditPosts(subredditName: string) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const posts = await prisma.post.findMany({
    where: {
      subreddit: {
        name: subredditName,
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      postLike: {
        select: {
          action: true,
          userId: true,
        },
      },
      _count: {
        select: {
          comment: true,
        },
      },
      subreddit: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const postsWithLikes = posts.map((post) => {
    const userLike = post.postLike.find(
      (like) => like.userId === session.id && like.action === ACTION.LIKE
    );

    const userUnLike = post.postLike.find(
      (like) => like.userId === session.id && like.action === ACTION.UNLIKE
    );

    const likeCount = post.postLike.filter(
      (like) => like.action === ACTION.LIKE
    ).length;

    const unlikeCount = post.postLike.filter(
      (like) => like.action === ACTION.UNLIKE
    ).length;

    const totalLikeCount = likeCount - unlikeCount;

    return {
      ...post,
      hasLiked: !!userLike,
      hasUnLiked: !!userUnLike,
      likeCount: totalLikeCount,
      commentCount: post._count.comment,
    };
  });

  return { posts: postsWithLikes };
}

export async function getPostById(postId: string) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      postLike: true,
      _count: {
        select: {
          comment: true,
        },
      },
      subreddit: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  const userLike = post.postLike.find(
    (like) => like.userId === session.id && like.action === ACTION.LIKE
  );

  const userUnLike = post.postLike.find(
    (like) => like.userId === session.id && like.action === ACTION.UNLIKE
  );

  const likeCount = post.postLike.filter(
    (like) => like.action === ACTION.LIKE
  ).length;

  const unlikeCount = post.postLike.filter(
    (like) => like.action === ACTION.UNLIKE
  ).length;

  const totalLikeCount = likeCount - unlikeCount;

  return {
    post: {
      ...post,
      isAuthor: post.authorId === session.id,
      hasLiked: !!userLike,
      hasUnLiked: !!userUnLike,
      likeCount: totalLikeCount,
      commentCount: post._count.comment,
    },
    error: false,
    message: "Post fetched successfully",
  };
}
