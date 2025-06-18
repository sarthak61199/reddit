import CommentBox from "@/components/comment-box";
import PostCard from "@/components/post-card";

async function Page({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;

  return (
    <div className="flex flex-col gap-4 items-center w-full max-w-2xl mx-auto">
      <PostCard
        id={postId}
        subreddit="test"
        username="test"
        timeAgo="1h"
        title="Test Post"
        upvotes={10}
        comments={10}
        isDownvoted={true}
      />
      <CommentBox />
    </div>
  );
}

export default Page;
