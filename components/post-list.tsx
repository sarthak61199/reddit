import PostCard from "./post-card";
import React from "react";

type Post = {
  id: string;
  title: string;
  content: string;
  author: {
    username: string;
    avatar?: string | null;
  };
  subreddit: {
    name: string;
  };
  createdAt: Date;
  _count: {
    PostLike: number;
    Comment: number;
  };
};

type PostListProps = {
  posts: Post[];
};

function PostList({ posts }: PostListProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}

export default PostList;
