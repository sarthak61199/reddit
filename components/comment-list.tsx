import CommentItem from "@/components/comment-item";
import { GetComments } from "@/dal/comment";

function CommentList({ comments }: { comments: GetComments }) {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
}

export default CommentList;
