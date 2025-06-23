import CommentItem from "@/components/comment-item";
import { GetComments } from "@/dal/comment";

function CommentList({
  comments,
  depth = 0,
}: {
  comments: GetComments;
  depth?: number;
}) {
  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <div key={comment.id} className="space-y-4">
          <div style={{ marginLeft: `${depth * 24}px` }}>
            <CommentItem comment={comment} />
          </div>

          {comment.replies && comment.replies.length > 0 && (
            <CommentList comments={comment.replies} depth={depth + 1} />
          )}
        </div>
      ))}
    </div>
  );
}

export default CommentList;
