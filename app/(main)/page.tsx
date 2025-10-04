import PostList from "@/components/post-list";
import { getPosts } from "@/dal/post";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, limit } = await searchParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", { subreddit: undefined, username: undefined }],
    queryFn: () =>
      getPosts(
        undefined,
        undefined,
        parseInt(page ?? "1"),
        parseInt(limit ?? "10")
      ),
  });

  return (
    <div className="container mx-auto">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostList />
      </HydrationBoundary>
    </div>
  );
}
