"use client";

import { Button } from "@heroui/react";
import { BiUpvote, BiDownvote } from "react-icons/bi";

type VoteButtonsProps = {
  count: number;
  userVote?: 1 | -1 | null;
  size?: "sm" | "md" | "lg";
  onUpvote?: () => void;
  onDownvote?: () => void;
};

function VoteButtons({
  count,
  userVote = null,
  size = "sm",
  onUpvote,
  onDownvote,
}: VoteButtonsProps) {
  const iconSize = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-7 h-7",
  }[size];

  const textSize = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }[size];

  return (
    <div className="flex items-center gap-1">
      <Button
        isIconOnly
        variant="light"
        size={size}
        className={userVote === 1 ? "text-primary" : ""}
        onPress={onUpvote}
      >
        <BiUpvote className={iconSize} />
      </Button>
      <span className={`font-medium text-center ${textSize}`}>{count}</span>
      <Button
        isIconOnly
        variant="light"
        size={size}
        className={userVote === -1 ? "text-danger" : ""}
        onPress={onDownvote}
      >
        <BiDownvote className={iconSize} />
      </Button>
    </div>
  );
}

export default VoteButtons;
