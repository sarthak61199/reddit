"use client";

import { voteComment } from "@/actions/comment";
import { votePost } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { VoteType } from "@/lib/generated/prisma";
import { Response } from "@/types";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

type VoteState = {
  userVote: VoteType | null;
  voteCount: number;
};

function VoteButtons({
  userVote,
  voteCount,
  action,
  disabled = false,
}: {
  userVote: VoteType | null;
  voteCount: number;
  action: (voteType: VoteType | null) => Promise<Response>;
  disabled?: boolean;
}) {
  const [_, startTransition] = useTransition();

  const [optimisticVoteState, addOptimisticVote] = useOptimistic(
    { userVote, voteCount },
    (state: VoteState, newVoteType: VoteType | null) => {
      let voteCountChange = 0;
      let newUserVote = newVoteType;

      if (!newVoteType) {
        if (state.userVote) {
          voteCountChange = state.userVote === VoteType.UPVOTE ? -1 : 1;
          newUserVote = null;
        }
      } else {
        if (state.userVote) {
          if (state.userVote !== newVoteType) {
            voteCountChange = newVoteType === VoteType.UPVOTE ? 2 : -2;
          } else {
            voteCountChange = state.userVote === VoteType.UPVOTE ? -1 : 1;
            newUserVote = null;
          }
        } else {
          voteCountChange = newVoteType === VoteType.UPVOTE ? 1 : -1;
        }
      }

      return {
        userVote: newUserVote,
        voteCount: state.voteCount + voteCountChange,
      };
    }
  );

  const handleVote = async (voteType: VoteType | null) => {
    startTransition(async () => {
      addOptimisticVote(voteType);
      const { response, error } = await tryCatch(action(voteType));

      if (error || !response?.success) {
        addOptimisticVote(userVote);
        toast.error(error?.message || response?.message);
        return;
      }

      toast.success(response.message);
    });
  };

  return (
    <div className="flex items-center bg-muted rounded-full w-fit">
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 px-2 rounded-l-full hover:bg-muted-foreground/10 ${
          optimisticVoteState.userVote === VoteType.UPVOTE
            ? "text-orange-500 hover:text-orange-600"
            : "text-muted-foreground"
        }`}
        onClick={() =>
          handleVote(
            optimisticVoteState.userVote === VoteType.UPVOTE
              ? null
              : VoteType.UPVOTE
          )
        }
        disabled={disabled}
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
      <span
        className={`px-1 text-sm font-medium min-w-[2rem] text-center ${
          optimisticVoteState.userVote === VoteType.UPVOTE
            ? "text-orange-500"
            : optimisticVoteState.userVote === VoteType.DOWNVOTE
            ? "text-blue-500"
            : "text-foreground"
        }`}
      >
        {optimisticVoteState.voteCount}
      </span>
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 px-2 rounded-r-full hover:bg-muted-foreground/10 ${
          optimisticVoteState.userVote === VoteType.DOWNVOTE
            ? "text-blue-500 hover:text-blue-600"
            : "text-muted-foreground"
        }`}
        onClick={() =>
          handleVote(
            optimisticVoteState.userVote === VoteType.DOWNVOTE
              ? null
              : VoteType.DOWNVOTE
          )
        }
        disabled={disabled}
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function PostVoteButtons({
  postId,
  userVote,
  voteCount,
  disabled = false,
}: {
  postId: string;
  userVote: VoteType | null;
  voteCount: number;
  disabled?: boolean;
}) {
  return (
    <VoteButtons
      userVote={userVote}
      voteCount={voteCount}
      action={(voteType) => votePost(postId, voteType)}
      disabled={disabled}
    />
  );
}

export function CommentVoteButtons({
  commentId,
  userVote,
  voteCount,
  disabled = false,
}: {
  commentId: string;
  userVote: VoteType | null;
  voteCount: number;
  disabled?: boolean;
}) {
  return (
    <VoteButtons
      userVote={userVote}
      voteCount={voteCount}
      action={(voteType) => voteComment(commentId, voteType)}
    />
  );
}
