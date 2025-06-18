import { getPosts } from "@/dal/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const posts = await getPosts(page, limit);

  return NextResponse.json(posts, { status: 200 });
}
