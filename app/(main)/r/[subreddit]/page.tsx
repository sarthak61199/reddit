import { getSubredditPosts } from "@/actions/post";
import PostList from "@/components/post-list";
import SubredditSidebar from "@/components/subreddit-sidebar";

async function Page({ params }: { params: Promise<{ subreddit: string }> }) {
  const subreddit = (await params).subreddit;

  const { posts } = await getSubredditPosts(subreddit);

  return (
    <div className="container mx-auto py-4 flex gap-4 justify-center">
      <div className="flex-1 max-w-2xl">
        <PostList posts={posts} />
      </div>
      <SubredditSidebar subredditName={subreddit} />
    </div>
  );
}

export default Page;
