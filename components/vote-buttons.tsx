"use client";

import { cn } from "@/lib/cn";
import { Button } from "@heroui/react";
import { BiDownvote, BiUpvote } from "react-icons/bi";

type VoteButtonsProps = {
  count: number;
  size?: "sm" | "md" | "lg";
  hasLiked?: boolean;
  hasUnLiked?: boolean;
  onUpvote?: () => void;
  onDownvote?: () => void;
};

function VoteButtons({
  count,
  size = "sm",
  hasLiked = false,
  hasUnLiked = false,
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
        className={cn(hasLiked && "text-primary")}
        onPress={onUpvote}
      >
        <BiUpvote className={iconSize} />
      </Button>
      <span className={`font-medium text-center ${textSize}`}>{count}</span>
      <Button
        isIconOnly
        variant="light"
        size={size}
        className={cn(hasUnLiked && "text-danger")}
        onPress={onDownvote}
      >
        <BiDownvote className={iconSize} />
      </Button>
    </div>
  );
}

export default VoteButtons;
