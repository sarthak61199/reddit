"use client";

import { Card, CardBody } from "@heroui/react";
import PostCard from "./post-card";
import { useEffect, useState } from "react";

// Reusing the Post type from post-list.tsx
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

type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  post: {
    title: string;
    subreddit: {
      name: string;
    };
  };
  _count: {
    CommentLike: number;
  };
};

type UserContentProps = {
  type: "posts" | "comments" | "likes";
};

function UserContent({ type }: UserContentProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch user content based on type
    // This is dummy data for now
    setLoading(false);
  }, [type]);

  if (loading) {
    return (
      <Card>
        <CardBody>Loading...</CardBody>
      </Card>
    );
  }

  if (type === "posts" || type === "likes") {
    return (
      <Card>
        <CardBody>
          <div className="space-y-4">
            {posts.length === 0 ? (
              <p className="text-center text-default-500">No posts yet</p>
            ) : (
              posts.map((post) => <PostCard key={post.id} {...post} />)
            )}
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-center text-default-500">No comments yet</p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-lg border border-default-200"
              >
                <div className="text-sm text-default-500 mb-2">
                  Commented on{" "}
                  <span className="font-medium text-foreground">
                    {comment.post.title}
                  </span>{" "}
                  in r/{comment.post.subreddit.name}
                </div>
                <p className="text-default-700">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default UserContent;
