"use client";

import PostCard from "@/components/post-card";
import { GetPosts } from "@/dal/post";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function PostList({
  posts: initialPosts,
  hasMore,
}: {
  posts: GetPosts["posts"];
  hasMore: GetPosts["hasMore"];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [posts, setPosts] = useState<GetPosts["posts"]>(initialPosts);

  const { ref, inView } = useInView();

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/posts?page=${page}`);
      const data = (await response.json()) as GetPosts["posts"];
      setPosts((prev) => [...prev, ...data]);
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
  }, [inView, hasMore]);

  return (
    <div className="flex flex-col gap-4 items-center">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {isLoading && <div>Loading...</div>}
      {hasMore && <div ref={ref} />}
    </div>
  );
}

export default PostList;
