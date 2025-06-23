"use client";

import { Button } from "@/components/ui/button";
import { VoteType } from "@/lib/generated/prisma";
import { ArrowDown, ArrowUp } from "lucide-react";

function VoteButtons({
  userVote,
  voteCount,
}: {
  userVote: VoteType | null;
  voteCount: number;
}) {
  return (
    <div className="flex items-center bg-muted rounded-full w-fit">
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 px-2 rounded-l-full hover:bg-muted-foreground/10 ${
          userVote === VoteType.UPVOTE
            ? "text-orange-500 hover:text-orange-600"
            : "text-muted-foreground"
        }`}
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
      <span
        className={`px-1 text-sm font-medium min-w-[2rem] text-center ${
          userVote === VoteType.UPVOTE
            ? "text-orange-500"
            : userVote === VoteType.DOWNVOTE
            ? "text-blue-500"
            : "text-foreground"
        }`}
      >
        {voteCount}
      </span>
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 px-2 rounded-r-full hover:bg-muted-foreground/10 ${
          userVote === VoteType.DOWNVOTE
            ? "text-blue-500 hover:text-blue-600"
            : "text-muted-foreground"
        }`}
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default VoteButtons;
