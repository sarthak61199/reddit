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
import React from "react";

dayjs.extend(relativeTime);

type PostCardProps = {
  id: string;
  title: string;
  content: string;
  image?: string | null;
  author: {
    username: string;
    avatar?: string | null;
  };
  subreddit: {
    name: string;
    image?: string | null;
  };
  createdAt: Date;
  _count: {
    PostLike: number;
    Comment: number;
  };
};

function PostCard({
  id,
  title,
  content,
  image,
  author,
  subreddit,
  createdAt,
  _count,
}: PostCardProps) {
  return (
    <Card className="mb-4 hover:bg-default-100 transition-colors">
      {/* Vote buttons */}
      <div className="flex">
        <div className="flex flex-col items-center px-2 py-2 bg-default-50">
          <Button isIconOnly variant="light" size="sm">
            <BiUpvote className="w-5 h-5" />
          </Button>
          <span className="text-sm font-medium">{_count.PostLike}</span>
          <Button isIconOnly variant="light" size="sm">
            <BiDownvote className="w-5 h-5" />
          </Button>
        </div>

        {/* Post content */}
        <div className="flex-1">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-sm">
              <Link
                href={`/r/${subreddit.name}`}
                className="flex items-center gap-2 font-medium hover:underline"
              >
                <Avatar
                  src={subreddit.image ?? `/subreddit-fallback.png`}
                  size="sm"
                  radius="sm"
                  showFallback
                  fallback={
                    <div className="bg-default-200 w-full h-full rounded-sm flex items-center justify-center">
                      r/
                    </div>
                  }
                />
                r/{subreddit.name}
              </Link>
              <span className="text-default-500">•</span>
              <div className="flex items-center gap-2 text-default-500">
                <span>Posted by</span>
                <Link
                  href={`/u/${author.username}`}
                  className="hover:underline"
                >
                  u/{author.username}
                </Link>
                <span>{dayjs(createdAt).fromNow()}</span>
              </div>
            </div>
          </CardHeader>

          <CardBody className="py-2">
            <Link href={`/r/${subreddit.name}/post/${id}`}>
              <h2 className="text-lg font-medium mb-2 hover:underline">
                {title}
              </h2>
              {content && <p className="text-default-700 mb-3">{content}</p>}
              {image && (
                <div className="relative w-full">
                  <div className="relative max-h-[80vh] w-full flex items-center justify-center bg-default-50 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={title}
                      width={1200}
                      height={1200}
                      className="object-contain w-auto h-auto max-w-full max-h-[80vh]"
                      priority={false}
                    />
                  </div>
                </div>
              )}
            </Link>
          </CardBody>

          <CardFooter>
            <Button
              as={Link}
              href={`/r/${subreddit.name}/post/${id}`}
              variant="light"
              startContent={<BiComment className="w-5 h-5" />}
            >
              {_count.Comment} Comments
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

export default PostCard;
