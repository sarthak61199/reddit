import CommentBox from "@/components/comment-box";
import PostCard from "@/components/post-card";
import { getPost } from "@/dal/post";

async function Page({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;

  const post = await getPost(postId);

  return (
    <div className="flex flex-col gap-4 justify-center max-w-2xl mx-auto">
      <PostCard post={post} isPostPage />
      <CommentBox />
    </div>
  );
}

export default Page;
