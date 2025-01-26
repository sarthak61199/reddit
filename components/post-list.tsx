import { ACTION } from "@prisma/client";
import PostCard from "./post-card";
import React from "react";

export type Post = {
  id: string;
  title: string;
  content: string | null;
  image: string | null;
  author: {
    id: string;
    username: string;
    avatar: string | null;
  };
  subreddit: {
    name: string;
    image: string | null;
  };
  createdAt: Date;
  postLike: { userId: string; action: ACTION }[];
  _count: {
    comment: number;
  };
  hasLiked: boolean;
  hasUnLiked: boolean;
  likeCount: number;
  commentCount: number;
};

type PostListProps = {
  posts: Post[];
};

function PostList({ posts }: PostListProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
