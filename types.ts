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
  postId: string;
  replies?: CommentWithVotes[];
};

export type MutationOptions<TData> = {
  onSuccess: (data: TData) => void;
  onError: (error: string) => void;
  onMutate?: () => void;
};

export type MutationResult = {
  mutate: <TData>(
    mutationFn: () => Promise<Response<TData>>,
    options: MutationOptions<Response<TData>>
  ) => void;
  isPending: boolean;
};
