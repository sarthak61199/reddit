import CommentItem from "@/features/comments/components/comment-item";
import { getPostComments } from "@/features/comments/query";

type CommentSectionProps = {
  postId: string;
};

async function CommentSection({ postId }: CommentSectionProps) {
  const { comments } = await getPostComments(postId);

  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <p className="text-center text-default-500">No comments :(</p>
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
}

export default CommentSection;
