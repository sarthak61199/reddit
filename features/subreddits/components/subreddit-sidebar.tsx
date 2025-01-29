import ActionButton from "@/components/action-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { joinUnjoinSubreddit } from "@/features/subreddits/action";
import AddModerator from "@/features/subreddits/components/add-moderator";
import { getSubredditDetails } from "@/features/subreddits/query";
import dayjs from "dayjs";
import Link from "next/link";

async function SubredditSidebar({ subredditName }: { subredditName: string }) {
  const subreddit = await getSubredditDetails(subredditName);

  const { isJoined, name } = subreddit;

  return (
    <div className="w-80">
      <div className="sticky top-20">
        <Card>
          <CardHeader>
            <CardTitle>About r/{subreddit.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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

            <ActionButton
              action={joinUnjoinSubreddit.bind(null, name)}
              variant={isJoined ? "destructive" : "default"}
              className="w-full"
            >
              {isJoined ? "Leave Community" : "Join Community"}
            </ActionButton>

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
                      <Avatar>
                        <AvatarImage src={mod.avatar ?? undefined} />
                        <AvatarFallback>
                          {mod.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>u/{mod.username}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SubredditSidebar;
