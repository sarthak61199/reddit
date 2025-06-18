"use server";

import db from "@/lib/db";
import { getUser } from "@/lib/get-user";
import {
  createSubredditSchema,
  CreateSubredditSchema,
} from "@/schema/subreddit";
import { Response } from "@/types";

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
