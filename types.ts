import { type VoteType } from "@/lib/generated/prisma";

export type Response<T = undefined> = {
  data?: T;
  message: string;
  success: boolean;
};

export type CommentWithVotes = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  voteCount: number;
  user: {
    username: string | null;
    image: string | null;
  };
  parentId: string | null;
  userVote: VoteType | null;
  replies?: CommentWithVotes[];
};
