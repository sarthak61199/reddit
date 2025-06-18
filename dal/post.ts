import db from "@/lib/db";
import { getUser } from "@/lib/get-user";
import { notFound } from "next/navigation";

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
          id: true,
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
    userVote: post.postVotes?.[0]?.voteType ?? null,
    commentCount: post._count.comments,
  };
};

export type GetPost = Awaited<ReturnType<typeof getPost>>;
