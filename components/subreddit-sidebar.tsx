import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PLACEHOLDER_AVATAR_URL } from "@/constants";
import db from "@/lib/db";
import { getUser } from "@/lib/get-user";
import { Crown, Users } from "lucide-react";
import { notFound } from "next/navigation";

const getSubreddit = async (name: string) => {
  const user = await getUser();

  const subreddit = await db.subreddit.findUnique({
    where: { name },
    select: {
      _count: {
        select: {
          subredditMembers: true,
        },
      },
      imageUrl: true,
      description: true,
      name: true,
      subredditModerators: {
        select: {
          isFounder: true,
          user: {
            select: {
              username: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!subreddit) {
    notFound();
  }

  const isMember = await db.subredditMember.findUnique({
    where: {
      userId_subredditName: {
        userId: user.id,
        subredditName: name,
      },
    },
  });

  return {
    isMember: !!isMember,
    name: subreddit.name,
    description: subreddit.description,
    imageUrl: subreddit.imageUrl,
    moderators: subreddit.subredditModerators,
    memberCount: subreddit._count?.subredditMembers,
  };
};

async function SubredditSidebar({ subredditName }: { subredditName: string }) {
  const subreddit = await getSubreddit(subredditName);

  const formatMemberCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <Card className="w-full max-w-sm border-border bg-card sticky top-[4.55rem] gap-0">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarImage
              src={subreddit.imageUrl || PLACEHOLDER_AVATAR_URL}
              alt={`r/${subreddit.name}`}
            />
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-foreground truncate">
              r/{subredditName}
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="size-4" />
              <span>
                {formatMemberCount(subreddit.memberCount || 0)} members
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
            {subreddit.description}
          </p>
        </div>

        {/* Join/Leave Button */}
        {/* <Button
          onClick={handleJoinToggle}
          className={`w-full ${
            true
              ? "bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
          variant={true ? "outline" : "default"}
        >
          {true ? (
            <>
              <UserMinus className="size-4 mr-2" />
              Leave
            </>
          ) : (
            <>
              <UserPlus className="size-4 mr-2" />
              Join
            </>
          )}
        </Button> */}

        <Separator className="bg-border" />

        {/* Moderators Section */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Crown className="size-4 text-primary" />
            Moderators
          </h3>
          <div className="space-y-2">
            {subreddit.moderators.map((moderator) => (
              <div
                key={moderator.user.username}
                className="flex items-center gap-2"
              >
                <Avatar className="size-6">
                  <AvatarImage
                    src={moderator.user.image || PLACEHOLDER_AVATAR_URL}
                    alt={moderator.user.username || "User avatar"}
                  />
                </Avatar>
                <div className="flex items-center gap-1 min-w-0 flex-1">
                  <span className="text-sm text-foreground truncate">
                    u/{moderator.user.username}
                  </span>
                  {moderator.isFounder && (
                    <Crown className="size-3 text-primary flex-shrink-0" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SubredditSidebar;
