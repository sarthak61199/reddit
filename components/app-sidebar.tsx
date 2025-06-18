import CreateSubreddit from "@/components/create-subreddit";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { PLACEHOLDER_AVATAR_URL } from "@/constants";
import db from "@/lib/db";
import { getUser } from "@/lib/get-user";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Installation",
      url: "#",
    },
    {
      title: "Project Structure",
      url: "#",
    },
  ],
};

const getSubreddits = async () => {
  const user = await getUser();

  const subreddits = await db.subreddit.findMany({
    orderBy: {
      name: "asc",
    },
    where: {
      subredditMembers: {
        some: { userId: user.id },
      },
    },
    select: {
      name: true,
      imageUrl: true,
    },
  });

  return subreddits;
};

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const subreddits = await getSubreddits();

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <h1 className="text-xl font-bold ml-3 mt-2">Subreddits</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <CreateSubreddit />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-1">
              {subreddits.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link href={`/r/${item.name}`} className="h-full font-bold">
                      <Avatar className="size-8">
                        <AvatarImage
                          src={item.imageUrl || PLACEHOLDER_AVATAR_URL}
                        />
                      </Avatar>
                      r/{item.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
