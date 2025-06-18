import PostList from "@/components/post-list";
import { getPosts } from "@/dal/post";

export default async function Page() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto w-full">
      <PostList posts={posts.posts} hasMore={posts.hasMore} />
    </div>
  );
}
