import CommentList from "@/components/comment-list";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function CommentBox() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Textarea placeholder="Add a comment" />
      <Button className="w-fit">Comment</Button>
      <CommentList />
    </div>
  );
}

export default CommentBox;
