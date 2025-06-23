"use client";

import { joinOrLeaveSubreddit } from "@/actions/subreddit";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { UserMinus, UserPlus } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

function JoinSubreddit({
  isMember,
  subredditName,
}: {
  isMember: boolean;
  subredditName: string;
}) {
  const [_, startTransition] = useTransition();
  const [optimisticIsMember, setOptimisticIsMember] = useOptimistic(
    isMember,
    (_, newState: boolean) => newState
  );

  const handleJoinToggle = () => {
    startTransition(async () => {
      setOptimisticIsMember(!optimisticIsMember);
      const { error, response } = await tryCatch(
        joinOrLeaveSubreddit(subredditName)
      );

      if (error || !response?.success) {
        setOptimisticIsMember(!optimisticIsMember);
        toast.error(error?.message || response?.message);
        return;
      }

      toast.success(response.message);
    });
  };

  return (
    <Button
      onClick={handleJoinToggle}
      className={`w-full cursor-pointer ${
        optimisticIsMember
          ? "bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
          : "bg-primary text-primary-foreground hover:bg-primary/90"
      }`}
      variant={optimisticIsMember ? "outline" : "default"}
    >
      {optimisticIsMember ? (
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
  );
}

export default JoinSubreddit;
