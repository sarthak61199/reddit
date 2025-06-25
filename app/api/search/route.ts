import { getSearchBarResults, SearchBarResults } from "@/dal/search";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "No query provided" }, { status: 400 });
  }

  const results = await getSearchBarResults(query);

  return NextResponse.json<SearchBarResults>(results, { status: 200 });
}
