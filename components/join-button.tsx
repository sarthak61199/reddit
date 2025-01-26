"use client";

import { joinUnjoinSubreddit } from "@/actions/subreddit";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function JoinButton({
  subreddit,
  isJoined,
}: {
  subreddit: string;
  isJoined: boolean;
}) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const { refresh } = useRouter();

  const onSubmit = async () => {
    try {
      const res = await joinUnjoinSubreddit(subreddit);
      refresh();
      toast.success(res.message);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button
        color={isJoined ? "danger" : "primary"}
        className="w-full"
        type="submit"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        {isJoined ? "Leave Community" : "Join Community"}
      </Button>
    </form>
  );
}

export default JoinButton;
