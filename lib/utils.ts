import { CommentWithVotes } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buildCommentTree = (
  comments: CommentWithVotes[]
): CommentWithVotes[] => {
  const commentMap = new Map<string, CommentWithVotes>();
  const rootComments: CommentWithVotes[] = [];

  comments.forEach((comment) => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  comments.forEach((comment) => {
    const commentWithReplies = commentMap.get(comment.id)!;

    if (comment.parentId === null) {
      rootComments.push(commentWithReplies);
    } else {
      const parent = commentMap.get(comment.parentId);
      if (parent) {
        parent.replies!.push(commentWithReplies);
      }
    }
  });

  rootComments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const sortReplies = (comment: CommentWithVotes) => {
    if (comment.replies && comment.replies.length > 0) {
      comment.replies.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      comment.replies.forEach(sortReplies);
    }
  };

  rootComments.forEach(sortReplies);

  return rootComments;
};
