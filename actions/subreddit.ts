"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import {
  CreateSubredditInput,
  createSubredditSchema,
} from "@/schema/subreddit";
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

  return {
    error: false,
    subreddits,
    message: "Subreddits fetched successfully",
  };
};

export const createSubreddit = async (data: CreateSubredditInput) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const result = createSubredditSchema.safeParse(data);

  if (!result.success) {
    throw new Error("Invalid inputs");
  }

  const { name, description } = result.data;

  const existingSubreddit = await prisma.subreddit.findUnique({
    where: {
      name,
    },
  });

  if (existingSubreddit) {
    throw new Error("Subreddit already exists");
  }

  //   const imageUrl = await uploadImage(image

  const subreddit = await prisma.subreddit.create({
    data: {
      name,
      description,
      image: "",
      members: {
        connect: {
          id: session.id,
        },
      },
      moderators: {
        connect: {
          id: session.id,
        },
      },
    },
    select: {
      name: true,
    },
  });

  return {
    error: false,
    message: "Subreddit created successfully",
    name: subreddit.name,
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

export const joinUnjoinSubreddit = async (subredditName: string) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const subreddit = await prisma.subreddit.findUnique({
    where: { name: subredditName },
    select: {
      members: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!subreddit) {
    throw new Error("Subreddit not found");
  }

  const isJoined = subreddit.members.some((member) => member.id === session.id);

  if (isJoined) {
    await prisma.subreddit.update({
      where: { name: subredditName },
      data: { members: { disconnect: { id: session.id } } },
    });

    return {
      error: false,
      message: "Left subreddit successfully",
    };
  } else {
    await prisma.subreddit.update({
      where: { name: subredditName },
      data: { members: { connect: { id: session.id } } },
    });

    return {
      error: false,
      message: "Joined subreddit successfully",
    };
  }
};

export const addModerator = async (subredditName: string, username: string) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const subreddit = await prisma.subreddit.findUnique({
    where: { name: subredditName },
    select: {
      moderators: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!subreddit) {
    throw new Error("Subreddit not found");
  }

  const isModerator = subreddit.moderators.some(
    (moderator) => moderator.id === session.id
  );

  if (!isModerator) {
    throw new Error("You are not a moderator of this subreddit");
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.subreddit.update({
    where: { name: subredditName },
    data: { moderators: { connect: { username } } },
  });

  return {
    error: false,
    message: "Moderator added successfully",
  };
};
