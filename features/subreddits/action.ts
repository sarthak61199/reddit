"use server";

import { getSession } from "@/features/auth/session";
import {
  AddModeratorInput,
  addModeratorSchema,
  CreateSubredditInput,
  createSubredditSchema,
} from "@/features/subreddits/schema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createSubreddit = async (unsafeData: CreateSubredditInput) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const { success, data } = createSubredditSchema.safeParse(unsafeData);

  if (!success) {
    return {
      error: true,
      message: "Invalid inputs",
    };
  }

  const { name, description } = data;

  const existingSubreddit = await prisma.subreddit.findUnique({
    where: {
      name,
    },
  });

  if (existingSubreddit) {
    return {
      error: true,
      message: "Subreddit already exists",
    };
  }

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

  redirect(`/r/${subreddit.name}`);
};

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
    return {
      error: true,
      message: "Subreddit not found",
    };
  }

  const isJoined = subreddit.members.some((member) => member.id === session.id);

  if (isJoined) {
    await prisma.subreddit.update({
      where: { name: subredditName },
      data: { members: { disconnect: { id: session.id } } },
    });

    revalidatePath("/(main)/r/[subreddit]", "page");

    return {
      error: false,
      message: "Left subreddit successfully",
    };
  } else {
    await prisma.subreddit.update({
      where: { name: subredditName },
      data: { members: { connect: { id: session.id } } },
    });

    revalidatePath("/(main)/r/[subreddit]", "page");

    return {
      error: false,
      message: "Joined subreddit successfully",
    };
  }
};

export const addModerator = async (
  subredditName: string,
  unsafeData: AddModeratorInput
) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const { success, data } = addModeratorSchema.safeParse(unsafeData);

  if (!success) {
    return {
      error: true,
      message: "Invalid inputs",
    };
  }

  const { username } = data;

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
    return {
      error: true,
      message: "Subreddit not found",
    };
  }

  const isModerator = subreddit.moderators.some(
    (moderator) => moderator.id === session.id
  );

  if (!isModerator) {
    return {
      error: true,
      message: "You are not a moderator of this subreddit",
    };
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return {
      error: true,
      message: "User not found",
    };
  }

  await prisma.subreddit.update({
    where: { name: subredditName },
    data: { moderators: { connect: { username } } },
  });

  revalidatePath("/(main)/r/[subreddit]", "page");

  return {
    error: false,
    message: "Moderator added successfully",
  };
};
