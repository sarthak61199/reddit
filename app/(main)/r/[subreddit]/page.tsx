import PostList from "@/components/post-list";
import { getPosts } from "@/dal/post";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ subreddit: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { subreddit } = await params;
  const { page, limit } = await searchParams;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", { subreddit, username: undefined }],
    queryFn: () =>
      getPosts(
        subreddit,
        undefined,
        parseInt(page ?? "1"),
        parseInt(limit ?? "10")
      ),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList subreddit={subreddit} />
    </HydrationBoundary>
  );
}

export default Page;
