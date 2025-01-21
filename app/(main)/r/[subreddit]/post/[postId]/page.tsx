import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Avatar,
} from "@heroui/react";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CommentSectionWrapper from "@/components/comment-section-wrapper";

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
};

function Page() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="mb-4">
        {/* Vote buttons */}
        <div className="flex">
          <div className="flex flex-col items-center px-4 py-2 bg-default-50">
            <Button isIconOnly variant="light" size="sm">
              <BiUpvote className="w-6 h-6" />
            </Button>
            <span className="text-lg font-medium my-1">
              {post._count.PostLike}
            </span>
            <Button isIconOnly variant="light" size="sm">
              <BiDownvote className="w-6 h-6" />
            </Button>
          </div>

          {/* Post content */}
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
              <h1 className="text-2xl font-medium mb-4">{post.title}</h1>
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

            <CardFooter>
              <Button
                variant="light"
                startContent={<BiComment className="w-5 h-5" />}
              >
                {post._count.Comment} Comments
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>

      {/* Comments section */}
      <CommentSectionWrapper />
    </div>
  );
}

export default Page;
