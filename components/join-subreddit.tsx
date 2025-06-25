"use client";

import { joinOrLeaveSubreddit } from "@/actions/subreddit";
import { Button } from "@/components/ui/button";
import { useMutation } from "@/hooks/use-mutation";
import { UserMinus, UserPlus } from "lucide-react";
import { useOptimistic } from "react";
import { toast } from "sonner";

function JoinSubreddit({
  isMember,
  subredditName,
}: {
  isMember: boolean;
  subredditName: string;
}) {
  const { mutate } = useMutation();
  const [optimisticIsMember, setOptimisticIsMember] = useOptimistic(
    isMember,
    (_, newState: boolean) => newState
  );

  const handleJoinToggle = () => {
    mutate(() => joinOrLeaveSubreddit(subredditName), {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: (error) => {
        setOptimisticIsMember(!optimisticIsMember);
        toast.error(error);
      },
      onMutate: () => {
        setOptimisticIsMember(!optimisticIsMember);
      },
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
