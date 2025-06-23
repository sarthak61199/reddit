import PostList from "@/components/post-list";
import { getPosts } from "@/dal/post";

async function Page({ params }: { params: Promise<{ subreddit: string }> }) {
  const { subreddit } = await params;

  const posts = await getPosts(1, 10, subreddit);

  return <PostList posts={posts.posts} hasMore={posts.hasMore} />;
}

export default Page;
