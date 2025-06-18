"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Crown, UserMinus, UserPlus, Users } from "lucide-react";
import { useState } from "react";

interface Moderator {
  id: string;
  username: string;
  avatar?: string;
  isFounder?: boolean;
}

interface SubredditSidebarProps {
  subredditName?: string;
  description?: string;
  avatar?: string;
  memberCount?: number;
  moderators?: Moderator[];
  isJoined?: boolean;
  onJoinToggle?: () => void;
}

function SubredditSidebar({
  subredditName = "nextjs",
  description = "The React Framework for Production. Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more.",
  avatar = "https://github.com/vercel.png",
  memberCount = 125420,
  moderators = [
    {
      id: "1",
      username: "vercel_admin",
      avatar: "https://github.com/vercel.png",
      isFounder: true,
    },
    {
      id: "2",
      username: "nextjs_mod",
      avatar: "https://github.com/shadcn.png",
    },
    {
      id: "3",
      username: "react_expert",
      avatar: "https://github.com/facebook.png",
    },
  ],
  isJoined: initialIsJoined = false,
  onJoinToggle,
}: SubredditSidebarProps) {
  const [isJoined, setIsJoined] = useState(initialIsJoined);

  const handleJoinToggle = () => {
    setIsJoined(!isJoined);
    onJoinToggle?.();
  };

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
    <Card className="w-full max-w-sm border-border bg-card sticky top-[4.55rem]">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarImage src={avatar} alt={`r/${subredditName}`} />
            <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
              {subredditName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-foreground truncate">
              r/{subredditName}
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="size-4" />
              <span>{formatMemberCount(memberCount)} members</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
            {description}
          </p>
        </div>

        {/* Join/Leave Button */}
        <Button
          onClick={handleJoinToggle}
          className={`w-full ${
            isJoined
              ? "bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
          variant={isJoined ? "outline" : "default"}
        >
          {isJoined ? (
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
        </Button>

        <Separator className="bg-border" />

        {/* Moderators Section */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Crown className="size-4 text-primary" />
            Moderators
          </h3>
          <div className="space-y-2">
            {moderators.map((moderator) => (
              <div key={moderator.id} className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage
                    src={moderator.avatar}
                    alt={moderator.username}
                  />
                  <AvatarFallback className="text-xs">
                    {moderator.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1 min-w-0 flex-1">
                  <span className="text-sm text-foreground truncate">
                    u/{moderator.username}
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
