import { getSession } from "@/features/auth/session";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export const getSubreddits = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const subreddits = await prisma.subreddit.findMany({
    where: {
      members: {
        some: {
          id: session.id,
        },
      },
    },
    select: {
      name: true,
      image: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const finalSubreddits = subreddits.map((subreddit) => ({
    label: subreddit.name,
    value: subreddit.name,
    image: subreddit?.image || "",
  }));

  return {
    error: false,
    subreddits: finalSubreddits,
    message: "Subreddits fetched successfully",
  };
};

export async function getSubredditDetails(name: string) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const subreddit = await prisma.subreddit.findUnique({
    where: {
      name,
    },
    select: {
      name: true,
      description: true,
      createdAt: true,
      _count: {
        select: {
          members: true,
        },
      },
      moderators: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      members: {
        where: {
          id: session.id,
        },
        select: {
          id: true,
        },
      },
    },
  });

  if (!subreddit) {
    notFound();
  }

  const isJoined = subreddit.members.length > 0;
  const isModerator = subreddit.moderators.some((mod) => mod.id === session.id);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { members, ...rest } = subreddit;

  return {
    ...rest,
    isJoined,
    isModerator,
  };
}
