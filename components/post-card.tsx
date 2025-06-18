import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowDown, ArrowUp, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RedditPostCardProps {
  id: string;
  subreddit: string;
  username: string;
  userAvatar?: string;
  timeAgo: string;
  title: string;
  content?: string;
  imageUrl?: string;
  upvotes: number;
  comments: number;
  isUpvoted?: boolean;
  isDownvoted?: boolean;
}

function PostCard({
  id,
  subreddit,
  username,
  userAvatar,
  timeAgo,
  title,
  content,
  imageUrl,
  upvotes,
  comments,
  isUpvoted = false,
  isDownvoted = false,
}: RedditPostCardProps) {
  return (
    <Card className="w-full border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">r/{subreddit}</span>
          <span>•</span>
          <span>Posted by</span>
          <div className="flex items-center gap-1">
            <Avatar className="size-6">
              <AvatarImage
                src={userAvatar || "/placeholder.svg"}
                alt={username}
              />
              <AvatarFallback className="text-xs">
                {username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">u/{username}</span>
          </div>
          <span>•</span>
          <span>{timeAgo} ago</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold leading-tight text-foreground">
            <Link href={`/r/sarthak/post/${id}`}>{title}</Link>
          </h2>

          {content && (
            <p className="text-sm text-muted-foreground leading-relaxed">
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
            <div className="flex items-center bg-muted rounded-full">
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-2 rounded-l-full hover:bg-muted-foreground/10 ${
                  isUpvoted
                    ? "text-orange-500 hover:text-orange-600"
                    : "text-muted-foreground"
                }`}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <span
                className={`px-1 text-sm font-medium min-w-[2rem] text-center ${
                  isUpvoted
                    ? "text-orange-500"
                    : isDownvoted
                    ? "text-blue-500"
                    : "text-foreground"
                }`}
              >
                {upvotes}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-2 rounded-r-full hover:bg-muted-foreground/10 ${
                  isDownvoted
                    ? "text-blue-500 hover:text-blue-600"
                    : "text-muted-foreground"
                }`}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-muted-foreground hover:bg-muted"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-sm">{comments}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PostCard;
