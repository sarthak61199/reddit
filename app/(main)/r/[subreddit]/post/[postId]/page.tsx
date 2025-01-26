import CommentBox from "@/components/comment-box";
import CommentSection, { Comment } from "@/components/comment-section";
import VoteButtons from "@/components/vote-buttons";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@heroui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import { BiComment } from "react-icons/bi";
import SubredditSidebar from "@/components/subreddit-sidebar";
import { getPostById } from "@/actions/post";

dayjs.extend(relativeTime);

const DUMMY_COMMENTS: Comment[] = [
  {
    id: "1",
    content: "This is a great post! Really insightful.",
    createdAt: new Date("2024-03-10T15:00:00"),
    author: {
      username: "user123",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    },
    _count: {
      CommentLike: 42,
    },
    userVote: 1, // This comment is upvoted by the current user
    children: [
      {
        id: "2",
        content: "I agree! The points made are very valid.",
        createdAt: new Date("2024-03-10T15:30:00"),
        author: {
          username: "commenter456",
        },
        _count: {
          CommentLike: 15,
        },
        userVote: null, // No vote on this comment
        children: [],
      },
    ],
  },
  {
    id: "3",
    content: "I have a different perspective on this...",
    createdAt: new Date("2024-03-10T16:00:00"),
    author: {
      username: "debater789",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    },
    _count: {
      CommentLike: -5,
    },
    userVote: -1, // This comment is downvoted by the current user
    children: [],
  },
];

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
        <Card
          className="mb-4"
          classNames={{
            base: "bg-transparent border-0 shadow-none",
          }}
        >
          <div className="flex-1">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-sm">
                <Link
                  href={`/r/${post.subreddit?.name}`}
                  className="flex items-center gap-2 font-medium hover:underline"
                >
                  <Avatar
                    src={post.subreddit?.image ?? `/subreddit-fallback.png`}
                    size="sm"
                    radius="sm"
                    showFallback
                    fallback={
                      <div className="bg-default-200 w-full h-full rounded-sm flex items-center justify-center">
                        r/
                      </div>
                    }
                  />
                  r/{post.subreddit?.name}
                </Link>
                <span className="text-default-500">•</span>
                <div className="flex items-center gap-2 text-default-500">
                  <span>Posted by</span>
                  <Link
                    href={`/u/${post.author.username}`}
                    className="hover:underline"
                  >
                    u/{post.author.username}
                  </Link>
                  <span>{dayjs(post.createdAt).fromNow()}</span>
                </div>
              </div>
            </CardHeader>

            <CardBody className="py-2">
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
            </CardBody>

            <CardFooter className="gap-2">
              <VoteButtons
                count={post.likeCount}
                hasLiked={post.hasLiked}
                hasUnLiked={post.hasUnLiked}
                size="md"
              />
              <Button
                variant="light"
                startContent={<BiComment className="w-5 h-5" />}
              >
                {post.commentCount} Comments
              </Button>
            </CardFooter>
          </div>
        </Card>

        {/* Comments section */}
        <Card
          classNames={{
            base: "bg-transparent border-0 shadow-none",
          }}
        >
          <CardBody className="space-y-6">
            <CommentBox />
            <CommentSection comments={DUMMY_COMMENTS} />
          </CardBody>
        </Card>
      </div>
      <SubredditSidebar subredditName={subreddit} />
    </div>
  );
}

export default Page;
