import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import VoteButtons from "@/components/vote-buttons";
import { PLACEHOLDER_AVATAR_URL } from "@/constants";
import { GetComments } from "@/dal/comment";
import { dayjs } from "@/lib/dayjs";
import { Reply } from "lucide-react";

function CommentItem({ comment }: { comment: GetComments[number] }) {
  return (
    <Card key={comment.id} className="border-none gap-0">
      <CardHeader className="pl-0 pb-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Avatar className="size-6">
              <AvatarImage
                src={comment.user.image || PLACEHOLDER_AVATAR_URL}
                alt={comment.user.username || "User avatar"}
              />
            </Avatar>
            <span className="font-medium">u/{comment.user.username}</span>
          </div>
          <span>•</span>
          <span>{dayjs(comment.createdAt).fromNow()}</span>
        </div>
      </CardHeader>
      <CardContent className="pl-0">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {comment.content}
          </p>
          <div className="flex items-center gap-1 pt-2">
            <VoteButtons
              userVote={comment.userVote}
              voteCount={comment.voteCount}
            />

            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-muted-foreground hover:bg-muted"
            >
              <Reply className="size-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CommentItem;
