import { getSubredditDetails } from "@/actions/subreddit";
import JoinButton from "@/components/join-button";
import { Avatar, Card, CardBody, CardHeader } from "@heroui/react";
import dayjs from "dayjs";
import Link from "next/link";
import AddModerator from "./add-moderator";

async function SubredditSidebar({ subredditName }: { subredditName: string }) {
  const subreddit = await getSubredditDetails(subredditName);

  return (
    <div className="w-80">
      <div className="sticky top-20">
        <Card>
          <CardHeader className="font-bold">
            About r/{subreddit.name}
          </CardHeader>
          <CardBody className="space-y-4">
            {subreddit.description && (
              <p className="text-sm text-default-700">
                {subreddit.description}
              </p>
            )}

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-default-500">Created</span>
                <span>{dayjs(subreddit.createdAt).format("MMMM D, YYYY")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-default-500">Members</span>
                <span>{subreddit._count.members}</span>
              </div>
            </div>

            <JoinButton
              subreddit={subreddit.name}
              isJoined={subreddit.isJoined}
            />

            {subreddit.moderators.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold">Moderators</h3>
                  {subreddit.isModerator && <AddModerator />}
                </div>
                <div className="space-y-2">
                  {subreddit.moderators.map((mod) => (
                    <Link
                      key={mod.username}
                      href={`/u/${mod.username}`}
                      className="flex items-center gap-2 text-sm hover:bg-default-100 p-1 rounded-lg transition-colors"
                    >
                      <Avatar
                        src={mod.avatar ?? undefined}
                        size="sm"
                        fallback={mod.username.charAt(0)}
                      />
                      <span>u/{mod.username}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default SubredditSidebar;
