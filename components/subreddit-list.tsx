import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { PLACEHOLDER_AVATAR_URL } from "@/constants";
import { getSubreddits } from "@/dal/subreddit";
import Link from "next/link";

async function SubredditList() {
  const subreddits = await getSubreddits();

  return (
    <>
      {subreddits.map((item) => (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton asChild>
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
