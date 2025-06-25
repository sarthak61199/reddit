"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { PLACEHOLDER_AVATAR_URL } from "@/constants";
import { Subreddits } from "@/dal/subreddit";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function SubredditList() {
  const params = useParams();
  const [subreddits, setSubreddits] = useState<Subreddits>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubreddits = async () => {
    try {
      const response = await fetch("/api/subreddit");
      const data = (await response.json()) as Subreddits;
      setSubreddits(data);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubreddits();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {subreddits.map((item) => (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton asChild isActive={params?.subreddit === item.name}>
            <Link href={`/r/${item.name}`} className="h-full font-bold">
              <Avatar className="size-8">
                <AvatarImage src={item.imageUrl || PLACEHOLDER_AVATAR_URL} />
              </Avatar>
              r/{item.name}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}

export default SubredditList;
