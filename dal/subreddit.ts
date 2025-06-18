import db from "@/lib/db";
import { getUser } from "@/lib/get-user";

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

export type Subreddits = Awaited<ReturnType<typeof getSubreddits>>;
