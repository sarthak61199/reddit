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
import VoteButtons from "./vote-buttons";

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
  userVote?: 1 | -1 | null;
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
  userVote,
}: PostCardProps) {
  return (
    <Card className="mb-4 hover:bg-default-100 transition-colors p-2">
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
              <Link href={`/u/${author.username}`} className="hover:underline">
                u/{author.username}
              </Link>
              <span>{dayjs(createdAt).fromNow()}</span>
            </div>
          </div>
        </CardHeader>

        <CardBody className="py-2">
          <Link href={`/r/${subreddit.name}/post/${id}`}>
            <h2 className="text-lg font-semibold mb-2 hover:underline">
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

        <CardFooter className="gap-2">
          <VoteButtons count={_count.PostLike} userVote={userVote} size="sm" />
          <Button
            variant="light"
            startContent={<BiComment className="w-5 h-5" />}
          >
            {_count.Comment} Comments
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default PostCard;
