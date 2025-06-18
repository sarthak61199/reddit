import db from "@/lib/db";
import { getUser } from "@/lib/get-user";
import { notFound } from "next/navigation";

export const getSubreddits = async () => {
  const user = await getUser();

  const subreddits = await db.subreddit.findMany({
    orderBy: {
      name: "asc",
    },
    where: {
      subredditMembers: {
        some: { userId: user.id },
      },
    },
    select: {
      name: true,
      imageUrl: true,
    },
  });

  return subreddits;
};

export const getSubreddit = async (name: string) => {
  const user = await getUser();

  const subreddit = await db.subreddit.findUnique({
    where: { name },
    select: {
      _count: {
        select: {
          subredditMembers: true,
        },
      },
      imageUrl: true,
      description: true,
      name: true,
      subredditModerators: {
        select: {
          isFounder: true,
          user: {
            select: {
              username: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!subreddit) {
    notFound();
  }

  const isMember = await db.subredditMember.findUnique({
    where: {
      userId_subredditName: {
        userId: user.id,
        subredditName: name,
      },
    },
  });

  const isModerator = subreddit.subredditModerators.some(
    (moderator) => moderator.user.username === user.username
  );

  return {
    isModerator,
    isMember: !!isMember,
    name: subreddit.name,
    description: subreddit.description,
    imageUrl: subreddit.imageUrl,
    moderators: subreddit.subredditModerators,
    memberCount: subreddit._count?.subredditMembers,
  };
};

export type Subreddits = Awaited<ReturnType<typeof getSubreddits>>;
export type Subreddit = Awaited<ReturnType<typeof getSubreddit>>;
