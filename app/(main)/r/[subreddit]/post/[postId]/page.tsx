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

dayjs.extend(relativeTime);

// For now using dummy data - later we'll fetch from API
const post = {
  id: "1",
  title: "Just built my first mechanical keyboard!",
  content:
    "After months of research and collecting parts, I finally built my first custom mechanical keyboard. It's a 65% layout with Gateron Brown switches and PBT keycaps. The typing experience is amazing!",
  image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef",
  author: {
    username: "keeb_enthusiast",
  },
  subreddit: {
    name: "MechanicalKeyboards",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212",
  },
  createdAt: new Date("2024-03-10T15:30:00"),
  _count: {
    PostLike: 142,
    Comment: 47,
  },
  userVote: 1,
};

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

function Page() {
  return (
    <div className="max-w-3xl mx-auto">
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
                href={`/r/${post.subreddit.name}`}
                className="flex items-center gap-2 font-medium hover:underline"
              >
                <Avatar
                  src={post.subreddit.image ?? `/subreddit-fallback.png`}
                  size="sm"
                  radius="sm"
                  showFallback
                  fallback={
                    <div className="bg-default-200 w-full h-full rounded-sm flex items-center justify-center">
                      r/
                    </div>
                  }
                />
                r/{post.subreddit.name}
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
              count={post._count.PostLike}
              userVote={post.userVote as 1 | -1 | null}
              size="md"
            />
            <Button
              variant="light"
              startContent={<BiComment className="w-5 h-5" />}
            >
              {post._count.Comment} Comments
            </Button>
          </CardFooter>
        </div>
      </Card>

      {/* Comments section */}
      {/* <CommentSectionWrapper /> */}
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
  );
}

export default Page;
