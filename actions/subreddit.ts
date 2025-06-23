"use server";

import db from "@/lib/db";
import { getUser } from "@/lib/get-user";
import {
  addModeratorSchema,
  AddModeratorSchema,
  createSubredditSchema,
  CreateSubredditSchema,
} from "@/schema/subreddit";
import { Response } from "@/types";
import { revalidatePath } from "next/cache";

export const createSubreddit = async (
  input: CreateSubredditSchema
): Promise<Response<{ name: string }>> => {
  try {
    const user = await getUser();

    const v = createSubredditSchema.safeParse(input);

    if (!v.success) {
      return {
        message: "Invalid input",
        success: false,
      };
    }

    const subreddit = await db.subreddit.create({
      data: {
        ...v.data,
        imageUrl: v.data.imageUrl || null,
        subredditMembers: { create: { userId: user.id } },
        subredditModerators: { create: { userId: user.id, isFounder: true } },
      },
      select: { name: true },
    });

    return {
      data: {
        name: subreddit.name,
      },
      message: "Subreddit created successfully",
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Failed to create subreddit",
      success: false,
    };
  }
};

export const addModerator = async (
  input: AddModeratorSchema,
  subredditName: string
): Promise<Response> => {
  const user = await getUser();

  const v = addModeratorSchema.safeParse(input);

  if (!v.success) {
    return {
      message: "Invalid input",
      success: false,
    };
  }

  try {
    const subreddit = await db.subreddit.findUnique({
      where: {
        name: subredditName,
      },
    });

    if (!subreddit) {
      return {
        message: "Subreddit not found",
        success: false,
      };
    }

    const isModerator = await db.subredditModerator.findFirst({
      where: {
        subredditName,
        userId: user.id,
      },
    });

    if (!isModerator) {
      return {
        message: "You are not a moderator of this subreddit",
        success: false,
      };
    }

    const candidate = await db.user.findUnique({
      where: {
        username: v.data.username,
      },
      select: {
        id: true,
      },
    });

    if (!candidate) {
      return {
        message: "User not found",
        success: false,
      };
    }

    const moderator = await db.subredditModerator.findFirst({
      where: {
        subredditName,
        userId: candidate.id,
      },
    });

    if (moderator) {
      return {
        message: "User is already a moderator of this subreddit",
        success: true,
      };
    }

    await db.subredditModerator.create({
      data: {
        subredditName,
        userId: candidate.id,
      },
    });

    return {
      message: "Moderator added successfully",
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Failed to add moderator",
      success: false,
    };
  }
};

export const joinOrLeaveSubreddit = async (
  subredditName: string
): Promise<Response> => {
  const user = await getUser();

  try {
    const subreddit = await db.subreddit.findUnique({
      where: {
        name: subredditName,
      },
    });

    if (!subreddit) {
      return {
        message: "Subreddit not found",
        success: false,
      };
    }

    const isMember = await db.subredditMember.findUnique({
      where: {
        userId_subredditName: {
          userId: user.id,
          subredditName,
        },
      },
    });

    if (isMember) {
      await db.subredditMember.delete({
        where: {
          userId_subredditName: {
            userId: user.id,
            subredditName,
          },
        },
      });

      revalidatePath(`/r/${subredditName}`, "layout");

      return {
        message: "You have left the subreddit",
        success: true,
      };
    }

    await db.subredditMember.create({
      data: {
        userId: user.id,
        subredditName,
      },
    });

    revalidatePath(`/r/${subredditName}`, "layout");

    return {
      message: "You have joined the subreddit",
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Failed to join subreddit",
      success: false,
    };
  }
};
