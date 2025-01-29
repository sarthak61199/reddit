import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CommentBox from "@/features/comments/components/comment-box";
import CommentSection from "@/features/comments/components/comment-section";
import { getPostById } from "@/features/posts/query";
import SubredditSidebar from "@/features/subreddits/components/subreddit-sidebar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Loader2, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

dayjs.extend(relativeTime);

async function Page({
  params,
}: {
  params: Promise<{ subreddit: string; postId: string }>;
}) {
  const subreddit = (await params).subreddit;
  const postId = (await params).postId;

  const { post } = await getPostById(postId);

  return (
    <div className="container mx-auto py-4 flex gap-4 justify-center">
      <div className="flex-1 max-w-2xl">
        <Card className="mb-4">
          <div className="flex-1">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-sm">
                <Link
                  href={`/r/${post.subreddit?.name}`}
                  className="flex items-center gap-2 font-medium hover:underline"
                >
                  <Avatar>
                    <AvatarImage src={post.subreddit?.image || ""} />
                    <AvatarFallback>r/{post.subreddit?.name}</AvatarFallback>
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
              <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
              {post.content && (
                <p className="text-default-700 mb-4">{post.content}</p>
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
                      priority
                    />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="gap-2">
              <Button>
                <MessageCircle className="w-5 h-5 mr-2" /> {post.commentCount}{" "}
                Comments
              </Button>
            </CardFooter>
          </div>
        </Card>
        <div className="space-y-6">
          <CommentBox postId={postId} />
          <Separator />
          <Suspense fallback={<Loader2 className="animate-spin" />}>
            <CommentSection postId={postId} />
          </Suspense>
        </div>
      </div>
      <SubredditSidebar subredditName={subreddit} />
    </div>
  );
}

export default Page;
