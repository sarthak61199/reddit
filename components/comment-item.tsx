import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import VoteButtons from "@/components/vote-buttons";
import { PLACEHOLDER_AVATAR_URL } from "@/constants";
import { GetComments } from "@/dal/comment";
import { dayjs } from "@/lib/dayjs";

function CommentItem({ comment }: { comment: GetComments[0] }) {
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
          <VoteButtons
            userVote={comment.userVote}
            voteCount={comment.voteCount}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default CommentItem;
