import CommentBox from "@/components/comment-box";
import CommentList from "@/components/comment-list";
import PostCard from "@/components/post-card";
import { Separator } from "@/components/ui/separator";
import { getComments } from "@/dal/comment";
import { getPost } from "@/dal/post";

async function Page({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;

  const [post, comments] = await Promise.all([
    getPost(postId),
    getComments(postId),
  ]);

  return (
    <div className="flex flex-col gap-4 justify-center container">
      <PostCard post={post} isPostPage />
      <CommentBox postId={postId} />
      <Separator />
      <CommentList comments={comments} />
    </div>
  );
}

export default Page;
