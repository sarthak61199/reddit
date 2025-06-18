import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";
import { getUser } from "@/lib/get-user";
import { notFound } from "next/navigation";

export const getPosts = async (
  page: number = 1,
  limit: number = 10,
  subreddit?: string,
  username?: string
) => {
  const user = await getUser();

  const where: Prisma.PostWhereInput = {};

  if (subreddit) {
    where.subreddit = {
      name: subreddit,
    };
  }

  if (username) {
    where.user = {
      username,
    };
  }

  const posts = await db.post.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      title: true,
      content: true,
      imageUrl: true,
      createdAt: true,
      voteCount: true,
      subreddit: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          username: true,
          image: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  const postPromise = posts.map(async (post) => {
    const userVote = await db.postVote.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: post.id,
        },
      },
      select: {
        voteType: true,
      },
    });

    return {
      ...post,
      userVote,
    };
  });

  const postsWithUserVote = await Promise.all(postPromise);

  return {
    posts: postsWithUserVote.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      createdAt: post.createdAt,
      subreddit: post.subreddit,
      voteCount: post.voteCount,
      user: post.user,
      userVote: post.userVote?.voteType ?? null,
      commentCount: post._count.comments,
    })),
    hasMore: postsWithUserVote.length === limit,
  };
};

export const getPost = async (id: string) => {
  const user = await getUser();

  const post = await db.post.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      imageUrl: true,
      createdAt: true,
      voteCount: true,
      subreddit: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          username: true,
          image: true,
        },
      },
      postVotes: {
        where: {
          userId: user.id,
          postId: id,
        },
        select: {
          voteType: true,
        },
        take: 1,
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  return {
    id: post.id,
    title: post.title,
    content: post.content,
    imageUrl: post.imageUrl,
    createdAt: post.createdAt,
    subreddit: post.subreddit,
    voteCount: post.voteCount,
    user: post.user,
    userVote: post.postVotes?.[0]?.voteType ? post.postVotes[0].voteType : null,
    commentCount: post._count.comments,
  };
};

export type GetPost = Awaited<ReturnType<typeof getPost>>;
export type GetPosts = Awaited<ReturnType<typeof getPosts>>;
