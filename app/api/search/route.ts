import { getSearchBarResults } from "@/dal/search";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return Response.json({ error: "No query provided" }, { status: 400 });
  }

  const results = await getSearchBarResults(query);

  return Response.json(results, { status: 200 });
}
