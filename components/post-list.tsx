"use client";

import PostCard from "@/components/post-card";
import { GetPosts } from "@/dal/post";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Frown } from "lucide-react";

function PostList({
  posts: initialPosts,
  hasMore,
}: {
  posts: GetPosts["posts"];
  hasMore: GetPosts["hasMore"];
}) {
  const { subreddit, username } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [additionalPosts, setAdditionalPosts] = useState<GetPosts["posts"]>([]);

  const { ref, inView } = useInView();

  const URL = `/api/posts?page=${page}${
    subreddit ? `&subreddit=${subreddit}` : ""
  }${username ? `&username=${username}` : ""}`;

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(URL);
      const data = (await response.json()) as GetPosts["posts"];
      setAdditionalPosts((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView && hasMore) {
      fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore]);

  const posts = [...initialPosts, ...additionalPosts];

  return (
    <div className="flex flex-col gap-4 items-center h-full ">
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p className="text-lg text-muted-foreground flex items-center gap-2">
          No posts found <Frown className="size-5" />
        </p>
      )}
      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {hasMore && <div ref={ref} />}
    </div>
  );
}

export default PostList;
