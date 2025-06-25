import db from "@/lib/db";
import { getUser } from "@/lib/get-user";

export async function getSearchBarResults(query: string) {
  await getUser();

  const subreddits = await db.subreddit.findMany({
    where: {
      name: {
        contains: query,
      },
    },
    select: {
      name: true,
      imageUrl: true,
      _count: {
        select: {
          subredditMembers: true,
        },
      },
    },
    take: 5,
  });

  const users = await db.user.findMany({
    where: {
      username: {
        contains: query,
      },
    },
    select: {
      username: true,
      image: true,
    },
    take: 5,
  });

  return {
    subreddits,
    users,
  };
}

export type SearchBarResults = Awaited<ReturnType<typeof getSearchBarResults>>;
