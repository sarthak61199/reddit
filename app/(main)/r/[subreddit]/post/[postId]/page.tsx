import CommentBox from "@/components/comment-box";
import CommentList from "@/components/comment-list";
import PostCard from "@/components/post-card";
import { Separator } from "@/components/ui/separator";
import { getPost } from "@/dal/post";

async function Page({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;

  const post = await getPost(postId);

  return (
    <div className="flex flex-col gap-4 justify-center container">
      <PostCard post={post} isPostPage />
      <CommentBox postId={postId} />
      <Separator />
      <CommentList />
    </div>
  );
}

export default Page;
