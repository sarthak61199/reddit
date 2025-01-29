import { Post } from "@/features/posts/components/post-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

dayjs.extend(relativeTime);

type PostCardProps = {
  post: Post;
};

function PostCard({ post }: PostCardProps) {
  return (
    <Card className="mb-4 hover:bg-default-100 transition-colors p-2">
      <div className="flex-1">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href={`/r/${post.subreddit.name}`}
              className="flex items-center gap-2 font-medium hover:underline"
            >
              <Avatar>
                <AvatarImage
                  src={post.subreddit.image ?? `/subreddit-fallback.png`}
                />
                <AvatarFallback className="bg-default-200 w-full h-full rounded-sm flex items-center justify-center">
                  r/
                </AvatarFallback>
                r/{post.subreddit.name}
              </Avatar>
            </Link>
            <span className="text-default-500">•</span>
            <div className="flex items-center gap-2 text-default-500">
              <Link
                href={`/u/${post.author.username}`}
                className="hover:underline"
              >
                u/{post.author.username}
              </Link>
              <span className="text-default-500">•</span>
              <span>{dayjs(post.createdAt).fromNow()}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="py-2">
          <Link href={`/r/${post.subreddit.name}/post/${post.id}`}>
            <h2 className="text-lg font-semibold mb-2 hover:underline">
              {post.title}
            </h2>
            {post.content && (
              <p className="text-default-700 mb-3">{post.content}</p>
            )}
            {post.image && (
              <div className="relative w-full">
                <div className="relative max-h-[80vh] w-full flex items-center justify-center bg-default-50 rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={1200}
                    height={1200}
                    className="object-contain w-auto h-auto max-w-full max-h-[80vh]"
                    priority={false}
                  />
                </div>
              </div>
            )}
          </Link>
        </CardContent>
        <CardFooter className="gap-2">
          <Button>
            <MessageCircle className="w-5 h-5" />
            {post.commentCount} Comments
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default PostCard;
