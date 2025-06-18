import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function CommentBox() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Textarea placeholder="Add a comment" />
      <Button className="w-fit self-end">Comment</Button>
    </div>
  );
}

export default CommentBox;
