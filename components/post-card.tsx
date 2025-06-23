import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import VoteButtons from "@/components/vote-buttons";
import { PLACEHOLDER_AVATAR_URL } from "@/constants";
import { GetPost } from "@/dal/post";
import { dayjs } from "@/lib/dayjs";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function PostCard({
  post: {
    commentCount,
    content,
    createdAt,
    id,
    subreddit,
    title,
    user,
    userVote,
    voteCount,
    imageUrl,
  },
  isPostPage = false,
}: {
  post: GetPost;
  isPostPage?: boolean;
}) {
  return (
    <Card className="border-border bg-card gap-0 w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href={`/r/${subreddit.name}`}
            className="font-medium text-foreground hover:underline"
          >
            r/{subreddit.name}
          </Link>
          <span>•</span>
          <span>Posted by</span>
          <div className="flex items-center gap-1">
            <Avatar className="size-6">
              <AvatarImage
                src={user.image || PLACEHOLDER_AVATAR_URL}
                alt={user.username || "User avatar"}
              />
            </Avatar>
            <span className="font-medium">u/{user.username}</span>
          </div>
          <span>•</span>
          <span>{dayjs(createdAt).fromNow()}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold leading-tight text-foreground">
            <Link href={`/r/${subreddit.name}/post/${id}`}>{title}</Link>
          </h2>

          {content && (isPostPage || !imageUrl) && (
            <p
              className={cn(
                "text-sm text-muted-foreground leading-relaxed",
                !isPostPage && "line-clamp-2"
              )}
            >
              {content}
            </p>
          )}

          {imageUrl && (
            <div className="relative w-full max-h-96 overflow-hidden rounded-md border border-border">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt="Post image"
                width={600}
                height={400}
                className="w-full h-auto max-h-96 object-cover"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <div className="flex items-center gap-1 pt-2">
            <VoteButtons userVote={userVote} voteCount={voteCount} />

            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-muted-foreground hover:bg-muted"
            >
              <MessageCircle className="size-4 mr-1" />
              <span className="text-sm">{commentCount}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PostCard;
