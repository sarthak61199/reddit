import SubredditSidebar from "@/components/subreddit-sidebar";
import { ReactNode } from "react";

async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ subreddit: string }>;
}) {
  const { subreddit } = await params;

  return (
    <div className="flex container mx-auto justify-between w-full gap-4">
      <div className="flex-1">{children}</div>
      <SubredditSidebar subredditName={subreddit} />
    </div>
  );
}

export default Layout;
