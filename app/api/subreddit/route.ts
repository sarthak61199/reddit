import { getSubreddits, Subreddits } from "@/dal/subreddit";
import { NextResponse } from "next/server";

export async function GET() {
  const subreddits = await getSubreddits();

  return NextResponse.json<Subreddits>(subreddits, { status: 200 });
}
