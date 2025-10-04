"use client";

import { getPostsAction } from "@/actions/post";
import PostCard from "@/components/post-card";
import { useQuery } from "@tanstack/react-query";
import { Frown, Loader2 } from "lucide-react";

interface PostListProps {
  subreddit?: string;
  username?: string;
}

function PostList({ subreddit, username }: PostListProps) {
  const { data, isLoading } = useQuery({
    queryKey: [
      "posts",
      { subreddit: subreddit || undefined, username: username || undefined },
    ],
    queryFn: () => getPostsAction(subreddit, username),
  });

  const posts = data?.posts ?? [];

  return (
    <div className="flex flex-col gap-4 items-center h-full ">
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <>
          {!isLoading && (
            <p className="text-lg text-muted-foreground flex items-center gap-2">
              No posts found <Frown className="size-5" />
            </p>
          )}
        </>
      )}
      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  );
}

export default PostList;
